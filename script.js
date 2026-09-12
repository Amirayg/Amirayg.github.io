const button = document.querySelector("#helloButton");

button.addEventListener("click", function () {
    const newText = document.createElement("p");

    newText.textContent = "This paragraph was created with JavaScript!";

    document.body.appendChild(newText);
});
