
const savedSpellContainer = document.querySelector("#savedSpellContainer");

function displaySavedSpells() {
    const savedSpells = JSON.parse(localStorage.getItem("savedSpells")) || [];

    savedSpellContainer.innerHTML = "";

    if (savedSpells.length === 0) {
        savedSpellContainer.innerHTML = "<p>Your spell book is empty.</p>"

        return;
    }

    for (const spell of savedSpells) {
        const spellCard = createSpellCard(spell);

        savedSpellContainer.appendChild(spellCard);
    }
}


function createSpellCard(details) {  
    const spellCard = document.createElement("div");

    spellCard.classList.add("spell-card");

    const levelText = details.level === 0 ? "Cantrip" : `Level ${details.level}`;

    spellCard.innerHTML = `
    <div class="spell-header">
        <button class="save-button">Save Spell</button>
        <h2>${details.name}</h2>
        <p>${levelText}</p>
    </div>
        <div class="details-container"></div>
        <button class="details-button" aria-label="View Details">+</button>
    `;

    const saveButton = spellCard.querySelector(".save-button");

    const button = spellCard.querySelector(".details-button");

    const detailsContainer = spellCard.querySelector(".details-container");

    saveButton.addEventListener("click", function () {
    saveSpell(details);
    });

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


displaySavedSpells();