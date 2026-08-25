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

export function calculateFinancialMetrics(params = {}) {
    const budget = parseFloat(params.budget) || 1500000;
    const m2Total = parseFloat(params.m2Total) || 1500;
    const priceM2 = parseFloat(params.priceM2) || 1800;
    const landM2 = parseFloat(params.landM2) || 300;
    const costM2 = parseFloat(params.costM2) || 1000;
    const variancePercent = parseFloat(params.variancePercent) !== undefined ? parseFloat(params.variancePercent) : 35;

    // 1. Core Financial Baseline Calculations
    const totalRevenue = priceM2 * m2Total;
    const totalLandCost = landM2 * m2Total;
    const baseConstructionCost = budget;
    const baseTotalCost = baseConstructionCost + totalLandCost;

    // 2. Traditional Scenario (with traditional variance percent, default 35%)
    const lossTraditional = baseConstructionCost * (variancePercent / 100);
    const totalCostTraditional = baseTotalCost + lossTraditional;
    const profitTraditional = totalRevenue - totalCostTraditional;
    const marginTraditional = totalRevenue > 0 ? (profitTraditional / totalRevenue) * 100 : 0;

    // 3. Optimia Controlled Scenario (controlled variance reduced to 10%, mitigating 25 percentage points)
    const varianceOptimia = 10;
    const lossOptimia = baseConstructionCost * (varianceOptimia / 100);
    const savingsOptimia = lossTraditional - lossOptimia;

    const feePercentage = getPMOFeePercentage(baseConstructionCost);
    const pmoFeeAmount = baseConstructionCost * feePercentage;

    const totalCostOptimia = baseTotalCost + lossOptimia + pmoFeeAmount;
    const profitOptimia = totalRevenue - totalCostOptimia;
    const marginOptimia = totalRevenue > 0 ? (profitOptimia / totalRevenue) * 100 : 0;

    // 4. ROI Multiplier Factor
    let roiFactor = pmoFeeAmount > 0 ? (savingsOptimia / pmoFeeAmount) : 0;
    if (roiFactor < 0) roiFactor = 0;

    return {
        budget: baseConstructionCost,
        m2Total,
        priceM2,
        landM2,
        costM2,
        variancePercent,
        varianceOptimia,
        totalRevenue,
        totalLandCost,
        baseTotalCost,
        lossTraditional,
        totalCostTraditional,
        profitTraditional,
        marginTraditional,
        lossOptimia,
        savingsOptimia,
        feePercentage,
        pmoFeeAmount,
        totalCostOptimia,
        profitOptimia,
        marginOptimia,
        roiFactor
    };
}
