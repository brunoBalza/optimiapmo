/**
 * OPTIMIA PMO - Chart.js Controller Encapsulation Module
 */

let scurveChartInstance = null;
let evmChartInstance = null;

export function initCharts(ChartClass = window.Chart) {
    if (!ChartClass) {
        console.warn('Chart.js is not loaded yet.');
        return;
    }

    // 1. S-Curve Line Chart Setup
    const ctxS = document.getElementById('chart-scurve')?.getContext('2d');
    if (ctxS) {
        scurveChartInstance = new ChartClass(ctxS, {
            type: 'line',
            data: {
                labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
                datasets: [
                    {
                        label: 'Línea Base (Planificado)',
                        data: [5, 12, 22, 35, 50, 65, 78, 88, 94, 98, 100, 100],
                        borderColor: '#A5A692',
                        borderWidth: 2,
                        borderDash: [4, 4],
                        fill: false,
                        tension: 0.3
                    },
                    {
                        label: 'OPTIMIA PMO (Óptimo)',
                        data: [5, 13, 23, 36, 51, 66, 79, 89, 95, 99, 100, 100],
                        borderColor: '#3F6352',
                        borderWidth: 3,
                        backgroundColor: 'rgba(63, 99, 82, 0.1)',
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: 'Gestión Tradicional (Desviado)',
                        data: [4, 9, 16, 26, 38, 49, 60, 70, 79, 87, 94, 98],
                        borderColor: '#C3582B',
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

    // 2. EVM Bar Chart Setup
    const ctxEVM = document.getElementById('chart-evm')?.getContext('2d');
    if (ctxEVM) {
        evmChartInstance = new ChartClass(ctxEVM, {
            type: 'bar',
            data: {
                labels: ['CPI (Eficiencia de Coste)', 'SPI (Eficiencia de Plazo)'],
                datasets: [
                    {
                        label: 'Gestión Tradicional',
                        data: [0.87, 0.89],
                        backgroundColor: '#C3582B',
                        borderRadius: 4
                    },
                    {
                        label: 'OPTIMIA PMO',
                        data: [0.99, 1.01],
                        backgroundColor: '#3F6352',
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

    // 2. Update S-Curve Chart (Timeline stretch)
    const totalMonths = 12 + Math.round((variancePercent / 50) * 6);
    const newLabels = [];
    for (let i = 1; i <= totalMonths; i++) {
        newLabels.push('M' + i);
    }

    const basePlanned = [5, 12, 22, 35, 50, 65, 78, 88, 94, 98, 100, 100];
    const baseOptimia = [5, 13, 23, 36, 51, 66, 79, 89, 95, 99, 100, 100];

    const plannedData = [];
    const optimiaData = [];
    const traditionalData = [];

    for (let i = 0; i < totalMonths; i++) {
        if (i < 12) {
            plannedData.push(basePlanned[i]);
            optimiaData.push(baseOptimia[i]);
        } else {
            plannedData.push(100);
            optimiaData.push(100);
        }

        let progressRatio = (i + 1) / totalMonths;
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
