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

        if (!code || !language || !mode) {
            return res.status(400).json({ message: 'code, language and mode are required' })
        }

        const hash = hashCode(code)

        const cached = await checkCache(hash, mode, language)
        if (cached) {
            return res.status(200).json({ ...cached.toObject(), fromCache: true })
        }

        const [staticIssues, geminiResult] = await Promise.all([
            runStaticAnalysis(code, language),
            analyzeWithGemini(code, language, mode, tone)
        ])

        const staticScore = calculateStaticScore(staticIssues)

        const scores = {
            readability:   Number(staticIssues.length > 0 ? staticScore : geminiResult.scores?.readability)   || 50,
            efficiency:    Number(geminiResult.scores?.efficiency)                                              || 50,
            structure:     Number(staticIssues.length > 0 ? staticScore : geminiResult.scores?.structure)      || 50,
            bestPractices: Number(staticIssues.length > 0 ? staticScore : geminiResult.scores?.bestPractices)  || 50,
        }

        const ccrScore = calculateCCR(scores)

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

        res.status(201).json({
            _id:         submission._id,
            scores,
            ccrScore,
            aiResponse:  geminiResult.feedback,
            suggestions: geminiResult.suggestions,
            staticIssues,
            fromCache:   false
        })

    } catch (error) {
        console.error('analyzeCode error:', error.message)
        res.status(500).json({ message: error.message })
    }
}

const calculateStaticScore = (issues) => {
    if (!issues || issues.length === 0) return 85
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