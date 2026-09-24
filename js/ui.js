import { habitDefinitions, subhashitas } from './data.js';
import { Store } from './store.js';
import { Logic } from './logic.js';

export const UI = {
    renderHabits(isBusyDay, log) {
        const container = document.getElementById('habits-container');
        container.innerHTML = '';
        
        // Group by category conceptually, render in order
        habitDefinitions.forEach(habit => {
            if (isBusyDay && !habit.essential) return; // Busy day protection
            
            const targetText = isBusyDay && habit.minBusy ? `${habit.minBusy} units` : habit.target;
            const value = log.habits[habit.id] !== undefined ? log.habits[habit.id] : '';
            let inputHtml = '';

            if (habit.type === 'boolean') {
                const checked = value === true ? 'checked' : '';
                inputHtml = `<input type="checkbox" class="checkbox-large habit-input" data-id="${habit.id}" ${checked}>`;
            } else if (habit.type === 'number') {
                inputHtml = `<input type="number" step="0.1" class="habit-input" data-id="${habit.id}" value="${value}" style="width: 80px;" placeholder="Amt">`;
            } else if (habit.id === 'mit') {
                 inputHtml = `<input type="text" class="habit-input" data-id="${habit.id}" value="${value}" placeholder="Today's Most Important Task">`;
            } else {
                inputHtml = `<textarea class="habit-input" data-id="${habit.id}" rows="2" placeholder="Notes...">${value}</textarea>`;
            }

            container.innerHTML += `
                <div class="habit-item glass-card" style="border-left: 3px solid ${habit.essential ? 'var(--accent-color)' : 'transparent'}">
                    <div class="habit-info">
                        <h4>${habit.title}</h4>
                        <p>${targetText}</p>
                    </div>
                    ${inputHtml}
                </div>`;
        });
        
        // Status indicator update
        const status = Logic.assessDay(log);
        const indicator = document.getElementById('day-status-indicator');
        if(status === 'missed' && Object.keys(log.habits).length === 0) {
            indicator.classList.add('hidden');
        } else {
            indicator.classList.remove('hidden', 'status-full', 'status-minimum', 'status-partial');
            indicator.classList.add(`status-${status}`);
            indicator.textContent = status === 'full' ? 'FULL DISCIPLINE DAY' : 
                                    status === 'minimum' ? 'BUSY DAY — MINIMUM DISCIPLINE' : 'PARTIAL DAY';
        }
    },

    updateMotivationalMessage(dayNum) {
        if(dayNum < 1) return;
        const index = (dayNum - 1) % subhashitas.length;
        const msg = subhashitas[index];
        document.getElementById('motivational-message').innerHTML = `
            <div class="sanskrit-text">${msg.quote}</div>
            <div class="kannada-text mt-2">${msg.meaning}</div>
        `;
    },

    checkRecoveryIndicator() {
        const yesterdayStr = Store.getYesterdayDateStr();
        const logs = Store.get('logs') || {};
        const yesterdayStatus = Logic.assessDay(logs[yesterdayStr]);
        const todayStatus = Logic.assessDay(Store.getLog(Store.getLogicalDate()));
        
        const msgBox = document.getElementById('recovery-message');
        
        if (yesterdayStatus === 'missed') {
            msgBox.classList.remove('hidden');
            if (todayStatus === 'full' || todayStatus === 'minimum') {
                msgBox.textContent = "You returned. That is discipline.";
                msgBox.style.color = "var(--success-color)";
                msgBox.style.backgroundColor = "rgba(21, 128, 61, 0.1)";
            } else {
                msgBox.textContent = "One missed day is not failure. Return tomorrow.";
                msgBox.style.color = "var(--danger-color)";
                msgBox.style.backgroundColor = "rgba(220, 38, 38, 0.1)";
            }
        } else {
            msgBox.classList.add('hidden');
        }
    },

    renderStudyCenter() {
        const config = Store.get('userConfig');
        if(config.nyayaText) document.getElementById('display-nyaya-title').textContent = config.nyayaText;
        if(config.mimamsaText) document.getElementById('display-mimamsa-title').textContent = config.mimamsaText;
        
        const stats = Logic.getStudyStats();
        document.getElementById('stat-prayoga-total').textContent = stats.prayogaTotal;
        document.getElementById('stat-prayoga-days').textContent = stats.prayogaDays;
        document.getElementById('stat-nyaya-total').textContent = stats.nyayaTotal;
        document.getElementById('stat-nyaya-days').textContent = stats.nyayaDays;
        document.getElementById('stat-mimamsa-total').textContent = stats.mimamsaTotal;
        document.getElementById('stat-mimamsa-days').textContent = stats.mimamsaDays;
    },

    renderJournalFeed() {
        const journal = Store.get('journal') || [];
        const feed = document.getElementById('journal-feed');
        feed.innerHTML = '';
        journal.slice().reverse().forEach(entry => {
            feed.innerHTML += `
                <div class="journal-entry">
                    <div class="journal-date">Day ${entry.day} • ${entry.date} • ${entry.time} mins</div>
                    <div class="journal-topic">${entry.topic}</div>
                    <div>${entry.desc}</div>
                    ${entry.source ? `<div style="font-size:0.8rem; color:var(--text-secondary); margin-top:4px;">Source: ${entry.source}</div>` : ''}
                </div>
            `;
        });
    },
    
    renderReviews() {
        const dayNum = Logic.calculateDayNumber();
        const container = document.getElementById('review-prompt-container');
        const feed = document.getElementById('review-history-feed');
        
        // Determine if review prompt should show
        let reviewType = null;
        if(dayNum === 90) reviewType = "Day 90: Self-Mastery";
        else if (dayNum === 60) reviewType = "Day 60: Consistency";
        else if (dayNum === 30) reviewType = "Day 30: Foundation";
        else if (dayNum > 0 && dayNum % 7 === 0) reviewType = `Week ${dayNum/7} Review`;
        
        const reviews = Store.get('reviews') || {};
        const todayStr = Store.getLogicalDate();
        
        if (reviewType && !reviews[todayStr]) {
            container.classList.remove('hidden');
            document.getElementById('review-title').textContent = reviewType;
            document.getElementById('review-stats').innerHTML = `
                <div class="stat-card"><span class="stat-value">${Logic.calculateConsistency(7)}%</span><span class="stat-label">7d Consistency</span></div>
                <div class="stat-card"><span class="stat-value">${Logic.calculateStreak()}</span><span class="stat-label">Current Streak</span></div>
            `;
        } else {
            container.classList.add('hidden');
        }
        
        feed.innerHTML = '';
        Object.keys(reviews).sort().reverse().forEach(date => {
            const r = reviews[date];
            feed.innerHTML += `
                <div class="review-entry">
                    <div class="journal-topic">${r.type} • ${date}</div>
                    <div><strong>Well:</strong> ${r.well}</div>
                    <div><strong>Improve:</strong> ${r.improve}</div>
                    <div><strong>Focus:</strong> ${r.focus}</div>
                </div>
            `;
        });
    },

    renderCalendar() {
        const config = Store.get('userConfig');
        if(!config) return;
        const start = new Date(`${config.startDate}T00:00:00`);
        const logs = Store.get('logs') || {};
        const cal = document.getElementById('calendar-heatmap');
        cal.innerHTML = '';

        for(let i=0; i<90; i++) {
            let d = new Date(start);
            d.setDate(d.getDate() + i);
            const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
            
            let statusClass = '';
            if(logs[dateStr]) {
                const s = Logic.assessDay(logs[dateStr]);
                statusClass = `cal-${s}`;
            }
            cal.innerHTML += `<div class="cal-day ${statusClass}">${i+1}</div>`;
        }
    }
};
