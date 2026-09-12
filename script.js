const title = document.querySelector("h1");
const button = document.querySelector("#helloButton");

button.addEventListener("click", function () {
    title.classList.toggle("highlight");
});
const newText = document.createElement("p");

newText.textContent = "This paragraph was created with JavaScript!";

document.body.appendChild(newText);
