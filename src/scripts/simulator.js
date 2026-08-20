/**
 * OPTIMIA PMO - Mathematical ROI & Financial Engine
 */
import { CONFIG } from './config.js';

export function formatUSD(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(amount);
}

export function getPMOFeePercentage(budget) {
    for (const tier of CONFIG.FEE_TIERS) {
        if (budget > tier.minBudget) {
            return tier.feePercent;
        }
    }
    return 0.025;
}

export function calculateFinancialMetrics(budget, variancePercent) {
    // 1. Traditional Loss = Budget * (Variance % / 100)
    const lossTraditional = budget * (variancePercent / 100);

    // 2. Optimia Mitigated Savings = 90% of Traditional Loss
    const savingsOptimia = lossTraditional * CONFIG.SIMULATOR_DEFAULTS.SAVINGS_FACTOR;

    // 3. PMO Fee Amount
    const feePercentage = getPMOFeePercentage(budget);
    const pmoFeeAmount = budget * feePercentage;

    // 4. ROI Multiplier Factor
    let roiFactor = pmoFeeAmount > 0 ? (savingsOptimia / pmoFeeAmount) : 0;
    if (roiFactor < 0) roiFactor = 0;

    return {
        budget,
        variancePercent,
        lossTraditional,
        savingsOptimia,
        feePercentage,
        pmoFeeAmount,
        roiFactor
    };
}
