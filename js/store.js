export const Store = {
    get(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    
    // Core logic: Calculate the logical date using IST and a 3:00 AM boundary
    getLogicalDate() {
        const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
        now.setHours(now.getHours() - 3); // Shift day boundary to 3:00 AM
        return now.toISOString().split('T')[0];
    },

    initUser(config) {
        this.set('userConfig', config);
        this.set('logs', {});
    },

    getTodayLog() {
        const date = this.getLogicalDate();
        let logs = this.get('logs') || {};
        if (!logs[date]) {
            logs[date] = { date: date, isBusyDay: false, habits: {} };
            this.set('logs', logs);
        }
        return logs[date];
    },

    saveTodayLog(logData) {
        const date = this.getLogicalDate();
        let logs = this.get('logs') || {};
        logs[date] = logData;
        this.set('logs', logs);
    },
    
    getYesterdayLog() {
        const today = new Date(this.getLogicalDate());
        today.setDate(today.getDate() - 1);
        const yesterday = today.toISOString().split('T')[0];
        const logs = this.get('logs') || {};
        return logs[yesterday];
    }
};
