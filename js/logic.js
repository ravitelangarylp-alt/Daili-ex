import { Store } from './store.js';
import { habitDefinitions } from './data.js';

export const Logic = {
    calculateDayNumber() {
        const config = Store.get('userConfig');
        if (!config) return 0;
        const start = new Date(config.startDate);
        const current = new Date(Store.getLogicalDate());
        const diffTime = Math.abs(current - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    },

    calculateStreak() {
        const logs = Store.get('logs') || {};
        const dates = Object.keys(logs).sort().reverse();
        let streak = 0;
        for (let date of dates) {
            if (this.isDaySuccessful(logs[date])) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    },

    isDaySuccessful(log) {
        if (!log) return false;
        let requiredCoreCount = 0;
        let completedCoreCount = 0;

        habitDefinitions.forEach(habit => {
            if (habit.category === 'core') {
                requiredCoreCount++;
                const userHabit = log.habits[habit.id];
                if (userHabit) {
                    if (habit.type === 'boolean' && userHabit === true) completedCoreCount++;
                    if (habit.type === 'number' && userHabit >= (log.isBusyDay ? habit.minBusy : habit.minNormal)) completedCoreCount++;
                    if (habit.type === 'text' && userHabit.length > 5) completedCoreCount++; // Basic text validation
                }
            }
        });

        // "Minimum Day" concept: If busy day, completing 60% of core habits saves the streak
        const threshold = log.isBusyDay ? 0.6 : 0.8;
        return (completedCoreCount / requiredCoreCount) >= threshold;
    }
};
