const calculateCCR=(scores)=>{
    const weights={
        readability: 0.30,
        efficiency: 0.30,
        structure:0.20,
        bestPractice: 0.20,
    }

    const ccr=
        scores.readability * weights.readability + scores.efficiency * weights.efficiency + scores.structure * weights.structure
        + scores.bestPractices * weights.bestPractices

    return Math.round(ccr*10)/10
}
export default calculateCCR

/*
---------------------------
| Dimension      | Weight |
==========================|
| readibility    |  30%   |
| Efficiency     |  30%   |
| Structure      |  20%   |
| Best Practices |  20%   |
---------------------------
 */