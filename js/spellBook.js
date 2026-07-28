
const savedSpellContainer = document.querySelector("#savedSpellContainer");

function displaySavedSpells() {
    const savedSpells = JSON.parse(localStorage.getItem("savedSpells")) || [];

    savedSpellContainer.innerHTML = "";

    if (savedSpells.length === 0) {
        savedSpellContainer.innerHTML = "<p>Your spell book is empty.</p>"

        return;
    }

    for (const savedSpell of savedSpells) {
        const spellCard = createSpellCard(
            savedSpell.spell,
            savedSpell.dateSaved
        );

        savedSpellContainer.appendChild(spellCard);
    }
}


function getTimeSinceSaved(dateSaved) {
    const today = new Date();
    const savedDate = new Date(dateSaved);
 
    const difference = today - savedDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (days === 0) {
        return "Today";
    }

    if (days === 1) {
        return "1 day ago";
    }

    if (days < 7) {
        return `${days} days ago`;
    }

    const weeks = Math.floor(days / 7);

    if (weeks === 1) {
        return "1 week ago";
    }

    if (weeks < 4) {
        return `${weeks} weeks ago`
    }

    return `on ${dateSaved}`;

}

function createSpellCard(details, dateSaved) {  
    const spellCard = document.createElement("div");

    spellCard.classList.add("spell-card");

    const levelText = details.level === 0 ? "Cantrip" : `Level ${details.level}`;

    const timeSinceSaved = getTimeSinceSaved(dateSaved);

    spellCard.innerHTML = `
    <div class="spell-header">
        <p>Saved ${timeSinceSaved}</p>
        <button class="remove-button">Remove Spell</button>
        <h2>${details.name}</h2>
        <p>${levelText}</p>
    </div>
        <div class="details-container"></div>
        <button class="details-button" aria-label="View Details">+</button>
    `;

    const removeButton = spellCard.querySelector(".remove-button");

    const button = spellCard.querySelector(".details-button");

    const detailsContainer = spellCard.querySelector(".details-container");

    removeButton.addEventListener("click", function () {
        removeSpell(details.index);
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

function removeSpell(spellIndex) {
    let savedSpells = JSON.parse(localStorage.getItem("savedSpells")) || [];

    savedSpells = savedSpells.filter(function (savedSpell) {
        return savedSpell.spell.index !== spellIndex;
    });

    localStorage.setItem(
        "savedSpells", JSON.stringify(savedSpells)
    );

    displaySavedSpells();
}

displaySavedSpells();