document.addEventListener('DOMContentLoaded', () => {



fetch('http://localhost:3000/dogs')
.then((response) => response.json())
.then((json) => addDogs(json))


function addDogs(dogs) {
    for (let dog of dogs) {

        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        td1.innerHTML = dog.name
        tr.appendChild(td1)

        let td2 = document.createElement('td')
        td2.innerHTML = dog.breed
        tr.appendChild(td2)
        let td3 = document.createElement('td')
        td3.innerHTML = dog.sex
        tr.appendChild(td3)
        let td4 = document.createElement('td')
        let button = document.createElement('button')
        button.innerHTML = "Edit Dog"
        td4.appendChild(button)
        button.addEventListener('click', (e) => {
            console.log(e.target.parentNode.parentNode.childNodes[0].innerHTML)
            populateForm(e.target.parentNode.parentNode.childNodes[0].innerHTML, e.target.parentNode.parentNode.childNodes[1].innerHTML,  e.target.parentNode.parentNode.childNodes[2].innerHTML, dogs)

        })
        

        tr.appendChild(td4)

        let table = document.getElementById("table-body")
        table.appendChild(tr)
    }
}

})











function populateForm(dogname, dogbreed, dogsex, dogs) {
let dog = dogs.find((dog) => dog.name == dogname && dog.breed == dogbreed && dog.sex == dogsex)
console.log(dog)

   let form = document.getElementById('dog-form')
     form.name.value = dogname
     form.breed.value = dogbreed
    form.sex.value = dogsex
    nextfunc(dog)
    }

   
    function nextfunc(dog) {
    let form = document.getElementById('dog-form')
    form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    let name = e.target.name.value
    let breed = e.target.breed.value
    let sex = e.target.sex.value
    console.log(dog.id)
    
    fetch(`http://localhost:3000/dogs/${dog.id}`, {
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
