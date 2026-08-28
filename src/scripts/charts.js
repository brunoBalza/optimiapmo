/**
 * OPTIMIA PMO - Chart.js Controller Encapsulation Module
 */

import { CONFIG } from './config.js';

let scurveChartInstance = null;
let evmChartInstance = null;

const BASE_PLANNED = [5, 12, 22, 35, 50, 65, 78, 88, 94, 98, 100, 100];

/**
 * Calculates accumulated physical progress % at a given month number.
 * @param {number} monthNum - 1-indexed month number
 * @param {number} speedFactor - Duration multiplier (1.0 = baseline, 1.10 = +10% duration for OPTIMIA PMO)
 */
function getProgressAtMonth(monthNum, speedFactor = 1.0) {
    const tEff = monthNum / speedFactor;
    if (tEff <= 0) return 0;
    if (tEff >= 12) return 100;
    
    const idx = Math.floor(tEff);
    const frac = tEff - idx;
    const p1 = idx === 0 ? 0 : BASE_PLANNED[idx - 1];
    const p2 = BASE_PLANNED[Math.min(idx, BASE_PLANNED.length - 1)];
    return Math.round((p1 + (p2 - p1) * frac) * 10) / 10;
}

export function initCharts(ChartClass = window.Chart) {
    if (!ChartClass) {
        console.warn('Chart.js is not loaded yet.');
        return;
    }

    // 1. S-Curve Line Chart Setup (Canvas ID lookup support: chart-scurve or curvaS)
    const canvasS = document.getElementById('chart-scurve') || document.getElementById('curvaS');
    const ctxS = canvasS?.getContext('2d');
    if (ctxS) {
        scurveChartInstance = new ChartClass(ctxS, {
            type: 'line',
            data: {
                labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12', 'M13', 'M14', 'M15', 'M16'],
                datasets: [
                    {
                        label: 'Línea Base (Óptimo)',
                        data: [5, 12, 22, 35, 50, 65, 78, 88, 94, 98, 100, 100, 100, 100, 100, 100],
                        borderColor: '#A5A692',
                        borderWidth: 2,
                        borderDash: [4, 4],
                        fill: false,
                        tension: 0.3
                    },
                    {
                        label: 'OPTIMIA PMO',
                        data: [4.5, 10.7, 19.3, 31, 43.3, 56.8, 70.9, 82.2, 89.8, 94.4, 98, 99.8, 100, 100, 100, 100],
                        borderColor: '#3A6150',
                        borderWidth: 3,
                        backgroundColor: 'rgba(58, 97, 80, 0.1)',
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: 'Gestión Tradicional (Desviado)',
                        data: [4, 9, 16, 26, 38, 49, 60, 70, 79, 87, 94, 98, 99, 100, 100, 100],
                        borderColor: '#C0613E',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: { color: 'rgba(165, 166, 146, 0.2)' },
                        ticks: { color: '#41495E', font: { family: 'JetBrains Mono', size: 11 } }
                    },
                    y: {
                        min: 0,
                        max: 100,
                        grid: { color: 'rgba(165, 166, 146, 0.2)' },
                        ticks: { 
                            color: '#41495E', 
                            font: { family: 'JetBrains Mono', size: 11 },
                            callback: function(val) { return val + '%'; }
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: '#41495E', font: { family: 'Inter', size: 11, weight: '600' } }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(ctx) { return ctx.dataset.label + ': ' + ctx.parsed.y + '%'; }
                        }
                    }
                }
            }
        });
    }

    // 2. EVM Bar Chart Setup (Canvas ID lookup support: chart-evm or indicadoresEVM)
    const canvasEVM = document.getElementById('chart-evm') || document.getElementById('indicadoresEVM');
    const ctxEVM = canvasEVM?.getContext('2d');
    if (ctxEVM) {
        evmChartInstance = new ChartClass(ctxEVM, {
            type: 'bar',
            data: {
                labels: ['CPI (Eficiencia de Coste)', 'SPI (Eficiencia de Plazo)'],
                datasets: [
                    {
                        label: 'Gestión Tradicional',
                        data: [0.87, 0.89],
                        backgroundColor: '#C0613E',
                        borderRadius: 4
                    },
                    {
                        label: 'OPTIMIA PMO',
                        data: [0.99, 1.01],
                        backgroundColor: '#3A6150',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: '#41495E', font: { family: 'Inter', size: 11, weight: 'bold' } }
                    },
                    y: {
                        min: 0.5,
                        max: 1.2,
                        grid: { color: 'rgba(165, 166, 146, 0.2)' },
                        ticks: { color: '#41495E', font: { family: 'JetBrains Mono', size: 11 } }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: '#41495E', font: { family: 'Inter', size: 11, weight: '600' } }
                    }
                }
            }
        });
    }
}

export function updateCharts(variancePercent) {
    if (!scurveChartInstance || !evmChartInstance) return;

    // 1. Update EVM Bar Chart
    const tradCPI = (1 / (1 + (variancePercent / 100))).toFixed(2);
    const tradSPI = (1 / (1 + ((variancePercent * 0.8) / 100))).toFixed(2);

    evmChartInstance.data.datasets[0].data = [parseFloat(tradCPI), parseFloat(tradSPI)];
    evmChartInstance.update();

    // 2. Update S-Curve Chart (Timeline stretch for traditional management vs controlled Optimia)
    const totalMonths = 12 + Math.round((variancePercent / 50) * 6);
    const newLabels = [];
    for (let i = 1; i <= totalMonths; i++) {
        newLabels.push('M' + i);
    }

    const plannedData = [];
    const optimiaData = [];
    const traditionalData = [];

    for (let i = 1; i <= totalMonths; i++) {
        // Línea Base (Óptimo): 12 months timeline (speedFactor = 1.0)
        plannedData.push(getProgressAtMonth(i, 1.0));

        // OPTIMIA PMO: +10% controlled duration shift (speedFactor = 1.10, t_optimia = t / 1.10)
        optimiaData.push(getProgressAtMonth(i, 1.10));

        // Gestión Tradicional: progress ratio based on total stretched duration
        let progressRatio = i / totalMonths;
        let tradVal = Math.round(100 * Math.pow(progressRatio, 1.8));
        if (tradVal > 100) tradVal = 100;
        traditionalData.push(tradVal);
    }

    scurveChartInstance.data.labels = newLabels;
    scurveChartInstance.data.datasets[0].data = plannedData;
    scurveChartInstance.data.datasets[1].data = optimiaData;
    scurveChartInstance.data.datasets[2].data = traditionalData;

    scurveChartInstance.update();
}
