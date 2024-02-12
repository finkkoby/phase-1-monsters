document.addEventListener("DOMContentLoaded", getMonsters())
let monsterContainer = document.querySelector('div#monster-container');

let form = document.querySelector("form#new-monster");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let parent = e.target.children;
    let newMonster = {};
    newMonster.name = parent[0].value;
    newMonster.age = parent[1].value;
    newMonster.description = parent[2].value;
    postMonster(newMonster);
    form.reset;
})
let counter = 0;

let backBtn = document.querySelector('button#back')
backBtn.addEventListener("click", (e) => {
    if (counter === 0) {
        alert("No monsters here...");
    } else {
        counter -= 20;
        monsterContainer.innerText = "";
        getMonsters();
    }
})
let forwardBtn = document.querySelector('button#forward')
forwardBtn.addEventListener("click", (e) => {
        counter += 20;
        monsterContainer.innerText = "";
        getMonsters();
})

//Functions
function postMonster(object) {
    fetch('http://localhost:3000/monsters', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(object)
    })
    .then(response => response.json())
    .then(obj => console.log(obj))
}

function monsterCard(object) {
    let newCard = document.createElement("div");
    let name = document.createElement("h2");
    let age = document.createElement("h4");
    let description = document.createElement("p");
    name.innerText = object.name;
    age.innerText = "Age: " + object.age;
    description.innerText = object.description;
    newCard.appendChild(name);
    newCard.appendChild(age);
    newCard.appendChild(description);
    monsterContainer.appendChild(newCard);
}

function getMonsters() {
    fetch('http://localhost:3000/monsters')
    .then(response => response.json())
    .then(monsters => {
        for (let i = counter; i < (counter + 20); i++) {
            monsterCard(monsters[i]);
        }
    })
}