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
const searchButton = document.querySelector("#searchButton");
const errorMessage = document.querySelector("#errorMessage");
console.log("Error message element:", errorMessage);


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


function createSpellCard(details) {  
    const spellCard = document.createElement("div");

    spellCard.classList.add("spell-card");

    const levelText = details.level === 0 ? "Cantrip" : `Level ${details.level}`;

    spellCard.innerHTML = `
    <div class="spell-header">
        <h2>${details.name}</h2>
        <p>${levelText}</p>
    </div>
        <div class="details-container"></div>
        <button class="details-button" aria-label="View Details">+</button>
    `;

    const button = spellCard.querySelector(".details-button");

    const detailsContainer = spellCard.querySelector(".details-container");

    button.addEventListener("click", async function () {
        if (detailsContainer.innerHTML !== "") {
            detailsContainer.innerHTML = "";
            button.textContent = "+";
            button.setAttribute("aria-label", "View Details");
            return;
    }

    detailsContainer.innerHTML = "<p>Loading details...</p>";

    detailsContainer.innerHTML = `
        <p>${details.school.name}</p>
        <p>Range: ${details.range}</p>
        <p>Casting Time: ${details.casting_time}</p>
        <p>Components: ${details.components.join(", ")}</p>
        <p>Description: ${details.desc.join("<br><br>")}</p>
        `;

        button.textContent = "-";
        button.setAttribute("aria-label", "Hide Details");
    });

    return spellCard;


}


async function applyFilters() {

    errorMessage.style.display = 'none';
    errorMessage.textContent = "";

    const selectedClass = classFilter.value;
    const selectedLevel = levelFilter.value;
    const searchText = searchInput.value.trim().toLowerCase();




    if (searchText !== "") {
        const validSearchText = /^[a-zA-Z\s'-]+$/;

        if (!validSearchText.test(searchText)) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = "Please enter a valid search term. Use letters, spaces, apostrophes, or hyphens only.";
            return;
        }
    }

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


searchButton.addEventListener("click", applyFilters);
searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        applyFilters();
    }
});


loadSpells();