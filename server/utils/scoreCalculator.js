const calculateCCR = (scores) => {

    const ccr =
        (scores.readability   * 0.30) +
        (scores.efficiency    * 0.30) +
        (scores.structure     * 0.20) +
        (scores.bestPractices * 0.20)

    return Math.round(ccr * 10) / 10
}

export default calculateCCR