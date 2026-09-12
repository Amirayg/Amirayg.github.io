const title = document.querySelector("h1");
const button = document.querySelector("#helloButton");

button.addEventListener("click", function () {
    title.classList.toggle("highlight");
});
