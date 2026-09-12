const button = document.querySelector("#helloButton");
const title = document.querySelector("h1");

button.addEventListener("click", function () {
    title.style.color = "red";
    title.style.backgroundColor = "yellow";
});
