const buildPrompt = (code, lang, mode, tone) => {

    const modeInstructions = mode === 'cp'
        ? `You are analyzing COMPETITIVE PROGRAMMING code. Focus on:
- Time complexity (Big-O) and space complexity
- Edge cases that could cause wrong answers
- Potential TLE (Time Limit Exceeded) patterns
- Off-by-one errors and integer overflow risks
- Whether the algorithm is optimal for this problem type`
        : `You are analyzing SOFTWARE DEVELOPMENT code. Focus on:
- Readability and naming conventions
- DRY (Don't Repeat Yourself) violations
- Function decomposition and modularity
- Code structure and organization
- Best practices for ${lang}`

    const toneInstructions = tone === 'roast'
        ? `Be brutally honest, witty, and savage — like a senior dev who has seen too much bad code. 
Roast the code hard but make it specific and funny. No generic insults.`
        : `Be professional, constructive, and specific — like a thorough code review from a senior engineer.`

    return `${modeInstructions}

${toneInstructions}

Analyze this ${lang} code and respond ONLY with a valid JSON object in exactly this format, no extra text, keep feedback under 200 words, max 3 issues, max 2 suggestions:

{
  "scores": {
    "readability": <number 0-100>,
    "efficiency": <number 0-100>,
    "structure": <number 0-100>,
    "bestPractices": <number 0-100>
  },
  "feedback": "<feedback under 200 words>",
  "issues": [
    { "line": <number or null>, "severity": "<critical|warning|info>", "message": "<keep under 20 words>" }
  ],
  "suggestions": [
    "<one short actionable suggestion under 15 words>"
  ]
}

Code to analyze (${lang}):
\`\`\`${lang}
${code}
\`\`\`

Respond ONLY with the JSON. No markdown fences. No text outside the JSON.`
}

export default buildPrompt