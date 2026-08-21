/**
 * OPTIMIA PMO - Interactive Tabs Controller
 */

export function setupTabs() {
    window.switchTab = function(tabKey) {
        const btnDevs = document.getElementById('tab-btn-devs');
        const btnPymes = document.getElementById('tab-btn-pymes');
        const contentDevs = document.getElementById('tab-content-devs');
        const contentPymes = document.getElementById('tab-content-pymes');

        if (!btnDevs || !btnPymes || !contentDevs || !contentPymes) return;

        if (tabKey === 'devs') {
            btnDevs.className = 'flex-1 py-3 px-4 rounded-md font-bold text-sm transition-all text-center flex items-center justify-center gap-2 bg-slateGrey text-white shadow-sm border border-slateGrey';
            btnPymes.className = 'flex-1 py-3 px-4 rounded-md font-medium text-sm transition-all text-center flex items-center justify-center gap-2 text-slateGrey hover:text-terracotta bg-white border border-cementGrey/30';
            contentDevs.classList.remove('hidden');
            contentPymes.classList.add('hidden');
        } else {
            btnPymes.className = 'flex-1 py-3 px-4 rounded-md font-bold text-sm transition-all text-center flex items-center justify-center gap-2 bg-slateGrey text-white shadow-sm border border-slateGrey';
            btnDevs.className = 'flex-1 py-3 px-4 rounded-md font-medium text-sm transition-all text-center flex items-center justify-center gap-2 text-slateGrey hover:text-terracotta bg-white border border-cementGrey/30';
            contentDevs.classList.add('hidden');
            contentPymes.classList.remove('hidden');
        }
    };
}
