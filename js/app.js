import {
    getAllSpells,
    getSpellsByClass,
    getSpellsByLevel,
    getSpellDetails
} from "./api.js";

const spellContainer = document.querySelector("#spellContainer");
const classFilter = document.querySelector("#classFilter");
const levelFilter = document.querySelector("#levelFilter");
const searchInput = document.querySelector("#searchInput");


async function loadSpells() {  
    spellContainer.innerHTML = "<p>Loading spells...</p>"; 
    const spellList = await getAllSpells();
    displaySpells(spellList);
}


async function displaySpells(spells) { 
    spellContainer.innerHTML = "";

    for (const spell of spells) {
        const details = await getSpellDetails(spell.index);
        const spellCard = createSpellCard(details);
        spellContainer.appendChild(spellCard);
    }
}


function createSpellCard(details) {  //
    const spellCard = document.createElement("div");

    spellCard.classList.add("spell-card");

    const levelText = details.level === 0 ? "Cantrip" : `Level ${details.level}`; 

    spellCard.innerHTML = `
        <h2>${details.name}</h2>
        <p>Level: ${levelText}</p>
        <p>School: ${details.school.name}</p>
        <p>Range: ${details.range}</p>
        <p>Casting Time: ${details.casting_time}</p>
        <button class="details-button">View Details</button>
        <div class="details-container"></div>
    `;

    const button = spellCard.querySelector(".details-button");

    const detailsContainer = spellCard.querySelector(".details-container");

    button.addEventListener("click", async function () {
        if (detailsContainer.innerHTML !== "") {
            detailsContainer.innerHTML = "";
            button.textContent = "View Details";
            return;
    }

    detailsContainer.innerHTML = "<p>Loading details...</p>";

    detailsContainer.innerHTML = `
        <p>Components: ${details.components.join(", ")}</p>
        <p>Description: ${details.desc.join("<br><br>")}</p>
        `;

        button.textContent = "Hide Details";
    });

    return spellCard;


}


async function applyFilters() {  

    const selectedClass = classFilter.value;
    const selectedLevel = levelFilter.value;
    const searchText = searchInput.value.toLowerCase();

    let spells = [];

    if (selectedLevel !== "") {
        spells = await getSpellsByLevel(selectedLevel);
    } else if (selectedClass !== "") {
        spells = await getSpellsByClass(selectedClass);
    } else {
        spells = await getAllSpells();
    }

    if (searchText !== "") {
            spells = spells.filter(spell => spell.name.toLowerCase().includes(searchText)
        );
    }

    displaySpells(spells);
}


searchInput.addEventListener("input", applyFilters);
classFilter.addEventListener("change", applyFilters);  
levelFilter.addEventListener("change", applyFilters);

loadSpells();