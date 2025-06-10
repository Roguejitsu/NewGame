// Initialize Game
function initGame() {
    updateUI();
    renderWorldMap();
    renderAvailableWarriors();
    showView('world');
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initGame();
});
