const Base_URL = "https://www.dnd5eapi.co/api/2014";

export async function getAllSpells() {    
    try {
        const response = await fetch(`${Base_URL}/spells`);

        if (!response.ok) {
            throw new Error("Failed to load spell list.");
        }
        const spellData = await response.json();
        return spellData.results;

    } catch (error) {
        console.error("Error getting spells:", error);
        return [];
    }
}

export async function getSpellsByClass(className) {  
    try {
        const response = await fetch(`${Base_URL}/classes/${className}/spells`);

        if (!response.ok) {
            throw new Error("Failed to load class spells.");
        }
        const spellData = await response.json();
        return spellData.results;

    } catch (error) {
        console.error("Error getting class spells:", error);
        return [];
    }
}

export async function getSpellsByLevel(level) {   
    try {
        const response = await fetch(`${Base_URL}/spells?level=${level}`);

        if (!response.ok) {
            throw new Error("Failed to load spells by level.");
        }

        const spellData = await response.json();
        return spellData.results;

    } catch (error) {
        console.error("Error getting level spells:", error);
        return [];
    }
}

export async function getSpellDetails(index) {  
    try {
        const response = await fetch(`${Base_URL}/spells/${index}`);

        if (!response.ok) {
            throw new Error("Failed to load spell details.");
        }

        const spell = await response.json();
        return spell;
        
    } catch (error) {
        console.error("Error getting spell details:", error);
        return null;
    }
}