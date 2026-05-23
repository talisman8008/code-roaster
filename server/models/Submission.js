import mongoose from 'mongoose'
const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    required: true
    },
    code:{
        type: String,
        required: true
    },
    language:{
        type: String,
        enum: ['python', 'java','cpp','c'],
        required: true
    },
    mode:{
        type: String,
        enum: ['cp','dev'],
        required: true
    },
    tone:{
        type: String,
        enum: ['review','roast','mentor'],
        default: 'roast'
    },
    hash:{
        type: String,
        required: true
    },
    scores:{
        readability:{
            type:Number,
            default:0
        },
        efficiency:{
            type:Number,
            default:0
        },
        structure:{
            type:Number,
            default:0
        },
        bestPractices:{
            type:Number,
            default:0
        }},
        ccrScore:{
            type:Number,
            default:0
        },
        aiResponse:{
            type:String,
            default:''
        },
        staticIssues:[
            {
                line:Number,
                severity:String,
                message:String,
            }
        ],
        fromCache:{
            type:Boolean,
            default: false
        }
    },{timestamps:true})

const Submission = mongoose.model('Submission',submissionSchema)
export default Submission