const BASE_URL = "https://www.dnd5eapi.co/api/2014";

export async function getAllSpells() {

    try {

        const response = await fetch(`${BASE_URL}/spells`);

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