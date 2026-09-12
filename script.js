const button = document.querySelector("#helloButton");
const title = document.querySelector("h1");

button.addEventListener("click", function () {
    title.textContent = "Welcome to Interactive AYG!";
});
