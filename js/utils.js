// Utility Functions
const Utils = {
    // Random number generation
    randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    
    // Damage calculation with variance
    calculateDamage: (attack, defense, variance = 0) => {
        const baseDamage = Math.max(1, attack - defense);
        if (variance > 0) {
            const randomVariance = Utils.randomInt(-variance/2, variance/2);
            return Math.max(1, baseDamage + randomVariance);
        }
        return baseDamage;
    },
    
    // Health percentage calculation
    getHealthPercentage: (current, max) => Math.max(0, Math.min(100, (current / max) * 100)),
    
    // Experience and leveling
    getExperienceForLevel: (level) => level * 100,
    getLevelFromExperience: (exp) => Math.floor(exp / 100) + 1,
    
    // DOM manipulation helpers
    createElement: (tag, className = '', innerHTML = '') => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;
    },
    
    // Animation helpers
    animateHealthBar: (elementId, percentage) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.width = percentage + '%';
        }
    },
    
    // Validation helpers
    isValidWarrior: (warrior) => {
        return warrior && 
               typeof warrior.name === 'string' &&
               typeof warrior.health === 'number' &&
               typeof warrior.attack === 'number' &&
               typeof warrior.defense === 'number';
    },
    
    // Deep clone helper for battle states
    deepClone: (obj) => JSON.parse(JSON.stringify(obj)),
    
    // Formatting helpers
    formatNumber: (num) => num.toLocaleString(),
    formatStatBar: (label, value) => `<span>${label}:</span><span>${value}</span>`,
    
    // Local storage helpers (for future save/load functionality)
    saveToStorage: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
            return false;
        }
    },
    
    loadFromStorage: (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Failed to load from localStorage:', e);
            return null;
        }
    }
};
