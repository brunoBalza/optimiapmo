/**
 * OPTIMIA PMO - Main Application Orchestrator & Bootstrapper
 */
import { setupNavigation, setupScrollspy, SECTION_IDS } from './navigation.js';
import { setupTabs } from './tabs.js';
import { setupContactForm } from './form.js';
import { calculateFinancialMetrics, formatUSD } from './simulator.js';
import { initCharts, updateCharts } from './charts.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize UI Handlers
    setupNavigation();
    setupScrollspy(SECTION_IDS);
    setupTabs();
    setupContactForm();
    initCharts();

    // 2. DOM Elements for Simulator Inputs
    const inputM2Total = document.getElementById('input-m2-total');
    const inputPriceM2 = document.getElementById('input-price-m2');
    const inputLandM2 = document.getElementById('input-land-m2');
    const inputCostM2 = document.getElementById('input-cost-m2');

    // Display Output Elements
    const budgetValueDisplay = document.getElementById('budget-value');
    const varianceValueDisplay = document.getElementById('variance-value');
    const outputDevTradText = document.getElementById('output-dev-trad-text');
    const outputLandIncidenceDisplay = document.getElementById('output-land-incidence');
    const outputTradVarianceUSDDisplay = document.getElementById('output-trad-variance-usd');

    const outputSavingsDisplay = document.getElementById('output-savings');
    const outputRevenueTotalDisplay = document.getElementById('output-revenue-total');
    
    const outputMarginTradDisplay = document.getElementById('output-margin-trad');
    const outputProfitTradDisplay = document.getElementById('output-profit-trad');
    
    const outputMarginOptimiaDisplay = document.getElementById('output-margin-optimia');
    const outputProfitOptimiaDisplay = document.getElementById('output-profit-optimia');

    const outputRoiDisplay = document.getElementById('output-roi');
    const outputFeeText = document.getElementById('output-fee-text');

    function updateSimulation() {
        let m2Total = parseFloat(inputM2Total?.value) || 0;
        let priceM2 = parseFloat(inputPriceM2?.value) || 0;
        let landM2 = parseFloat(inputLandM2?.value);
        if (isNaN(landM2)) landM2 = 0;
        let costM2 = parseFloat(inputCostM2?.value) || 0;

        const variancePercent = 35; // Fixed traditional variance 35%

        const metrics = calculateFinancialMetrics({
            m2Total,
            priceM2,
            landM2,
            costM2,
            variancePercent
        });

        // Update Inputs Displays
        if (budgetValueDisplay) budgetValueDisplay.textContent = formatUSD(metrics.baseTotalCost);
        if (varianceValueDisplay) varianceValueDisplay.textContent = metrics.variancePercent + '%';
        if (outputDevTradText) outputDevTradText.textContent = metrics.variancePercent + '%';

        // Update Desviación Tradicional USD Display
        if (outputTradVarianceUSDDisplay) {
            outputTradVarianceUSDDisplay.textContent = `-${formatUSD(metrics.lossTraditional)} USD`;
        }

        // Update Incidencia Terreno Display
        if (outputLandIncidenceDisplay) {
            if (metrics.landIncidenceUSDm2 === 0) {
                outputLandIncidenceDisplay.textContent = '$0.00 / m² (0.00%)';
            } else {
                const formattedUSD = metrics.landIncidenceUSDm2 >= 1 
                    ? formatUSD(metrics.landIncidenceUSDm2) 
                    : `$${metrics.landIncidenceUSDm2.toFixed(2)}`;
                outputLandIncidenceDisplay.textContent = `${formattedUSD} / m² (${metrics.landIncidencePercent.toFixed(2)}%)`;
            }
        }

        // Update Financial Results
        if (outputSavingsDisplay) outputSavingsDisplay.textContent = formatUSD(metrics.savingsOptimia);
        if (outputRevenueTotalDisplay) outputRevenueTotalDisplay.textContent = `Ventas Est.: ${formatUSD(metrics.totalRevenue)}`;

        if (outputMarginTradDisplay) outputMarginTradDisplay.textContent = metrics.marginTraditional.toFixed(1) + '%';
        if (outputProfitTradDisplay) outputProfitTradDisplay.textContent = `Beneficio: ${formatUSD(metrics.profitTraditional)}`;

        if (outputMarginOptimiaDisplay) outputMarginOptimiaDisplay.textContent = metrics.marginOptimia.toFixed(1) + '%';
        if (outputProfitOptimiaDisplay) outputProfitOptimiaDisplay.textContent = `Beneficio Neto: ${formatUSD(metrics.profitOptimia)}`;

        if (outputRoiDisplay) outputRoiDisplay.textContent = metrics.roiFactor.toFixed(1) + 'x ROI';
        if (outputFeeText) {
            outputFeeText.textContent = `Honorarios PMO est.: ${formatUSD(metrics.pmoFeeAmount)} (${(metrics.feePercentage * 100).toFixed(1)}%)`;
        }

        updateCharts(metrics.variancePercent);
    }

    // Attach event listeners to numeric inputs
    const numericInputs = [inputM2Total, inputPriceM2, inputLandM2, inputCostM2];
    numericInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', updateSimulation);
            input.addEventListener('change', updateSimulation);
        }
    });

    // Run initial simulation
    updateSimulation();
});
