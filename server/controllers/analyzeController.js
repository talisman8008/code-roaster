import checkCache from '../services/cacheService.js'
import analyzeWithGemini from '../services/geminiService.js'
import runStaticAnalysis from '../services/staticAnalyzer.js'
import calculateCCR from '../utils/scoreCalculator.js'
import hashCode from '../utils/hashCode.js'
import Submission from '../models/Submission.js'

const analyzeCode = async (req, res) => {
    try {
        const { code, language, mode, tone = 'roast' } = req.body
        const userId = req.user._id

        // validate required fields
        if (!code || !language || !mode) {
            return res.status(400).json({ message: 'code, language and mode are required' })
        }

        // hash the code
        const hash = hashCode(code)

        // check cache
        const cached = await checkCache(hash, mode, language)
        if (cached) {
            return res.status(200).json({
                ...cached.toObject(),
                fromCache: true
            })
        }

        // run static analysis and Gemini in parallel
        const [staticIssues, geminiResult] = await Promise.all([
            runStaticAnalysis(code, language),
            analyzeWithGemini(code, language, mode, tone)
        ])

        // build scores object
        // static analysis contributes to 3 dimensions
        // Gemini contributes to all 4 but we override 3 with static where available
        const staticScore = calculateStaticScore(staticIssues)

        const scores = {
            readability:   staticIssues.length > 0 ? staticScore : geminiResult.scores.readability,
            efficiency:    geminiResult.scores.efficiency,   // only Gemini can assess this
            structure:     staticIssues.length > 0 ? staticScore : geminiResult.scores.structure,
            bestPractices: staticIssues.length > 0 ? staticScore : geminiResult.scores.bestPractices,
        }

        // step 5 — calculate CCR
        const ccrScore = calculateCCR(scores)

        // step 6 — save to MongoDB
        const submission = await Submission.create({
            userId,
            code,
            language,
            mode,
            tone,
            hash,
            scores,
            ccrScore,
            aiResponse:   geminiResult.feedback,
            staticIssues: staticIssues,
            fromCache:    false
        })

        // return result
        res.status(201).json({
            _id:          submission._id,
            scores,
            ccrScore,
            aiResponse:   geminiResult.feedback,
            suggestions:  geminiResult.suggestions,
            staticIssues,
            fromCache:    false
        })

    } catch (error) {
        console.error('analyzeCode error:', error.message)
        res.status(500).json({ message: error.message })
    }
}

// converts static issues into a 0-100 score
// less issues,higher score
const calculateStaticScore = (issues) => {
    if (!issues || issues.length === 0) return 85  // no issues found = good score
    const critical = issues.filter(i => i.severity === 'critical').length
    const warnings = issues.filter(i => i.severity === 'warning').length
    const penalty  = (critical * 10) + (warnings * 3)
    return Math.max(0, 100 - penalty)
}

export default analyzeCode



/*                          ===================
                            |    work flow    |
                            ===================
                               Hash the code
                                     |
                                     |
                                    \ /
                       look for dup of Hash the code
                                     |
                                     |
                                    \ /
             runs static analysis AND Gemini at the same time
                                     |
                                     |
                                    \ /
                                merge code
                                     |
                                     |
                                    \ /
                               calculate CCR
                                     |
                                     |
                                    \ /
                                save to db
                                     |
                                     |
                                    \ /
                               return result






  */