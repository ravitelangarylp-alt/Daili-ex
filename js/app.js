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

    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
            document.getElementById(e.target.getAttribute('data-target')).classList.remove('hidden');
            
            const target = e.target.getAttribute('data-target');
            if(target === 'study-screen') UI.renderStudyCenter();
            if(target === 'journal-screen') UI.renderJournalFeed();
            if(target === 'review-screen') UI.renderReviews();
            if(target === 'settings-screen') UI.renderCalendar();
        });
    });

    // Setup
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

    // Save Daily Progress
    document.getElementById('btn-save-day').addEventListener('click', () => {
        const dateStr = Store.getLogicalDate();
        const log = Store.getLog(dateStr);
        log.isBusyDay = document.getElementById('busy-day-toggle').checked;
        
        document.querySelectorAll('.habit-input').forEach(input => {
            const id = input.getAttribute('data-id');
            log.habits[id] = input.type === 'checkbox' ? input.checked : input.value;
        });
        
        Store.saveLog(dateStr, log);
        initDashboard();
    });

    // Busy Day Toggle
    document.getElementById('busy-day-toggle').addEventListener('change', (e) => {
        const dateStr = Store.getLogicalDate();
        const log = Store.getLog(dateStr);
        log.isBusyDay = e.target.checked;
        document.getElementById('busy-day-label').textContent = log.isBusyDay ? "BUSY DAY — MINIMUM DISCIPLINE" : "Busy Day Mode";
        Store.saveLog(dateStr, log);
        UI.renderHabits(log.isBusyDay, log);
    });

    // Save Journal
    document.getElementById('btn-save-journal').addEventListener('click', () => {
        const topic = document.getElementById('journal-topic').value;
        const desc = document.getElementById('journal-desc').value;
        const source = document.getElementById('journal-source').value;
        const time = document.getElementById('journal-time').value;
        
        if(!topic || !desc) return alert("Topic and description required.");
        
        let journal = Store.get('journal') || [];
        journal.push({
            date: Store.getLogicalDate(),
            day: Logic.calculateDayNumber(),
            topic, desc, source, time: time || 0
        });
        Store.set('journal', journal);
        
        document.getElementById('journal-topic').value = '';
        document.getElementById('journal-desc').value = '';
        document.getElementById('journal-source').value = '';
        document.getElementById('journal-time').value = '';
        UI.renderJournalFeed();
    });
    
    // Save Review
    document.getElementById('btn-save-review').addEventListener('click', () => {
        let reviews = Store.get('reviews') || {};
        reviews[Store.getLogicalDate()] = {
            type: document.getElementById('review-title').textContent,
            well: document.getElementById('review-went-well').value,
            improve: document.getElementById('review-improve').value,
            focus: document.getElementById('review-focus').value
        };
        Store.set('reviews', reviews);
        UI.renderReviews();
    });

    // Settings
    document.getElementById('btn-export').addEventListener('click', () => Store.exportData());
    
    document.getElementById('btn-import').addEventListener('click', () => {
        const file = document.getElementById('import-file').files[0];
        if(!file) return alert("Select a JSON file first.");
        const reader = new FileReader();
        reader.onload = (e) => {
            if(Store.importData(e.target.result)) {
                alert("Data imported successfully. Reloading...");
                location.reload();
            } else {
                alert("Invalid backup file.");
            }
        };
        reader.readAsText(file);
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
        if(confirm("DANGER: This will permanently delete your 90-day progress on this device. Proceed?")) {
            Store.resetData();
            location.reload();
        }
    });
});

function initDashboard() {
    const dayNum = Logic.calculateDayNumber();
    const displayElement = document.getElementById('day-counter-display');
    
    if (dayNum < 1) {
        displayElement.innerHTML = "Journey starts on " + Store.get('userConfig').startDate;
    } else if (dayNum > 90) {
        displayElement.innerHTML = "Journey Completed! Day 90+";
    } else {
        displayElement.innerHTML = `Day <span id="current-day">${dayNum}</span> of 90`;
    }
    
    const log = Store.getLog(Store.getLogicalDate());
    document.getElementById('busy-day-toggle').checked = log.isBusyDay || false;
    document.getElementById('busy-day-label').textContent = log.isBusyDay ? "BUSY DAY — MINIMUM DISCIPLINE" : "Busy Day Mode";
    
    document.getElementById('current-streak').textContent = Logic.calculateStreak();
    document.getElementById('consistency-7d').textContent = Logic.calculateConsistency(7) + "%";
    
    UI.updateMotivationalMessage(dayNum);
    UI.renderHabits(log.isBusyDay, log);
    UI.checkRecoveryIndicator();
}
