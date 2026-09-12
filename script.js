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
   join()
========================= */

const roles = [
    "Nuker",
    "Pusher",
    "Escape"
];

const rolesText = roles.join(", ");

console.log(rolesText);


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

        if (!response.ok) {
            throw new Error(
                `API Error: ${response.status}`
            );
        }

        const data = await response.json();

        console.log("OpenDota Data:");
        console.log(data);


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


        const filteredHeroes = data.filter((hero) => {

            return myHeroes.includes(hero.localized_name);

        });


        apiData.innerHTML = "";

        filteredHeroes.forEach((hero) => {

            const heroName =
                document.createElement("p");

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


/* =========================
   Hero Stats API
========================= */

async function getHeroStats() {

    try {

        const response = await fetch(
            "https://api.opendota.com/api/heroStats"
        );

        if (!response.ok) {
            throw new Error(
                `Stats API Error: ${response.status}`
            );
        }

        const stats = await response.json();

        console.log("Hero Stats:");
        console.log(stats);


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
           Filter Favorite Heroes
        ========================= */

        const filteredStats = stats.filter((hero) => {

            return myHeroes.includes(hero.localized_name);

        });


        /* =========================
           Sort by Ancient Win Rate
        ========================= */

        filteredStats.sort((a, b) => {

            const winRateA =
                a["6_win"] / a["6_pick"];

            const winRateB =
                b["6_win"] / b["6_pick"];

            return winRateB - winRateA;

        });


        /* =========================
           Display Hero Cards
        ========================= */

        apiData.innerHTML = "";

        filteredStats.forEach((hero) => {

            const winRate =
                (hero["6_win"] / hero["6_pick"] * 100)
                .toFixed(2);


            const heroCard =
                document.createElement("div");

            heroCard.classList.add("hero-card");


            const heroName =
                document.createElement("h3");

            heroName.textContent =
                hero.localized_name;


            const heroAttribute =
                document.createElement("p");

            heroAttribute.textContent =
                `Attribute: ${getAttribute(hero.primary_attr)}`;


            const heroRoles =
                document.createElement("p");

            heroRoles.textContent =
                `Roles: ${hero.roles.join(", ")}`;


            const heroWinRate =
                document.createElement("p");

            heroWinRate.textContent =
                `Ancient Win Rate: ${winRate}%`;


            heroCard.appendChild(heroName);

            heroCard.appendChild(heroAttribute);

            heroCard.appendChild(heroRoles);

            heroCard.appendChild(heroWinRate);


            apiData.appendChild(heroCard);

        });


        /* =========================
           map()
        ========================= */

        const heroNames =
            filteredStats.map((hero) => {

                return hero.localized_name;

            });

        console.log("Hero Names:");
        console.log(heroNames);


        /* =========================
           map() + Win Rate
        ========================= */

        const heroInfo =
            filteredStats.map((hero) => {

                const winRate =
                    (hero["6_win"] /
                    hero["6_pick"] * 100)
                    .toFixed(2);

                return `${hero.localized_name} - Ancient Win Rate: ${winRate}%`;

            });

        console.log("Hero Info:");
        console.log(heroInfo);


        /* =========================
           reduce()
        ========================= */

        const averageWinRate =
            filteredStats.reduce((total, hero) => {

                const winRate =
                    hero["6_win"] /
                    hero["6_pick"] * 100;

                return total + winRate;

            }, 0) / filteredStats.length;


        console.log(
            `Average Ancient Win Rate: ${averageWinRate.toFixed(2)}%`
        );


        /* =========================
           slice()
        ========================= */

        const top3Heroes =
            filteredStats.slice(0, 3);

        console.log("Top 3 Heroes:");
        console.log(top3Heroes);


        /* =========================
           join()
        ========================= */

        const top3Names =
            top3Heroes.map((hero) => {

                return hero.localized_name;

            });

        console.log(
            `Top 3: ${top3Names.join(", ")}`
        );


        /* =========================
           Sorted Heroes
        ========================= */

        console.log("Sorted Heroes:");
        console.log(filteredStats);

    } catch (error) {

        console.log("Stats Error:", error);

    }

}


getHeroes();
getHeroStats();
