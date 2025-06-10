// Team Management
function renderTeam() {
    const roster = document.getElementById('teamRoster');
    roster.innerHTML = '';
    
    if (gameState.team.length === 0) {
        roster.innerHTML = '<p>No warriors recruited yet. Defeat warriors in battle to recruit them!</p>';
        return;
    }
    
    gameState.team.forEach((warrior, index) => {
        const warriorDiv = document.createElement('div');
        warriorDiv.className = 'warrior-card recruited';
        warriorDiv.innerHTML = `
            <h4>${warrior.name}</h4>
            <p>${warrior.description}</p>
            <div class="stat-bar">
                <span>Level: ${warrior.level}</span>
                <span>HP: ${warrior.health}</span>
            </div>
            <div class="stat-bar">
                <span>ATK: ${warrior.attack}</span>
                <span>DEF: ${warrior.defense}</span>
            </div>
            <small>Skill: ${warrior.skill}</small>
        `;
        roster.appendChild(warriorDiv);
    });
}
