document.addEventListener('DOMContentLoaded', () => {



fetch('http://localhost:3003/dogs')
.then((response) => response.json())
.then((json) => addDogs(json))


function addDogs(dogs) {

for (let dog of dogs) {
    console.log(dog)
    let tr = document.createElement('tr')
    let td1 = document.createElement('td')
    td1.innerHTML = dog.name
    let td2 = document.createElement('td')
    td2.innerHTML = dog.breed
    let td3 = document.createElement('td')
    td3.innerHTML = dog.sex
    let td4 = document.createElement('td')
    let button = document.createElement('button')
    console.log(dog)
    button.addEventListener('click', (e) => {populateForm( e.target.parentNode.parentNode.childNodes[0].innerHTML, e.target.parentNode.parentNode.childNodes[1].innerHTML,  e.target.parentNode.parentNode.childNodes[2].innerHTML, dogs)})
    button.innerHTML = "EDIT DOG"
    td4.appendChild(button)  
    tr.appendChild(td1)       
    tr.appendChild(td2)        
    tr.appendChild(td3)
    tr.appendChild(td4)
    let table = document.getElementById("table-body")
    table.appendChild(tr)
}
}






function populateForm(dogname, dogbreed, dogsex, dogs) {
let dog = dogs.find((dog) => dog.name == dogname && dog.breed == dogbreed && dog.sex == dogsex)
console.log(dog)

   let form = document.getElementById('dog-form')
     form.name.value = dogname
     form.breed.value = dogbreed
    form.sex.value = dogsex
    nextfunc(dog)
    }

    //function formform(){
    function nextfunc(dog) {
    let form = document.getElementById('dog-form')
    form.addEventListener('submit', (e) => {
    e.preventDefault()
    //console.log(e.target)
    let name = e.target.name.value
    let breed = e.target.breed.value
    let sex = e.target.sex.value
    console.log(dog.id)
    
    fetch(`http://localhost:3003/dogs/${dog.id}`, {
        method: "PATCH",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({name: name, breed: breed, sex: sex})
    })
    .then((response) => response.json())
    .then((json) => console.log(json))
})
        }
})