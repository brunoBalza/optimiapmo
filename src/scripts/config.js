/**
 * OPTIMIA PMO - Global Business & Application Configuration
 */
export const CONFIG = {
    BRAND: {
        NAME: 'OPTIMIA PMO',
        TAGLINE: 'Gerenciamiento Eficiente de Proyectos Inmobiliarios & Ingeniería de Procesos',
        DIRECTOR: 'Adrián Manrique',
        LOCATION: 'Mendoza, Argentina',
        EMAIL: 'arq.adrianmanrique@gmail.com'
    },
    SIMULATOR_DEFAULTS: {
        BUDGET: 1500000,
        VARIANCE: 15,
        SAVINGS_FACTOR: 0.90 // 90% risk mitigation capacity
    },
    FEE_TIERS: [
        { minBudget: 2000000, feePercent: 0.015 }, // > $2.0M USD -> 1.5%
        { minBudget: 500000, feePercent: 0.020 },  // $500K - $2.0M USD -> 2.0%
        { minBudget: 0, feePercent: 0.025 }        // < $500K USD -> 2.5%
    ]
};
