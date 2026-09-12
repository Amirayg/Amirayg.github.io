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

showButton.addEventListener("click", function () {
    const name = nameInput.value;

    console.log(name);
});
