// Battle System
function startBattle(warriorId) {
    const warrior = warriorDatabase[warriorId];
    gameState.currentBattle = {
        enemy: {...warrior},
        playerHealth: gameState.player.maxHealth,
        enemyHealth: warrior.health,
        turn: 'player'
    };
    
    showView('battle');
    renderBattle();
}

function renderBattle() {
    const battle = gameState.currentBattle;
    document.getElementById('battleTitle').textContent = `Battle: ${battle.enemy.name}`;
    document.getElementById('playerName').textContent = 'You';
    document.getElementById('enemyName').textContent = battle.enemy.name;
    
    updateHealthBars();
    updateBattleStats();
}

function updateHealthBars() {
    const battle = gameState.currentBattle;
    const playerHealthPercent = (battle.playerHealth / gameState.player.maxHealth) * 100;
    const enemyHealthPercent = (battle.enemyHealth / battle.enemy.health) * 100;
    
    document.getElementById('playerHealth').style.width = playerHealthPercent + '%';
    document.getElementById('enemyHealth').style.width = enemyHealthPercent + '%';
}

function updateBattleStats() {
    document.getElementById('playerStats').innerHTML = `
        ATK: ${gameState.player.attack} | DEF: ${gameState.player.defense}
    `;
    document.getElementById('enemyStats').innerHTML = `
        ATK: ${gameState.currentBattle.enemy.attack} | DEF: ${gameState.currentBattle.enemy.defense}
    `;
}

function attack() {
    if (gameState.currentBattle.turn !== 'player') return;
    
    const damage = Math.max(1, gameState.player.attack - gameState.currentBattle.enemy.defense + Math.floor(Math.random() * 10) - 5);
    gameState.currentBattle.enemyHealth -= damage;
    
    logBattle(`You deal ${damage} damage!`);
    
    if (gameState.currentBattle.enemyHealth <= 0) {
        winBattle();
        return;
    }
    
    enemyTurn();
}

function defend() {
    if (gameState.currentBattle.turn !== 'player') return;
    
    logBattle('You brace for the enemy attack!');
    gameState.currentBattle.defending = true;
    enemyTurn();
}

function useSkill() {
    if (gameState.currentBattle.turn !== 'player') return;
    
    const skillDamage = gameState.player.attack * 1.5;
    const damage = Math.max(1, skillDamage - gameState.currentBattle.enemy.defense);
    gameState.currentBattle.enemyHealth -= damage;
    
    logBattle(`You use your special skill for ${damage} damage!`);
    
    if (gameState.currentBattle.enemyHealth <= 0) {
        winBattle();
        return;
    }
    
    enemyTurn();
}

function enemyTurn() {
    gameState.currentBattle.turn = 'enemy';
    
    setTimeout(() => {
        const enemyDamage = Math.max(1, gameState.currentBattle.enemy.attack - gameState.player.defense + Math.floor(Math.random() * 8) - 4);
        const actualDamage = gameState.currentBattle.defending ? Math.floor(enemyDamage / 2) : enemyDamage;
        
        gameState.currentBattle.playerHealth -= actualDamage;
        logBattle(`${gameState.currentBattle.enemy.name} deals ${actualDamage} damage!`);
        
        gameState.currentBattle.defending = false;
        
        if (gameState.currentBattle.playerHealth <= 0) {
            loseBattle();
            return;
        }
        
        gameState.currentBattle.turn = 'player';
        updateHealthBars();
    }, 1500);
}

function winBattle() {
    const enemy = gameState.currentBattle.enemy;
    logBattle(`Victory! ${enemy.name} has been defeated and joins your team!`);
    
    // Recruit the warrior
    warriorDatabase[Object.keys(warriorDatabase).find(key => warriorDatabase[key].name === enemy.name)].recruited = true;
    gameState.team.push(enemy);
    
    // Reward gold and experience
    gameState.player.gold += 50;
    gameState.player.experience += 25;
    
    // Unlock next location (simplified)
    unlockNextLocation();
    
    document.getElementById('returnBtn').style.display = 'block';
    updateUI();
}

function loseBattle() {
    logBattle('Defeat! You have been bested in combat.');
    gameState.currentBattle.playerHealth = gameState.player.maxHealth; // Restore health
    document.getElementById('returnBtn').style.display = 'block';
}

function unlockNextLocation() {
    const locationKeys = Object.keys(locations);
    const currentIndex = locationKeys.findIndex(key => locations[key].unlocked);
    if (currentIndex < locationKeys.length - 1) {
        locations[locationKeys[currentIndex + 1]].unlocked = true;
    }
}

function logBattle(message) {
    const log = document.getElementById('battleLog');
    log.innerHTML += message + '<br>';
    log.scrollTop = log.scrollHeight;
}
