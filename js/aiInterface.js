// AI Integration Interface
const AIInterface = {
    // Get current game state for AI analysis
    getGameState: () => {
        return {
            player: Utils.deepClone(gameState.player),
            team: Utils.deepClone(gameState.team),
            availableWarriors: Object.values(warriorDatabase).filter(w => !w.recruited),
            unlockedLocations: [...gameState.unlockedLocations],
            currentView: gameState.currentView,
            battleActive: gameState.currentBattle !== null
        };
    },
    
    // Get battle analysis data
    getBattleAnalysis: () => {
        if (!gameState.currentBattle) return null;
        
        const battle = gameState.currentBattle;
        return {
            playerHealthPercent: (battle.playerHealth / gameState.player.maxHealth) * 100,
            enemyHealthPercent: (battle.enemyHealth / battle.enemy.health) * 100,
            playerAdvantage: gameState.player.attack - battle.enemy.defense,
            enemyAdvantage: battle.enemy.attack - gameState.player.defense,
            currentTurn: battle.turn,
            recommendedAction: AIInterface.getRecommendedAction()
        };
    },
    
    // AI recommendation system
    getRecommendedAction: () => {
        if (!gameState.currentBattle) return null;
        
        const battle = gameState.currentBattle;
        const playerHealth = battle.playerHealth / gameState.player.maxHealth;
        const enemyHealth = battle.enemyHealth / battle.enemy.health;
        
        // Simple AI logic
        if (playerHealth < 0.3) {
            return 'defend'; // Low health, play defensively
        } else if (enemyHealth < 0.2) {
            return 'attack'; // Enemy almost defeated
        } else if (playerHealth > 0.7) {
            return 'skill'; // High health, use special ability
        } else {
            return 'attack'; // Default action
        }
    },
    
    // Get team optimization suggestions
    getTeamSuggestions: () => {
        const suggestions = [];
        
        // Check if team is full
        if (gameState.team.length >= CONFIG.PLAYER.MAX_TEAM_SIZE) {
            suggestions.push({
                type: 'warning',
                message: 'Team is at maximum capacity'
            });
        }
        
        // Check for weak warriors that could be trained
        gameState.team.forEach(warrior => {
            const totalStats = warrior.attack + warrior.defense + warrior.health;
            if (totalStats < 150) {
                suggestions.push({
                    type: 'training',
                    message: `${warrior.name} could benefit from training`,
                    warrior: warrior.name
                });
            }
        });
        
        // Check available gold for training
        if (gameState.player.gold >= 100) {
            suggestions.push({
                type: 'economy',
                message: 'Sufficient gold available for training multiple warriors'
            });
        }
        
        return suggestions;
    },
    
    // Simulate battle outcomes
    simulateBattle: (playerStats, enemyStats, iterations = 1000) => {
        let wins = 0;
        
        for (let i = 0; i < iterations; i++) {
            let playerHP = playerStats.health;
            let enemyHP = enemyStats.health;
            
            while (playerHP > 0 && enemyHP > 0) {
                // Player turn
                const playerDamage = Utils.calculateDamage(
                    playerStats.attack, 
                    enemyStats.defense, 
                    CONFIG.BATTLE.DAMAGE_VARIANCE
                );
                enemyHP -= playerDamage;
                
                if (enemyHP <= 0) {
                    wins++;
                    break;
                }
                
                // Enemy turn
                const enemyDamage = Utils.calculateDamage(
                    enemyStats.attack, 
                    playerStats.defense, 
                    CONFIG.BATTLE.ENEMY_DAMAGE_VARIANCE
                );
                playerHP -= enemyDamage;
            }
        }
        
        return {
            winRate: (wins / iterations) * 100,
            totalSimulations: iterations
        };
    },
    
    // Export game data for AI training
    exportGameData: () => {
        return {
            warriors: warriorDatabase,
            locations: locations,
            gameState: AIInterface.getGameState(),
            config: CONFIG,
            timestamp: new Date().toISOString()
        };
    },
    
    // Performance metrics for AI analysis
    getPerformanceMetrics: () => {
        return {
            battlesWon: gameState.team.length, // Simple metric based on recruited warriors
            goldEarned: gameState.player.gold - CONFIG.PLAYER.STARTING_GOLD,
            locationsUnlocked: gameState.unlockedLocations.length,
            teamEfficiency: gameState.team.reduce((sum, warrior) => 
                sum + warrior.attack + warrior.defense, 0
            ) / Math.max(1, gameState.team.length)
        };
    }
};
