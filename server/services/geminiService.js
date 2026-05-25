import buildPrompt from "../utils/promptBuilder.js"

const analyzeWithGemini= async (code,lang,mode,tone)=>{
    const prompt =  buildPrompt(code,lang,mode,tone)

    const response= await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                contents:[{parts:[{text:prompt}]}],
                generationConfig:{
                    temperature:0.7,
                    maxOutputTokens:4096,
                    responseMimeType:"application/json",
                }
            })
        }
    )

if(!response.ok){
    const error=await response.json()
    throw new Error(`Gemini API error: ${error.error?.message || response.statusText}`)
}

const data=await response.json()

    const rawText=data.candidates?.[0]?.content?.parts?.[0]?.text
    if(!rawText) throw new Error(`No response from gemini`)

    const cleaned = rawText
        .split('\n')
        .filter(line => !line.trim().startsWith('```'))
        .join('\n')
        .trim()

    try{
        const parsed = JSON.parse(cleaned)
        return parsed
    }catch(err){
        throw new Error(`failed to parse gemini response in json: ${rawText}`)
    }

}

export default analyzeWithGemini