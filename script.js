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
    const name = nameInput.value;

    if (name === "") {
        result.textContent = "Please enter your name!";
    } else {
        result.textContent = "Hello " + name + "!";
    }
});
