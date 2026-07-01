import { getAllSpells, getSpellsByClass, getSpellsByLevel } from "./api.js";

const spellContainer = document.querySelector("#spellContainer");
const classFilter = document.querySelector("#classFilter");
const levelFilter = document.querySelector("#levelFilter");

async function loadSpells() {

    const spells = await getAllSpells();

    displaySpells(spells);

}

function displaySpells(spells) {

    spellContainer.innerHTML = "";

    spells.forEach(spell => {

        spellContainer.innerHTML += `
            <div class="spell-card">
                <h2>${spell.name}</h2>
            </div>
        `;

    });

}

async function handleClassChange() {
    const selectedClass = classFilter.value;

    let spells = [];

    if (selectedClass === "") {
        spells = await getAllSpells();
    } else {
        spells = await getSpellsByClass(selectedClass);
    }

    displaySpells(spells);
}

async function handleLevelChange() {
    const selectedLevel = levelFilter.value;

    let spells = [];

    if (selectedLevel === "") {
        spells = await getAllSpells();
    } else {
        spells = await getSpellsByLevel(selectedLevel);
    }

    displaySpells(spells);
}

classFilter.addEventListener("change", handleClassChange);
levelFilter.addEventListener("change", handleLevelChange);

loadSpells();
