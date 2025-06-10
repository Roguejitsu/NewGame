// Warrior Database
const warriorDatabase = {
    gladiator_maximus: {
        name: "Gladiator Maximus",
        era: "Ancient Rome",
        location: "ancient_rome",
        health: 120,
        attack: 18,
        defense: 12,
        skill: "Shield Bash",
        description: "A legendary gladiator from the Colosseum",
        recruited: false,
        level: 1,
        experience: 0
    },
    miyamoto_musashi: {
        name: "Miyamoto Musashi",
        era: "Feudal Japan",
        location: "feudal_japan",
        health: 100,
        attack: 22,
        defense: 8,
        skill: "Dual Wielding",
        description: "Master swordsman of the two-sword style",
        recruited: false,
        level: 1,
        experience: 0
    },
    william_wallace: {
        name: "William Wallace",
        era: "Medieval Scotland",
        location: "medieval_scotland",
        health: 140,
        attack: 16,
        defense: 14,
        skill: "Battle Cry",
        description: "Scottish warrior fighting for freedom",
        recruited: false,
        level: 1,
        experience: 0
    },
    joan_of_arc: {
        name: "Joan of Arc",
        era: "Medieval France",
        location: "medieval_france",
        health: 90,
        attack: 20,
        defense: 10,
        skill: "Divine Inspiration",
        description: "The Maid of Orléans, blessed warrior",
        recruited: false,
        level: 1,
        experience: 0
    },
    alexander_great: {
        name: "Alexander the Great",
        era: "Ancient Greece",
        location: "ancient_greece",
        health: 110,
        attack: 19,
        defense: 11,
        skill: "Tactical Strike",
        description: "Conqueror of the known world",
        recruited: false,
        level: 1,
        experience: 0
    },
    sun_tzu: {
        name: "Sun Tzu",
        era: "Ancient China",
        location: "ancient_china",
        health: 80,
        attack: 14,
        defense: 16,
        skill: "Art of War",
        description: "Master strategist and philosopher",
        recruited: false,
        level: 1,
        experience: 0
    }
};

// Location Database
const locations = {
    ancient_rome: {
        name: "Ancient Rome",
        description: "The mighty Colosseum echoes with battle cries",
        warriors: ["gladiator_maximus"],
        unlocked: true
    },
    feudal_japan: {
        name: "Feudal Japan",
        description: "Cherry blossoms fall on the battlefield",
        warriors: ["miyamoto_musashi"],
        unlocked: false
    },
    medieval_scotland: {
        name: "Medieval Scotland",
        description: "Highland mists conceal ancient warriors",
        warriors: ["william_wallace"],
        unlocked: false
    },
    medieval_france: {
        name: "Medieval France",
        description: "Sacred battlegrounds of a legendary maiden",
        warriors: ["joan_of_arc"],
        unlocked: false
    },
    ancient_greece: {
        name: "Ancient Greece",
        description: "Where legends were born and empires forged",
        warriors: ["alexander_great"],
        unlocked: false
    },
    ancient_china: {
        name: "Ancient China",
        description: "Land of strategy and ancient wisdom",
        warriors: ["sun_tzu"],
        unlocked: false
    }
};
