//Inputs
const searchBox = document.getElementById("search-box")
const searchButton = document.getElementById("search-button")
const loginInput = document.getElementById("user-login")
const loginButton = document.getElementById("login-button")
const catchButton = document.getElementById("catch")
const releaseButton = document.getElementById("release")
// Outputs
const spriteElem = document.getElementById("pokemon-sprite")
const idElem = document.getElementById("pokemon-id")
const nameElem = document.getElementById("pokemon-name")
const renderElem = document.getElementById("pokemon-render")
const speciesElem = document.getElementById("pokemon-species")
const typeElem = document.getElementById("pokemon-type")
const heightElem = document.getElementById("pokemon-height")
const weightElem = document.getElementById("pokemon-weight")
const specialtyElem = document.getElementById("pokemon-specialty")
const descriptionElem = document.getElementById("pokemon-description")
const caughtListElem = document.getElementById("caught-list")
// username
let username

async function getPokemon(pokemonId){
    try{
        const pokemonPromise = await axios.get(`http://localhost:8080/pokemon/get/${pokemonId}`,{headers:{"username": username}});
        return pokemonPromise.data
    } catch (error){
        handleError()
        throw error
    }
}
// // Get description chain from pokemon species url!
async function getPokemonSpecies(speciesURL){
    try{
        const pokemonSpeciesPromise = await fetch(`${speciesURL}`)
        const pokemonSpecies = await pokemonSpeciesPromise.json()
        return pokemonSpecies
    } catch (error){
        throw `can't find Species. ${error}`
    }
}
async function getAllPokemonOfType(typeURL){
    try{
        const typePromise = await fetch(`${typeURL}`)
        const typeObj = await typePromise.json()
        return typeObj.pokemon
    } catch (error){
        throw `can't find Type. ${error}`
    }
}

// async function getPokemonEvolutionChain(evolutionURL){
//     try{
//         const evolutionPromise = await fetch(`${evolutionURL}`)
//         const evolutionchain = evolutionPromise.json()
//         return evolutionchain
//     } catch (error){
//         throw `can't find evolution chain. ${error}`
//     }
// }


async function displayPokemon(pokemonId){
    try{
        const pokemonData = await getPokemon(pokemonId)
        spriteElem.src = pokemonData.front_pic
        backSprite(pokemonData.front_pic, pokemonData.back_pic)
        idElem.innerText = pokemonData.id
        nameElem.innerText = pokemonData.name
        renderElem.src = `https://img.pokemondb.net/sprites/home/normal/${pokemonData.name}.png`
        // speciesElem.innerText = pokemonData.species.name
        displayTypes(pokemonData.types)
        heightElem.innerText = pokemonData.height
        weightElem.innerText = pokemonData.weight
        specialtyElem.innerText = calculateSpecialty(pokemonData.stats)
        displayDescription(pokemonData.species.url)
        // console.log(pokemonData)
    } catch (error){
        // throw `can't find Pokemon. ${error}`
    }
}

async function displayDescription(spiciesURL){
    const pokemonSpecies = await getPokemonSpecies(spiciesURL)
    const description = identifyEnglishDescription(pokemonSpecies.flavor_text_entries)
    descriptionElem.innerText = description.replace('\f', " ").replaceAll('\n', " ")
}
//pokemons can have multible types. this function handles those types
function displayTypes(types){
    let typeCount = 1
    for (const type of types){
        createTypeImg(type, typeCount)
        createTypeSelect(type.type.url, typeCount)
        typeCount++
    }
}
// type select functionality
function createTypeImg(type, typeCount){
    const typeIcon = document.createElement("img")
    // typeIcon.src = `/Pokedex/styles/images/types/${type.type.name}.png` //GitHub pages format
    typeIcon.src = `./styles/images/types/${type.type.name}.png` //localhost format
    typeIcon.classList.add("type-box", `type-icon${typeCount}`)
    typeIcon.addEventListener("click", showTypeSelect)
    typeElem.appendChild(typeIcon)
}
async function createTypeSelect(typeURL, typeCount){
    const pokemonsArr = await getAllPokemonOfType(typeURL)
    const pokemonSelect = document.createElement("select")
    pokemonSelect.classList.add(`type-select`, `type${typeCount}`)
    for (const pokemon of pokemonsArr) {
        const pokemonOption = document.createElement("option")
        pokemonOption. innerText = pokemon.pokemon.name
        pokemonOption. value = pokemon.pokemon.name
        pokemonSelect.appendChild(pokemonOption)
    }
    pokemonSelect.addEventListener("change", ({target})=>{searchPokemon(target.value)})
    document.getElementById("pokedex").appendChild(pokemonSelect)
}
// displayPokemon(280)
function searchPokemon(pokemonId){
    removeError()
    clearDisplay()
    displayPokemon(pokemonId)
}
// Reset entry display
function clearDisplay(){
    spriteElem.src = ""
    idElem.innerText = ""
    nameElem.innerText = ""
    renderElem.src = ""
    // speciesElem.innerText = ""
    deleteTypes()
    heightElem.innerText = ""
    weightElem.innerText = ""
    specialtyElem.innerText = ""
    descriptionElem.innerText = ""
}
function deleteTypes(){
    const prevTypesImg = document.getElementsByClassName("type-box")
    if (prevTypesImg.length>0) typeElem.innerHTML = ""
    const prevTypesSelect = document.getElementsByClassName("type-select")
    if (prevTypesSelect.length>0){
        prevTypesSelect[0].remove()
        deleteTypes()
    }
}
searchButton.addEventListener("click", ()=>{searchPokemon(searchBox.value)})

