let pokemonContainer = document.querySelector("#pokemon-card-container");
let searchInput = document.querySelector("#search");
let filterBtn = document.querySelector('#filter');
let typeSelect = document.querySelector("#type");

let colors = {
    grass: '#4CAF50',
    fire: '#F44336',
    water: '#2196F3',
    bug: '#9C27B0',
    normal: '#607D8B',
    poison: '#9E9E9E',
    electric: '#FFEB3B',
    ground: '#795548',
    fairy: '#FFCDD2',
    fighting: '#673AB7',
    psychic: '#FF9800',
    rock: '#3F51B5',
    ghost: '#E0E0E0',
    ice: '#00BCD4',
    dragon: '#03A9F4'
}

function createPokemonCard(details) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <div class='card-inner'>
        <div class= 'card-front' >
            <div class="id">${details.id}</div>
            <img src='${details.sprites.front_default}' alt='${details.name}'></img>
            <div class='name'>${details.name}</div>
            <div class="type">${details.types[0].type.name}</div>
        </div>
        <div class="back-card">
            <img src="${details.sprites.back_default}" alt='${details.name}'></img>
            <div class="ability">${details.abilities[0].ability.name}</div>
            <div class="name">${details.name}</div>
        </div>
    </div>
    `
    card.querySelector('.card-inner').style.backgroundColor = colors[details.types[0].type.name];
    return card;
}

searchInput.addEventListener('input', () => {
    let allCards = document.querySelectorAll(".card");
    let pokeArray = Array.from(allCards);
    pokeArray.forEach((element) => {
        let pokemonName = element.querySelector('.name').innerText;
        if (pokemonName.toLowerCase().startsWith(searchInput.value.toLowerCase())) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});

filterBtn.addEventListener('click', () => {
    let allCards = document.querySelectorAll(".card");
    let pokeArray = Array.from(allCards);
    pokeArray.forEach((element) => {
        let pokemonType = element.querySelector('.type').innerText;
        if (pokemonType.toLowerCase() === typeSelect.value.toLowerCase()) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});

async function fetchpokemon(i) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let result = await response.json();
    return result;
}

async function fetchmainpage() {
    for (let i = 1; i <= 151; i++) { // Reduced to 151 for performance reasons
        let pokemon = await fetchpokemon(i);
        let card = createPokemonCard(pokemon);
        pokemonContainer.appendChild(card);
    }
}

fetchmainpage();
