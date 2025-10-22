const generateHexColor = () => {
    const values = '0123456789abcdef';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += values[Math.floor(Math.random() * 16)];
    }
    return color;
};

const body = document.getElementById("body");
const btn = document.getElementById("btn");
const h1 = document.createElement("h1");

btn.addEventListener("click", () => {
    const color = generateHexColor();
    body.style.backgroundColor = color;
    btn.innerText = `My color is ${color}`;
    h1.innerHTML = "This is A Heading!";
    body.appendChild(h1);
});

const btntoRemove = document.getElementById("toRemove")
btntoRemove.addEventListener("click", () => {
    btntoRemove.remove();

});