// Error handles
function handleError(){
    const errorElem = document.createElement("div")
    errorElem.classList.add = "error"
    errorElem.innerText = `Error! can't find Pokemon`
    document.body.appendChild(errorElem)
}
function removeError(){
    const checkPrevError = document.getElementsByClassName("error")
    if (checkPrevError.length !== 0){
        document.body.removeChild(checkPrevError[0])
    }
}
// Speciality calculates the pokemon's speciality and returns it.
// For example: alakazam have low defence and very high sp.attack so it's speciality is sp.attack.
function calculateSpecialty(statsObj){
    const sipmleStatsObj = {
        HP: statsObj[0].base_stat,
        ATK: statsObj[1].base_stat,
        DEF: statsObj[2].base_stat,
        SPATK: statsObj[3].base_stat,
        SPDEF: statsObj[4].base_stat,
        }
    const statsArr = [sipmleStatsObj.HP, sipmleStatsObj.ATK, sipmleStatsObj.DEF, sipmleStatsObj.SPATK, sipmleStatsObj.SPDEF]
    const highestStat = Math.max(...statsArr)
    for (const [statName, statValue] of Object.entries(sipmleStatsObj)){
        if (statValue === highestStat) return `${statName}: ${statValue}`
    }
}

// spripte back_defult function
function backSprite(front, back){
    spriteElem.onmouseover = () => {spriteElem.src = back}
    spriteElem.onmouseout = () => {spriteElem.src = front}
}
// // get same type pokemon list function
function identifyTypeList(className){
    if (className === "type-icon1") return document.getElementsByClassName("type1")[0]
    if (className === "type-icon2") return document.getElementsByClassName("type2")[0]
}
function showTypeSelect({target}){
    const typeSelect = identifyTypeList(target.classList[1])
    typeSelect.classList.add("visible")
}
// // Check for english description
function identifyEnglishDescription(descriptionArr){
    for (const description of descriptionArr) {
        if (description.language.name === "en") return description.flavor_text
    }
}

// Log-in
function login() {
    username = loginInput.value
    displayCaughtList()
    removeError()
}
loginButton.addEventListener("click", login)

async function catchPokemon() {
    try{
        const pokemonId = idElem.innerText
        const catchRequest = await axios.put(`http://localhost:8080/pokemon/catch/${pokemonId}`, {body:{}}, {headers:{"username": username}});
        displayCaughtList()
        return catchRequest
    } catch (error){
        handleError()
        throw error
    }
}
catchButton.addEventListener("click", catchPokemon)

async function releasePokemon() {
    try{
        const pokemonId = idElem.innerText
        axios.delete(`http://localhost:8080/pokemon/release/${pokemonId}`,{headers:{"username": username}}, {body:{}});
        displayCaughtList()
        return 
    } catch (error){
        handleError()
        throw error
    }
}
releaseButton.addEventListener("click", releasePokemon)

async function getCaughtList() {
    try{
        const caughtlist = await axios.get(`http://localhost:8080/pokemon/`,{headers:{"username": username}});
        console.log(caughtlist.data)
        return caughtlist.data
    } catch (error){
        handleError()
        throw error
    }
}

async function displayCaughtList() {
    const pokemonList = await getCaughtList()
    const caughtArr = []
    for (const pokemon of pokemonList) {
        caughtArr.push(` ${pokemon.name}`)
    }
    caughtListElem.innerText = caughtArr
}

// displayPokemon(280)