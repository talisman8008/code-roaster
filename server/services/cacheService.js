import Submission from "../models/Submission.js";

const checkCache=async (hash,mode,lang)=>{
    const cached= await Submission.findOne({hash,mode,lang})
    if (cached) return cached
    return null
}
export default checkCache;