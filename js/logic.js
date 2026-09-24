import { Store } from './store.js';
import { habitDefinitions } from './data.js';

export const Logic = {
    calculateDayNumber() {
        const config = Store.get('userConfig');
        if (!config) return 0;
        
        const start = new Date(`${config.startDate}T00:00:00`);
        const currentLogDateStr = Store.getLogicalDate();
        const current = new Date(`${currentLogDateStr}T00:00:00`);
        
        if (current < start) return -1;
        const diffTime = current.getTime() - start.getTime();
        const dayNum = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return dayNum;
    },

    assessDay(log) {
        if (!log || Object.keys(log.habits).length === 0) return 'missed';
        
        let reqCore = 0, compCore = 0;
        let reqEss = 0, compEss = 0;

        habitDefinitions.forEach(habit => {
            const val = log.habits[habit.id];
            const hasValue = (val !== undefined && val !== false && val !== '');
            
            if (habit.category === 'core' || habit.category === 'study') {
                reqCore++;
                if (habit.essential) reqEss++;
                
                if (hasValue) {
                    if (habit.type === 'number' && Number(val) >= habit.minNormal) compCore++;
                    else if (habit.type === 'boolean' && val === true) compCore++;
                    else if (habit.type === 'text' && val.length > 2) compCore++;
                    
                    if (habit.essential) {
                        if (habit.type === 'number' && Number(val) >= habit.minBusy) compEss++;
                        else if (habit.type === 'boolean' && val === true) compEss++;
                        else if (habit.type === 'text' && val.length > 2) compEss++;
                    }
                }
            }
        });

        if (log.isBusyDay && compEss === reqEss) return 'minimum';
        if (!log.isBusyDay && compCore === reqCore) return 'full';
        if (compCore > 0 || compEss > 0) return 'partial';
        return 'missed';
    },

    calculateStreak() {
        const logs = Store.get('logs') || {};
        let streak = 0;
        
        const currentLogDateStr = Store.getLogicalDate();
        let checkDate = new Date(`${currentLogDateStr}T00:00:00`);
        
        let statusToday = this.assessDay(logs[currentLogDateStr]);
        
        if (statusToday === 'full' || statusToday === 'minimum') {
            streak++;
        } else if (statusToday === 'missed' && Object.keys(logs[currentLogDateStr]?.habits || {}).length > 0) {
            // Explicitly marked as missed today
            return 0;
        }

        // Start checking backwards from yesterday
        checkDate.setDate(checkDate.getDate() - 1);
        
        while(true) {
            const y = checkDate.getFullYear();
            const m = String(checkDate.getMonth() + 1).padStart(2, '0');
            const d = String(checkDate.getDate()).padStart(2, '0');
            const dateStr = `${y}-${m}-${d}`;
            
            let s = this.assessDay(logs[dateStr]);
            if (s === 'full' || s === 'minimum') {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
        }
        return streak;
    },

    calculateConsistency(daysBack) {
        const logs = Store.get('logs') || {};
        let successCount = 0;
        const currentLogDateStr = Store.getLogicalDate();
        let checkDate = new Date(`${currentLogDateStr}T00:00:00`);

        for (let i = 0; i < daysBack; i++) {
            const y = checkDate.getFullYear();
            const m = String(checkDate.getMonth() + 1).padStart(2, '0');
            const d = String(checkDate.getDate()).padStart(2, '0');
            const dateStr = `${y}-${m}-${d}`;
            
            const status = this.assessDay(logs[dateStr]);
            if (status === 'full' || status === 'minimum' || status === 'partial') successCount++;
            
            checkDate.setDate(checkDate.getDate() - 1);
        }
        return Math.round((successCount / daysBack) * 100);
    },

    getStudyStats() {
        const logs = Store.get('logs') || {};
        let stats = { prayogaTotal: 0, prayogaDays: 0, nyayaTotal: 0, nyayaDays: 0, mimamsaTotal: 0, mimamsaDays: 0 };
        
        Object.values(logs).forEach(log => {
            if(log.habits['prayoga'] > 0) { stats.prayogaTotal += Number(log.habits['prayoga']); stats.prayogaDays++; }
            if(log.habits['nyaya'] > 0) { stats.nyayaTotal += Number(log.habits['nyaya']); stats.nyayaDays++; }
            if(log.habits['mimamsa'] > 0) { stats.mimamsaTotal += Number(log.habits['mimamsa']); stats.mimamsaDays++; }
        });
        return stats;
    }
};
