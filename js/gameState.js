// Game State Management
const gameState = {
    player: {
        level: 1,
        gold: 100,
        health: 100,
        maxHealth: 100,
        attack: 15,
        defense: 10,
        experience: 0
    },
    team: [],
    currentBattle: null,
    unlockedLocations: ['ancient_rome'],
    currentView: 'world'
};

// UI Updates
function updateUI() {
    document.getElementById('playerLevel').textContent = gameState.player.level;
    document.getElementById('playerGold').textContent = gameState.player.gold;
    document.getElementById('teamSize').textContent = `${gameState.team.length}/6`;
}
