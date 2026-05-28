import express from 'express'
import {
    getHistory,
    getById,
    getScoresOverTime,
    deleteSubmission
} from '../controllers/submissionController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/',        protect, getHistory)
router.get('/scores',  protect, getScoresOverTime)
router.get('/:id',     protect, getById)
router.delete('/:id',  protect, deleteSubmission)

export default router