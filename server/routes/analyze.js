import express from 'express'
import analyzeCode from '../controllers/analyzeController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, analyzeCode)

export default router