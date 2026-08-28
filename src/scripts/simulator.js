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
    // 1. Input parameters with defensive fallbacks
    const m2Total = parseFloat(params.m2Total) || 1500;
    const priceM2 = parseFloat(params.priceM2) || 1800;
    const landCost = parseFloat(params.landM2) !== undefined ? parseFloat(params.landM2) : 300000;
    const costM2 = parseFloat(params.costM2) || 1000;
    const variancePercent = parseFloat(params.variancePercent) !== undefined ? parseFloat(params.variancePercent) : 35;

    // 2. Base Calculations
    // Ventas Estimadas (Ingreso Total)
    const totalRevenue = m2Total * priceM2;
    
    // Costo Base de Construcción Obra
    const baseConstructionCost = m2Total * costM2;
    
    // Costo Total de Obra Base = (Superficie Cubierta Total * Costo de Obra) + Costo Final Terreno
    const baseTotalCost = baseConstructionCost + landCost;

    // Incidencia Terreno Calculations & Defensive Guard
    const supCub = m2Total;
    const costoObra = costM2;
    const costoTerreno = landCost;
    const denominativo = supCub * costoObra;
    const landIncidenceRatio = denominativo > 0 ? (costoTerreno / denominativo) : 0;
    const landIncidencePercent = landIncidenceRatio * 100;
    const landIncidenceUSDm2 = supCub > 0 ? (costoTerreno / supCub) : 0;

    // 3. Tarjeta / Cuadro Comparativo "Sin Control Tradicional" (35% sobrecosto)
    const lossTraditional = baseTotalCost * (variancePercent / 100);
    const totalCostTraditional = baseTotalCost + lossTraditional;
    const profitTraditional = totalRevenue - totalCostTraditional;
    
    // Defensive check: Margen % Sin Control sobre Ventas Estimadas
    const marginTraditional = totalRevenue > 0 ? (profitTraditional / totalRevenue) * 100 : 0;

    // 4. Tarjeta / Cuadro Comparativo "Con OPTIMIA PMO" (10% sobrecosto residual)
    const varianceOptimia = 10;
    const lossOptimia = baseTotalCost * (varianceOptimia / 100);
    const totalCostOptimia = baseTotalCost + lossOptimia;
    
    const feePercentage = getPMOFeePercentage(baseConstructionCost);
    const pmoFeeAmount = baseConstructionCost * feePercentage;

    // Beneficio Optimia USD (Ventas Estimadas - Costo Real Con Optimia)
    const profitOptimia = totalRevenue - totalCostOptimia;
    
    // Defensive check: Beneficio % sobre Ventas Estimadas
    const marginOptimia = totalRevenue > 0 ? (profitOptimia / totalRevenue) * 100 : 0;

    // Ahorro Directo / Mitigación con Optimia (Resguardo del 25%)
    const savingsOptimia = lossTraditional - lossOptimia;

    // 5. Retorno Est. de Inversión PMO (ROI Multiplier)
    let roiFactor = pmoFeeAmount > 0 ? (savingsOptimia / pmoFeeAmount) : 0;
    if (roiFactor < 0) roiFactor = 0;

    return {
        budget: baseConstructionCost,
        baseConstructionCost,
        m2Total,
        priceM2,
        landCost,
        costM2,
        variancePercent,
        varianceOptimia,
        totalRevenue,
        baseTotalCost,
        lossTraditional,
        totalCostTraditional,
        profitTraditional,
        marginTraditional,
        lossOptimia,
        totalCostOptimia,
        profitOptimia,
        marginOptimia,
        savingsOptimia,
        feePercentage,
        pmoFeeAmount,
        roiFactor,
        landIncidenceRatio,
        landIncidencePercent,
        landIncidenceUSDm2
    };
}
