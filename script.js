/* =========================
   JavaScript Basics
========================= */

console.log("AYG Website Started!");

const playerName = "Amirhossein";
const favoriteHero = "Tinker";

console.log(playerName);
console.log(favoriteHero);


/* =========================
   Function
========================= */

function introduce(name) {
    return `Hello ${name}!`;
}

console.log(introduce(playerName));


/* =========================
   Condition
========================= */

const heroDamage = 55;

if (heroDamage > 50) {
    console.log("Strong hero!");
} else {
    console.log("Weak hero!");
}


/* =========================
   DOM
========================= */

const button = document.querySelector("#helloButton");
const title = document.querySelector("h1");

button.addEventListener("click", function () {
    title.classList.toggle("highlight");
});


/* =========================
   Add Text
========================= */

const addButton = document.querySelector("#addButton");
const removeButton = document.querySelector("#removeButton");

let newText;

addButton.addEventListener("click", function () {

    newText = document.createElement("p");

    newText.textContent =
        "This paragraph was created with JavaScript!";

    document.body.appendChild(newText);
});

removeButton.addEventListener("click", function () {

    if (newText) {
        newText.remove();
    }

});


/* =========================
   Input
========================= */

const nameInput = document.querySelector("#nameInput");
const showButton = document.querySelector("#showButton");
const result = document.querySelector("#result");

showButton.addEventListener("click", function () {

    const name = nameInput.value.trim();

    if (name === "") {

        result.textContent = "Please enter your name!";

    } else {

        result.innerHTML = `<strong>Hello ${name}!</strong>`;

        nameInput.value = "";
    }

});


/* =========================
   Array
========================= */

const heroes = [
    "Tinker",
    "Invoker",
    "Storm Spirit"
];

console.log(heroes);

heroes.push("Lina");

console.log(heroes);

console.log(heroes.includes("Invoker"));
console.log(heroes.length);


/* =========================
   Object
========================= */

const hero = {

    name: "Tinker",
    role: "Mid",
    damage: 55

};

console.log(hero);
console.log(hero.name);
console.log(hero.role);


/* =========================
   JSON
========================= */

const heroJSON = JSON.stringify(hero);

console.log(heroJSON);

const normalHero = JSON.parse(heroJSON);

console.log(normalHero);


/* =========================
   localStorage
========================= */

localStorage.setItem(
    "favoriteHero",
    JSON.stringify(hero)
);

const savedHero = JSON.parse(
    localStorage.getItem("favoriteHero")
);

console.log(savedHero);


/* =========================
   Async JavaScript
========================= */

console.log("Game started!");

setTimeout(() => {

    console.log("Tinker is ready!");

}, 2000);

console.log("Game continues...");


/* =========================
   OpenDota API
========================= */

const apiData = document.querySelector("#apiData");

async function getHeroes() {

    apiData.textContent = "Loading...";

    try {

        const response = await fetch(
            "https://api.opendota.com/api/heroes"
        );

        console.log("Response:", response);

        if (!response.ok) {
            throw new Error(
                `API Error: ${response.status}`
            );
        }

        const data = await response.json();

        console.log("OpenDota Data:");
        console.log(data);


        /* =========================
           My Favorite Heroes
        ========================= */

        const myHeroes = [
            "Tinker",
            "Shadow Fiend",
            "Storm Spirit",
            "Void Spirit",
            "Earth Spirit",
            "Ember Spirit",
            "Lina",
            "Invoker",
            "Monkey King"
        ];


        /* =========================
           Filter My Heroes
        ========================= */

        const filteredHeroes = data.filter((hero) => {

            return myHeroes.includes(hero.localized_name);

        });


        /* =========================
           Display Heroes
        ========================= */

        apiData.innerHTML = "";

        filteredHeroes.forEach((hero) => {

            const heroName = document.createElement("p");

            heroName.textContent =
                `${hero.localized_name} - ${getAttribute(hero.primary_attr)} - ${hero.roles.join(", ")}`;

            apiData.appendChild(heroName);

        });

    } catch (error) {

        console.log("FULL ERROR:", error);

        apiData.textContent =
            "Failed to load Dota 2 data.";

    }

}


/* =========================
   Get Hero Attribute
========================= */

function getAttribute(attribute) {

    if (attribute === "str") {
        return "Strength";
    }

    if (attribute === "agi") {
        return "Agility";
    }

    if (attribute === "int") {
        return "Intelligence";
    }

    if (attribute === "all") {
        return "Universal";
    }

    return "Unknown";
}


getHeroes();
