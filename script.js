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
        result.innerHTML = "<strong>Hello " + name + "!</strong>";
        nameInput.value = "";
    }
});


const paragraphs = document.querySelectorAll("p");

paragraphs.forEach((paragraph) => {
    paragraph.style.color = "blue";
});
