// Save/Load System
const SaveSystem = {
    SAVE_KEY: 'historicalWarriorsRPG_save',
    
    // Save current game state
    saveGame: () => {
        const saveData = {
            version: '1.0',
            timestamp: new Date().toISOString(),
            gameState: Utils.deepClone(gameState),
            warriorDatabase: Utils.deepClone(warriorDatabase),
            locations: Utils.deepClone(locations)
        };
        
        const success = Utils.saveToStorage(SaveSystem.SAVE_KEY, saveData);
        if (success) {
            EventSystem.emit('game_saved', { timestamp: saveData.timestamp });
            return true;
        }
        return false;
    },
    
    // Load saved game state
    loadGame: () => {
        const saveData = Utils.loadFromStorage(SaveSystem.SAVE_KEY);
        if (!saveData) return false;
        
        try {
            // Restore game state
            Object.assign(gameState, saveData.gameState);
            
            // Restore warrior database
            Object.assign(warriorDatabase, saveData.warriorDatabase);
            
            // Restore locations
            Object.assign(locations, saveData.locations);
            
            // Update UI
            updateUI();
            renderWorldMap();
            renderAvailableWarriors();
            
            EventSystem.emit('game_loaded', { timestamp: saveData.timestamp });
            return true;
        } catch (error) {
            console.error('Failed to load game:', error);
            return false;
        }
    },
    
    // Check if save exists
    hasSavedGame: () => {
        return Utils.loadFromStorage(SaveSystem.SAVE_KEY) !== null;
    },
    
    // Delete saved game
    deleteSave: () => {
        try {
            localStorage.removeItem(SaveSystem.SAVE_KEY);
            EventSystem.emit('save_deleted');
            return true;
        } catch (error) {
            console.error('Failed to delete save:', error);
            return false;
        }
    },
    
    // Export save data as JSON
    exportSave: () => {
        const saveData = Utils.loadFromStorage(SaveSystem.SAVE_KEY);
        if (saveData) {
            const blob = new Blob([JSON.stringify(saveData, null, 2)], 
                                { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `warriors_save_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    },
    
    // Import save data from file
    importSave: (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const saveData = JSON.parse(e.target.result);
                    Utils.saveToStorage(SaveSystem.SAVE_KEY, saveData);
                    resolve(SaveSystem.loadGame());
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsText(file);
        });
    },
    
    // Auto-save functionality
    enableAutoSave: (intervalMinutes = 5) => {
        setInterval(() => {
            SaveSystem.saveGame();
            console.log('Auto-saved game');
        }, intervalMinutes * 60 * 1000);
    }
};
