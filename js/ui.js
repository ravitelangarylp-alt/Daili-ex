import { habitDefinitions, subhashitas } from './data.js';
import { Store } from './store.js';

export const UI = {
    renderHabits(isBusyDay, log) {
        const container = document.getElementById('habits-container');
        container.innerHTML = '';

        habitDefinitions.forEach(habit => {
            if (isBusyDay && habit.category === 'growth') return; // Hide non-essentials on busy days
            
            const targetText = isBusyDay && habit.minBusy ? `${habit.minBusy} units (Busy Mode)` : habit.target;
            const value = log.habits[habit.id] || '';

            let inputHtml = '';
            if (habit.type === 'boolean') {
                const checked = value === true ? 'checked' : '';
                inputHtml = `<input type="checkbox" class="checkbox-large habit-input" data-id="${habit.id}" ${checked}>`;
            } else if (habit.type === 'number') {
                inputHtml = `<input type="number" class="habit-input" data-id="${habit.id}" value="${value}" style="width: 80px;" placeholder="Amt">`;
            } else {
                inputHtml = `<textarea class="habit-input" data-id="${habit.id}" rows="2" placeholder="Notes...">${value}</textarea>`;
            }

            const html = `
                <div class="habit-item glass-card">
                    <div class="habit-info">
                        <h4>${habit.title}</h4>
                        <p>${targetText}</p>
                    </div>
                    ${inputHtml}
                </div>
            `;
            container.innerHTML += html;
        });
    },

    updateMotivationalMessage(dayNum) {
        // Cycle through subhashitas if dayNum exceeds array length
        const index = (dayNum - 1) % subhashitas.length;
        const msg = subhashitas[index];
        document.getElementById('motivational-message').innerHTML = `
            <div class="sanskrit-text">${msg.quote}</div>
            <div class="kannada-text mt-2">${msg.meaning}</div>
        `;
    },

    checkRecoveryIndicator() {
        const yesterday = Store.getYesterdayLog();
        const today = Store.getTodayLog();
        const msgBox = document.getElementById('recovery-message');
        
        if (yesterday && !Logic.isDaySuccessful(yesterday)) {
            msgBox.classList.remove('hidden');
            if (today && Object.keys(today.habits).length > 0) {
                msgBox.textContent = "You returned. That is discipline.";
                msgBox.style.color = "var(--success-color)";
            } else {
                msgBox.textContent = "One missed day is not failure. Return tomorrow.";
                msgBox.style.color = "var(--warning-color)";
            }
        } else {
            msgBox.classList.add('hidden');
        }
    }
};
