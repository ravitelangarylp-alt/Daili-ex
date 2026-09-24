export const Store = {
    get(key) { return JSON.parse(localStorage.getItem(key)); },
    set(key, data) { localStorage.setItem(key, JSON.stringify(data)); },
    
    // Robust 3:00 AM IST handling
    getLogicalDate(dateObj = new Date()) {
        const istString = dateObj.toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
        const istDate = new Date(istString);
        
        istDate.setHours(istDate.getHours() - 3);
        
        const year = istDate.getFullYear();
        const month = String(istDate.getMonth() + 1).padStart(2, '0');
        const day = String(istDate.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    },

    initUser(config) {
        this.set('userConfig', config);
        if(!this.get('logs')) this.set('logs', {});
        if(!this.get('journal')) this.set('journal', []);
        if(!this.get('reviews')) this.set('reviews', {});
    },

    getLog(dateStr) {
        let logs = this.get('logs') || {};
        if (!logs[dateStr]) {
            logs[dateStr] = { date: dateStr, isBusyDay: false, habits: {} };
            this.set('logs', logs);
        }
        return logs[dateStr];
    },

    saveLog(dateStr, logData) {
        let logs = this.get('logs') || {};
        logs[dateStr] = logData;
        this.set('logs', logs);
    },
    
    getYesterdayDateStr() {
        const istString = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
        const d = new Date(istString);
        d.setHours(d.getHours() - 3);
        d.setDate(d.getDate() - 1);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    },

    exportData() {
        const data = {
            userConfig: this.get('userConfig'),
            logs: this.get('logs'),
            journal: this.get('journal'),
            reviews: this.get('reviews')
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `90-day-discipline-backup-${this.getLogicalDate()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if(data.userConfig && data.logs) {
                this.set('userConfig', data.userConfig);
                this.set('logs', data.logs);
                if(data.journal) this.set('journal', data.journal);
                if(data.reviews) this.set('reviews', data.reviews);
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    },

    resetData() {
        localStorage.clear();
    }
};
