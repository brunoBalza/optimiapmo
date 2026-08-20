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

    // 2. DOM Elements for Simulator
    const budgetSlider = document.getElementById('budget-slider');
    const varianceSlider = document.getElementById('variance-slider');

    const budgetValueDisplay = document.getElementById('budget-value');
    const varianceValueDisplay = document.getElementById('variance-value');

    const outputLossDisplay = document.getElementById('output-loss');
    const outputSavingsDisplay = document.getElementById('output-savings');
    const outputRoiDisplay = document.getElementById('output-roi');
    const outputFeeText = document.getElementById('output-fee-text');

    function updateSimulation() {
        if (!budgetSlider || !varianceSlider) return;

        const budget = parseFloat(budgetSlider.value);
        const variancePercent = parseFloat(varianceSlider.value);

        const metrics = calculateFinancialMetrics(budget, variancePercent);

        if (budgetValueDisplay) budgetValueDisplay.textContent = formatUSD(metrics.budget);
        if (varianceValueDisplay) varianceValueDisplay.textContent = metrics.variancePercent + '%';

        if (outputLossDisplay) outputLossDisplay.textContent = formatUSD(metrics.lossTraditional);
        if (outputSavingsDisplay) outputSavingsDisplay.textContent = formatUSD(metrics.savingsOptimia);
        if (outputRoiDisplay) outputRoiDisplay.textContent = metrics.roiFactor.toFixed(1) + 'x';
        if (outputFeeText) {
            outputFeeText.textContent = `Honorarios PMO est.: ${formatUSD(metrics.pmoFeeAmount)} (${(metrics.feePercentage * 100).toFixed(1)}%)`;
        }

        updateCharts(metrics.variancePercent);
    }

    if (budgetSlider && varianceSlider) {
        budgetSlider.addEventListener('input', updateSimulation);
        varianceSlider.addEventListener('input', updateSimulation);
        updateSimulation();
    }
});
