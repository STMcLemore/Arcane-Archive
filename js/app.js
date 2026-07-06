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
        const spellCard = document.createElement("div");
        spellCard.classList.add("spell-card");


        spellCard.innerHTML = `
            <h2>${details.name}</h2>
            <p>Level:${details.level}</p>
            <p>School:${details.school.name}</p>
            <button class ="details-button" data-index="${details.index}">View Details</button>

            <div class="details-container"></div>
        `;

        const button = spellCard.querySelector(".details-button");

        button.addEventListener("click", async function() {
            const detailsContainer = spellCard.querySelector(".details-container");

            if (detailsContainer.innerHTML !== "") {
                detailsContainer.innerHTML = "";
                this.textContent = "View Details";
                return;
            }

            detailsContainer.innerHTML = `
                <p><strong>Range:</strong> ${details.range}</p>
                    <p><strong>Duration:</strong> ${details.duration}</p>
                    <p><strong>Casting Time:</strong> ${details.casting_time}</p>
                    <p><strong>Components:</strong> ${details.components.join(", ")}</p>
                    <p><strong>Description:</strong> ${details.desc.join("<br><br>")}</p>
                `;

                this.textContent = "Hide Details";
            });
            
            spellContainer.appendChild(spellCard);
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
