import Submission from '../models/Submission.js'

// desc:-    Get all submissions for logged in user
// route:-   GET /api/submissions
const getHistory = async (req, res) => {
    try {
        const submissions = await Submission.find({ userId: req.user._id })
            .sort({ createdAt: -1 })  // newest first
            .select('-code')           // don't send full code back, saves bandwidth
            .limit(50)                 // last 50 submissions

        res.json(submissions)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// desc:-    Get single submission by id
// route:-   GET /api/submissions/:id
const getById = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id)

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' })
        }

        // make sure user owns this submission
        if (submission.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' })
        }

        res.json(submission)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// desc:-    Get CCR scores over time for dashboard graph
// route:-   GET /api/submissions/history
const getScoresOverTime = async (req, res) => {
    try {
        const submissions = await Submission.find({ userId: req.user._id })
            .sort({ createdAt: 1 })   // oldest first for the graph
            .select('ccrScore scores createdAt language')
            .limit(50)

        const data = submissions.map((sub, index) => ({
            submission: index + 1,
            ccr:        sub.ccrScore,
            readability:   sub.scores.readability,
            efficiency:    sub.scores.efficiency,
            structure:     sub.scores.structure,
            bestPractices: sub.scores.bestPractices,
            language:   sub.language,
            date:       sub.createdAt
        }))

        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// desc:-    Delete a submission
// route:-   DELETE /api/submissions/:id
const deleteSubmission = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id)

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' })
        }

        if (submission.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' })
        }

        await submission.deleteOne()
        res.json({ message: 'Submission deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { getHistory, getById, getScoresOverTime, deleteSubmission }