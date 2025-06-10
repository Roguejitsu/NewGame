// Game Configuration
const CONFIG = {
    // Battle system settings
    BATTLE: {
        DAMAGE_VARIANCE: 10,
        ENEMY_DAMAGE_VARIANCE: 8,
        SKILL_MULTIPLIER: 1.5,
        DEFENSE_REDUCTION: 0.5,
        ENEMY_TURN_DELAY: 1500
    },
    
    // Economy settings
    ECONOMY: {
        WIN_GOLD_REWARD: 50,
        WIN_EXPERIENCE_REWARD: 25,
        TRAINING_COSTS: {
            attack: 30,
            defense: 30,
            health: 25
        },
        TRAINING_GAINS: {
            attack: 2,
            defense: 2,
            health: 10
        }
    },
    
    // Player settings
    PLAYER: {
        STARTING_LEVEL: 1,
        STARTING_GOLD: 100,
        STARTING_HEALTH: 100,
        STARTING_ATTACK: 15,
        STARTING_DEFENSE: 10,
        MAX_TEAM_SIZE: 6
    },
    
    // UI settings
    UI: {
        HEALTH_BAR_TRANSITION: '0.3s ease',
        CARD_HOVER_TRANSFORM: 'translateY(-2px)',
        LOCATION_HOVER_SCALE: 'scale(1.05)',
        LOG_MAX_HEIGHT: '100px'
    },
    
    // Game progression
    PROGRESSION: {
        LOCATIONS_UNLOCK_ORDER: [
            'ancient_rome',
            'feudal_japan', 
            'medieval_scotland',
            'medieval_france',
            'ancient_greece',
            'ancient_china'
        ]
    }
};
