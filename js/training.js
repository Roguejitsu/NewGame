// Training System
function renderTraining() {
    const trainingArea = document.getElementById('trainingInterface');
    
    if (gameState.team.length === 0) {
        trainingArea.innerHTML = '<p>No warriors to train. Recruit warriors first!</p>';
        return;
    }
    
    trainingArea.innerHTML = `
        <select id="trainingWarrior">
            <option value="">Select a warrior...</option>
            ${gameState.team.map(warrior => 
                `<option value="${warrior.name}">${warrior.name} (Lv.${warrior.level})</option>`
            ).join('')}
        </select>
        <div id="trainingOptions" style="margin-top: 15px;"></div>
    `;
    
    document.getElementById('trainingWarrior').onchange = showTrainingOptions;
}

function showTrainingOptions() {
    const selectedName = document.getElementById('trainingWarrior').value;
    const options = document.getElementById('trainingOptions');
    
    if (!selectedName) {
        options.innerHTML = '';
        return;
    }
    
    options.innerHTML = `
        <div class="action-buttons">
            <button class="btn" onclick="trainStat('attack')" ${gameState.player.gold < 30 ? 'disabled' : ''}>
                Train Attack (30 gold)
            </button>
            <button class="btn" onclick="trainStat('defense')" ${gameState.player.gold < 30 ? 'disabled' : ''}>
                Train Defense (30 gold)
            </button>
            <button class="btn" onclick="trainStat('health')" ${gameState.player.gold < 25 ? 'disabled' : ''}>
                Train Health (25 gold)
            </button>
        </div>
    `;
}

function trainStat(stat) {
    const selectedName = document.getElementById('trainingWarrior').value;
    const warrior = gameState.team.find(w => w.name === selectedName);
    
    if (!warrior) return;
    
    const costs = { attack: 30, defense: 30, health: 25 };
    const cost = costs[stat];
    
    if (gameState.player.gold < cost) return;
    
    gameState.player.gold -= cost;
    
    switch(stat) {
        case 'attack':
            warrior.attack += 2;
            break;
        case 'defense':
            warrior.defense += 2;
            break;
        case 'health':
            warrior.health += 10;
            break;
    }
    
    updateUI();
    renderTraining();
}
