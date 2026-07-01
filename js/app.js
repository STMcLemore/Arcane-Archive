import { getAllSpells } from "./api.js";

const spellContainer = document.querySelector("#spellContainer");

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

loadSpells();
