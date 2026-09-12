const button = document.querySelector("#helloButton");
const title = document.querySelector("h1");

button.addEventListener("click", function () {
    title.classList.toggle("highlight");
});


const addButton = document.querySelector("#addButton");
const removeButton = document.querySelector("#removeButton");

let newText;

addButton.addEventListener("click", function () {
    newText = document.createElement("p");
    newText.textContent = "This paragraph was created with JavaScript!";
    document.body.appendChild(newText);
});

removeButton.addEventListener("click", function () {
    if (newText) {
        newText.remove();
    }
});


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


const paragraphs = document.querySelectorAll("p");

paragraphs.forEach((paragraph) => {
    paragraph.style.color = "blue";
});


const heroes = ["Tinker", "Invoker", "Storm Spirit"];

heroes.push("Lina");
heroes.pop();
heroes.splice(1, 0, "Puck");

console.log(heroes);
console.log(heroes.length);

console.log(heroes.includes("Invoker"));
console.log(heroes.includes("Shadow Fiend"));

console.log(heroes.indexOf("Invoker"));
console.log(heroes.indexOf("Shadow Fiend"));

console.log(heroes[0]);
console.log(heroes[2]);


for (let i = 0; i < heroes.length; i++) {
    console.log(heroes[i]);
}


for (let i = 0; i < heroes.length; i++) {
    if (heroes[i].length > 5) {
        console.log(heroes[i]);
    }
}


for (const hero of heroes) {
    console.log(hero);
}


let i = 0;

while (i < heroes.length) {
    console.log(heroes[i]);
    i++;
}


let j = 0;

do {
    console.log(heroes[j]);
    j++;
} while (j < heroes.length);


for (const hero of heroes) {
    console.log(hero);

    if (hero === "Invoker") {
        break;
    }
}


for (const hero of heroes) {
    if (hero === "Invoker") {
        continue;
    }

    console.log(hero);
}


const hero = {
    name: "Tinker",
    role: "Mid",
    attribute: "Intelligence",
    stats: {
        damage: 55,
        armor: 4
    }
};

console.log(hero.name);
console.log(hero.role);
console.log(hero.attribute);

hero.role = "Support";

hero.team = "Team AYG";

delete hero.team;

console.log(hero);

console.log(hero.name);
console.log(hero["name"]);

const property = "role";

console.log(hero[property]);

console.log(hero.stats.damage);
console.log(hero["stats"]["damage"]);


/* Array of Objects */

const heroList = [
    { name: "Tinker", role: "Mid", damage: 55 },
    { name: "Invoker", role: "Mid", damage: 60 },
    { name: "Puck", role: "Mid", damage: 52 },
    { name: "Lina", role: "Mid", damage: 58 }
];

console.log(heroList[0].name);
console.log(heroList[1].damage);

for (const hero of heroList) {
    console.log(hero.name);
    console.log(hero.role);
}


/* map() */

const names = heroList.map((hero) => {
    return hero.name;
});

console.log(names);


/* filter() */

const strongHeroes = heroList.filter((hero) => {
    return hero.damage > 55;
});

console.log(strongHeroes);


/* find() */

const foundHero = heroList.find((hero) => {
    return hero.name === "Invoker";
});

console.log(foundHero);


/* some() */

const hasStrongHero = heroList.some((hero) => {
    return hero.damage > 60;
});

console.log(hasStrongHero);


/* every() */

const allMid = heroList.every((hero) => {
    return hero.role === "Mid";
});

console.log(allMid);


/* Destructuring - Object */

const { name, role, damage } = hero;

console.log(name);
console.log(role);
console.log(damage);


/* Destructuring - Array */

const [first, second, third] = heroes;

console.log(first);
console.log(second);
console.log(third);


/* Destructuring - Array of Objects */

const [firstHero, secondHero] = heroList;

console.log(firstHero.name);
console.log(secondHero.name);


/* Spread - Array */

const heroes1 = ["Tinker", "Invoker"];
const heroes2 = ["Puck", "Lina"];

const allHeroes = [...heroes1, ...heroes2];

console.log(allHeroes);


/* Spread - Object */

const basicHero = {
    name: "Tinker",
    role: "Mid"
};

const fullHero = {
    ...basicHero,
    damage: 55
};

console.log(fullHero);


/* Rest */

function showHeroes(...heroes) {
    console.log(heroes);
}

showHeroes("Tinker", "Invoker", "Puck");


/* Template Literals */

const playerName = "Amirhossein";
const favoriteHero = "Tinker";
const heroDamage = 55;

console.log(`My name is ${playerName}.`);
console.log(`My favorite hero is ${favoriteHero}.`);
console.log(`${favoriteHero} has ${heroDamage + 10} damage.`);


/* Scope */

const globalHero = "Tinker";

console.log(globalHero);

function showScope() {
    const localHero = "Invoker";

    console.log(localHero);
}

showScope();

if (true) {
    const blockHero = "Puck";

    console.log(blockHero);
}


/* try / catch */

try {
    console.log(heroName);
} catch (error) {
    console.log("Something went wrong!");
}


/* finally */

try {
    console.log("Game started!");
} catch (error) {
    console.log("Game error!");
} finally {
    console.log("Game finished!");
}


/* JSON */

const jsonHeroObject = {
    name: "Tinker",
    role: "Mid",
    damage: 55
};

const jsonHero = JSON.stringify(jsonHeroObject);

console.log(jsonHero);

const normalHero = JSON.parse(jsonHero);

console.log(normalHero);
console.log(normalHero.name);
console.log(normalHero.role);


/* localStorage */

localStorage.setItem("playerName", "Amirhossein");

const savedName = localStorage.getItem("playerName");

console.log(savedName);


/* localStorage + JSON */

localStorage.setItem("favoriteHero", JSON.stringify(hero));

const savedHero = JSON.parse(localStorage.getItem("favoriteHero"));

console.log(savedHero);
console.log(savedHero.name);
console.log(savedHero.role);


/* Date & Time */

const now = new Date();

console.log(now);

console.log(now.getFullYear());
console.log(now.getMonth() + 1);
console.log(now.getDate());
console.log(now.getHours());
console.log(now.getMinutes());
console.log(now.getSeconds());

console.log(`Year: ${now.getFullYear()}`);
console.log(`Month: ${now.getMonth() + 1}`);
console.log(`Day: ${now.getDate()}`);
console.log(`Time: ${now.getHours()}:${now.getMinutes()}`);


/* Async JavaScript */

console.log("Game started!");

setTimeout(() => {
    console.log("Tinker is ready!");
}, 2000);

console.log("Game continues...");


/* Promise */

const match = new Promise((resolve, reject) => {

    setTimeout(() => {
        resolve("Match found!");
    }, 2000);

});

match.then((result) => {
    console.log(result);
});


/* async / await */

async function startGame() {
    const result = await match;

    console.log(result);
}

startGame();


/* Real API */

const apiData = document.querySelector("#apiData");

async function getPokemon() {

    apiData.textContent = "Loading...";

    try {

        const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon/pikachu"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch Pokémon data.");
        }

        const data = await response.json();

        apiData.textContent = data.name;

    } catch (error) {

        apiData.textContent = "Failed to load Pokémon.";

        console.log(error);
    }
}

getPokemon();
