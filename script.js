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
