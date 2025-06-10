// Event System for Game Actions
const EventSystem = {
    listeners: {},
    
    // Register event listener
    on: (event, callback) => {
        if (!EventSystem.listeners[event]) {
            EventSystem.listeners[event] = [];
        }
        EventSystem.listeners[event].push(callback);
    },
    
    // Remove event listener
    off: (event, callback) => {
        if (EventSystem.listeners[event]) {
            EventSystem.listeners[event] = EventSystem.listeners[event].filter(cb => cb !== callback);
        }
    },
    
    // Emit event
    emit: (event, data = {}) => {
        if (EventSystem.listeners[event]) {
            EventSystem.listeners[event].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event listener for ${event}:`, error);
                }
            });
        }
    }
};

// Game Events
const GAME_EVENTS = {
    BATTLE_START: 'battle_start',
    BATTLE_END: 'battle_end',
    WARRIOR_RECRUITED: 'warrior_recruited',
    PLAYER_LEVEL_UP: 'player_level_up',
    LOCATION_UNLOCKED: 'location_unlocked',
    GOLD_CHANGED: 'gold_changed',
    TRAINING_COMPLETED: 'training_completed',
    VIEW_CHANGED: 'view_changed'
};

// Event handlers for game state changes
EventSystem.on(GAME_EVENTS.WARRIOR_RECRUITED, (data) => {
    console.log(`New warrior recruited: ${data.warrior.name}`);
    updateUI();
});

EventSystem.on(GAME_EVENTS.GOLD_CHANGED, (data) => {
    console.log(`Gold changed: ${data.oldGold} -> ${data.newGold}`);
    updateUI();
});

EventSystem.on(GAME_EVENTS.LOCATION_UNLOCKED, (data) => {
    console.log(`New location unlocked: ${data.location}`);
    renderWorldMap();
});

EventSystem.on(GAME_EVENTS.VIEW_CHANGED, (data) => {
    console.log(`View changed to: ${data.view}`);
});
