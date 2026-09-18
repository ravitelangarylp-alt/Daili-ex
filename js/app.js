import { Store } from './store.js';
import { Logic } from './logic.js';
import { UI } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const config = Store.get('userConfig');
    
    if (!config) {
        document.getElementById('setup-screen').classList.remove('hidden');
    } else {
        document.getElementById('dashboard-screen').classList.remove('hidden');
        initDashboard();
    }

    // Setup Listener
    document.getElementById('btn-start-journey').addEventListener('click', () => {
        const startDate = document.getElementById('setup-start-date').value || Store.getLogicalDate();
        Store.initUser({
            startDate,
            wakeTarget: document.getElementById('setup-wake-target').value,
            nyayaText: document.getElementById('setup-nyaya-text').value,
            mimamsaText: document.getElementById('setup-mimamsa-text').value,
            goal: document.getElementById('setup-goal').value
        });
        document.getElementById('setup-screen').classList.add('hidden');
        document.getElementById('dashboard-screen').classList.remove('hidden');
        initDashboard();
    });

    // Save Progress Listener
    document.getElementById('btn-save-day').addEventListener('click', () => {
        const log = Store.getTodayLog();
        log.isBusyDay = document.getElementById('busy-day-toggle').checked;
        
        document.querySelectorAll('.habit-input').forEach(input => {
            const id = input.getAttribute('data-id');
            if (input.type === 'checkbox') {
                log.habits[id] = input.checked;
            } else {
                log.habits[id] = input.value;
            }
        });
        
        Store.saveTodayLog(log);
        alert('Progress saved securely on this device.');
        initDashboard(); // Refresh stats
    });

    // Busy Day Toggle Listener
    document.getElementById('busy-day-toggle').addEventListener('change', (e) => {
        const log = Store.getTodayLog();
        log.isBusyDay = e.target.checked;
        Store.saveTodayLog(log);
        UI.renderHabits(log.isBusyDay, log);
    });
});

function initDashboard() {
    const dayNum = Logic.calculateDayNumber();
    const log = Store.getTodayLog();
    
    document.getElementById('current-day').textContent = dayNum;
    document.getElementById('busy-day-toggle').checked = log.isBusyDay || false;
    document.getElementById('current-streak').textContent = Logic.calculateStreak();
    
    UI.updateMotivationalMessage(dayNum);
    UI.renderHabits(log.isBusyDay, log);
    UI.checkRecoveryIndicator();
}
