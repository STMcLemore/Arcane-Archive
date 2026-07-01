const Base_URL = "https://www.dnd5eapi.co/api/2014";

export async function getAllSpells() {

    try {

        const response = await fetch(`${Base_URL}/spells`);

        if (!response.ok) {
            throw new Error("Could not fetch spells.");
        }

        const data = await response.json();

        return data.results;

    } catch(error) {

        console.error(error);

        return [];
    }

}

export async function getSpellsByClass(className) {
    try {
        const response = await fetch(`${Base_URL}/classes/${className}/spells`);

        if (!response.ok) {
            throw new Error(`Could not fetch spells for class: ${className}`);
        }

        const data = await response.json();

        return data.results;
    } catch(error) {
        console.error(error);
        return [];
    }
}

export async function getSpellsByLevel(level) {
    try {
        const response = await fetch(`${Base_URL}/spells?level=${level}`);

        if (!response.ok) {
            throw new Error(`Could not fetch spells for level: ${level}`);
        }

        const data = await response.json();

        return data.results;

    } catch(error) {
        console.error(error);
        return [];
    }
}