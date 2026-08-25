/**
 * OPTIMIA PMO - Main Application Orchestrator & Bootstrapper
 */
import { setupNavigation } from './navigation.js';
import { setupTabs } from './tabs.js';
import { setupContactForm } from './form.js';
import { calculateFinancialMetrics, formatUSD } from './simulator.js';
import { initCharts, updateCharts } from './charts.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize UI Handlers
    setupNavigation();
    setupTabs();
    setupContactForm();
    initCharts();

    // 2. DOM Elements for Simulator Inputs
    const inputM2Total = document.getElementById('input-m2-total');
    const inputPriceM2 = document.getElementById('input-price-m2');
    const inputLandM2 = document.getElementById('input-land-m2');
    const inputCostM2 = document.getElementById('input-cost-m2');

    const budgetSlider = document.getElementById('budget-slider');
    const varianceSlider = document.getElementById('variance-slider');

    // Display Output Elements
    const budgetValueDisplay = document.getElementById('budget-value');
    const varianceValueDisplay = document.getElementById('variance-value');
    const outputDevTradText = document.getElementById('output-dev-trad-text');

    const outputSavingsDisplay = document.getElementById('output-savings');
    const outputRevenueTotalDisplay = document.getElementById('output-revenue-total');
    
    const outputMarginTradDisplay = document.getElementById('output-margin-trad');
    const outputProfitTradDisplay = document.getElementById('output-profit-trad');
    
    const outputMarginOptimiaDisplay = document.getElementById('output-margin-optimia');
    const outputProfitOptimiaDisplay = document.getElementById('output-profit-optimia');

    const outputRoiDisplay = document.getElementById('output-roi');
    const outputFeeText = document.getElementById('output-fee-text');

    function updateSimulation(eventSource) {
        if (!budgetSlider || !varianceSlider) return;

        let m2Total = parseFloat(inputM2Total?.value) || 1500;
        let priceM2 = parseFloat(inputPriceM2?.value) || 1800;
        let landM2 = parseFloat(inputLandM2?.value) || 300;
        let costM2 = parseFloat(inputCostM2?.value) || 1000;
        let budget = parseFloat(budgetSlider.value) || 1500000;
        let variancePercent = parseFloat(varianceSlider.value) || 35;

        // Synchronize costM2 and budgetSlider
        if (eventSource === 'cost-or-m2') {
            budget = costM2 * m2Total;
            budgetSlider.value = budget;
        } else if (eventSource === 'budget-slider') {
            if (m2Total > 0) {
                costM2 = Math.round(budget / m2Total);
                if (inputCostM2) inputCostM2.value = costM2;
            }
        }

        const metrics = calculateFinancialMetrics({
            budget,
            m2Total,
            priceM2,
            landM2,
            costM2,
            variancePercent
        });

        // Update Inputs Displays
        if (budgetValueDisplay) budgetValueDisplay.textContent = formatUSD(metrics.budget);
        if (varianceValueDisplay) varianceValueDisplay.textContent = metrics.variancePercent + '%';
        if (outputDevTradText) outputDevTradText.textContent = metrics.variancePercent + '%';

        // Update Financial Results
        if (outputSavingsDisplay) outputSavingsDisplay.textContent = formatUSD(metrics.savingsOptimia);
        if (outputRevenueTotalDisplay) outputRevenueTotalDisplay.textContent = `Ventas Est.: ${formatUSD(metrics.totalRevenue)}`;

        if (outputMarginTradDisplay) outputMarginTradDisplay.textContent = metrics.marginTraditional.toFixed(1) + '%';
        if (outputProfitTradDisplay) outputProfitTradDisplay.textContent = `Ganancia: ${formatUSD(metrics.profitTraditional)}`;

        if (outputMarginOptimiaDisplay) outputMarginOptimiaDisplay.textContent = metrics.marginOptimia.toFixed(1) + '%';
        if (outputProfitOptimiaDisplay) outputProfitOptimiaDisplay.textContent = `Ganancia: ${formatUSD(metrics.profitOptimia)}`;

        if (outputRoiDisplay) outputRoiDisplay.textContent = metrics.roiFactor.toFixed(1) + 'x ROI';
        if (outputFeeText) {
            outputFeeText.textContent = `Honorarios PMO est.: ${formatUSD(metrics.pmoFeeAmount)} (${(metrics.feePercentage * 100).toFixed(1)}%)`;
        }

        updateCharts(metrics.variancePercent);
    }

    if (budgetSlider && varianceSlider) {
        budgetSlider.addEventListener('input', () => updateSimulation('budget-slider'));
        varianceSlider.addEventListener('input', () => updateSimulation('variance-slider'));

        if (inputM2Total) inputM2Total.addEventListener('input', () => updateSimulation('cost-or-m2'));
        if (inputPriceM2) inputPriceM2.addEventListener('input', () => updateSimulation('input'));
        if (inputLandM2) inputLandM2.addEventListener('input', () => updateSimulation('input'));
        if (inputCostM2) inputCostM2.addEventListener('input', () => updateSimulation('cost-or-m2'));

        updateSimulation('init');
    }
});
