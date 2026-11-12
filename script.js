// Assignment 3: Interactive Blacksmith — The Tiny Forge

const $forge = document.getElementById("forge");
const $heat = document.getElementById("heat-value");
const $swords = document.getElementById("sword-count");
const $status = document.getElementById("forge-status");
const $image = document.getElementById("forge-image");
const $message = document.getElementById("action-message");

const $heatForm = document.getElementById("heat-form");
const $heatInput = document.getElementById("heat-input");
const $makeSwordButton = document.getElementById("make-sword");
const $resetButton = document.getElementById("reset-forge");

let forgeHeat = 20;
let swordsMade = 0;

function getForgeStatus(heatValue) {
    if (heatValue < 30) {
        return "Too cold";
    } else if (heatValue < 70) {
        return "Ready to forge";
    } else {
        return "Roaring fire";
    }
}

function updateForge() {
    $heat.textContent = forgeHeat;
    $swords.textContent = swordsMade;

    const currentStatus = getForgeStatus(forgeHeat);
    $status.textContent = currentStatus;

    $forge.classList.remove("is-cold", "is-ready", "is-roaring");

    if (currentStatus === "Too cold") {
        $forge.classList.add("is-cold");
        $image.src = "assets/forge-cold.svg";
        $image.alt = "A stone forge with dark coals and no flames";
    } else if (currentStatus === "Ready to forge") {
        $forge.classList.add("is-ready");
        $image.src = "assets/forge-ready.svg";
        $image.alt = "A stone forge with a small orange fire";
    } else {
        $forge.classList.add("is-roaring");
        $image.src = "assets/forge-roaring.svg";
        $image.alt = "A stone forge with tall bright flames and sparks";
    }
}

function resetForge() {
    forgeHeat = 20;
    swordsMade = 0;

    $heatInput.value = "";
    $message.textContent = "";

    updateForge();
}

function heatForge(amount) {
    const previousHeat = forgeHeat;
    forgeHeat = Math.min(forgeHeat + amount, 100);

    const heatAdded = forgeHeat - previousHeat;
    if (heatAdded === 0) {
        $message.textContent = "The forge is already at 100 heat.";
    } else {
        $message.textContent = `Added ${heatAdded} heat. The forge is now at ${forgeHeat}.`;
    }

    updateForge();
}

function makeSword() {
    if (forgeHeat >= 30) {
        forgeHeat = forgeHeat - 30;
        swordsMade = swordsMade + 1;
        $message.textContent = "You successfully made a sword!";
    } else {
        $message.textContent = "You need at least 30 heat to make a sword.";
    }

    updateForge();
}

// Add heat: stop the page from reloading, read the number, and check it.
// Show a message if it is invalid. Otherwise, call heatForge with the amount.
$heatForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const amount = $heatInput.valueAsNumber;

    if (!Number.isInteger(amount) || amount < 1) {
        $message.textContent = "Enter a positive whole number to add heat.";
        return;
    }

    heatForge(amount);
});

// Make sword: let makeSword check the heat and update the forge.
$makeSwordButton.addEventListener("click", makeSword);

// Reset: restore the starting values and clear the input and message.
$resetButton.addEventListener("click", resetForge);

// Start the page in the same state as a reset.
resetForge();