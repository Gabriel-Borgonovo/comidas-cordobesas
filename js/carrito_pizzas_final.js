// Primero voy a crear una variable que contenga la palabra document

const d = document;

//Conectamos con nuestro archivo JSON

fetch('./js/pizzas.json')
    .then( (resp) => resp.json() )
    .then( (data) => {
        console.log(data)
    }); 


//El tercer paso es crear una función que pinte las cards con los productos


