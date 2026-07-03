import { getAllSpells, getSpellsByClass, getSpellsByLevel, getSpellDetails } from "./api.js";

const spellContainer = document.querySelector("#spellContainer");
const classFilter = document.querySelector("#classFilter");
const levelFilter = document.querySelector("#levelFilter");

async function loadSpells() {

    const spells = await getAllSpells();

    displaySpells(spells);

}

async function displaySpells(spells) {

    spellContainer.innerHTML = "";

    for (const spell of spells) {

        const details = await getSpellDetails(spell.index);

        spellContainer.innerHTML += `
            <div class="spell-card">
                <h2>${details.name}</h2>
                <p><strong>Level:</strong> ${details.level}</p>
            </div>
        `;
    }

}

async function applyFilters() {

    const selectedClass = classFilter.value;
    const selectedLevel = levelFilter.value;

    let spells = [];

    if (selectedClass !== "") {
        spells = await getSpellsByClass(selectedClass);
    } else {
        spells = await getAllSpells();
    }

    if (selectedLevel !== "") {
        spells = spells.filter(spell => spell.level === Number(selectedLevel));
    }

    displaySpells(spells);
}


classFilter.addEventListener("change", applyFilters);
levelFilter.addEventListener("change", applyFilters);

loadSpells();
