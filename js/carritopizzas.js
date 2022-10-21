//guardamos document en una constante d para facilitar la escritura del código

const d = document;

//clase que sirve de modelo para crear productos

class pizza {
    constructor(id, nombre, img, description, precio){
        this.id = id;
        this.nombre = nombre;
        this.img = img;
        this.description = description;
        this.precio = precio;
        this.cantidad = 1;
    }
}

const muzza = new pizza(1, "Pizza Muzzarella", "./images/muzzarella.jpg", "Incluye queso muzzarella, aceitunas y aceite de oliva", 750);
const especial = new pizza(2, "Pizza Especial j&q", "./images/pizza-jamon-y-queso.jpg", "Incluye muzzarella, jamon, aceitunas y aceite de oliva", 950);
const calabresa = new pizza(3, "Pizza Calabresa", "./images/calabresa.png", "Incluye muzzarella, salame, aceitunas y aceite de oliva", 1250);
const celeste = new pizza(4, "Pizza a la Celeste", "./images/pizza-celeste.webp", "Incluye muzzarella, papas, aceitunas y aceite de oliva", 1270);
const morrones = new pizza(5, "Pizza con Morrones", "./images/pizza_de_jamón_y_morrones_6.jpg", "Incluye muzzarella, morrones, aceitunas y jamon", 1140);
const anchoas = new pizza(6, "Pizza con Anchoas", "./images/pizza-de-anchoas1.webp", "Incluye muzzarella, anchoas, aceitunas y aceite de oliva", 1240);
const napolitana = new pizza(7, "Pizza a la Napolitana", "./images/pizza-napolitana.jpg", "Incluye muzzarella, tomates, aceitunas y aceite de oliva", 1100);
const estrellada = new pizza(8, "Pizza a la Estrellada", "./images/pizza-estrellada.jpg", "Incluye muzzarella, papas, huevos fritos, panceta y aceitunas", 1400);
const ternera = new pizza(9, "Pizza de Ternera", "./images/pizza_de_ternera.jpg", "Incluye muzzarella, carne de res molida, aceitunas y aceite de oliva", 1550);
const palmitos = new pizza(10, "Pizza de Palmitos", "./images/palmitos.png", "Incluye muzzarella, palmitos, salsa golf y aceitunas negras", 1450);
const roquefort = new pizza(11, "Pizza de Roquefort", "./images/roquefort.jpg" , "Incluye muzzarella, queso roquefort, cebolla y aceitunas negras", 1470);
const anana = new pizza(12, "Pizza de Anana", "./images/anana.jpg", "Incluye muzzarella, anana en rodajas, salsa golf y aceitunas negras", 1360);

//Las agregamos a un array

const arrPizzas = [muzza, especial, calabresa, celeste, morrones, anchoas, napolitana, estrellada, ternera, palmitos, roquefort, anana];

console.log(arrPizzas);


//Creamos un array vacio que va a ser nuestro carrito

let carrito = [];



const $contenedorPizzas = d.getElementById("contenedor-pizzas");
 //console.log($contenedorPizzas);

 const mostrarPizzas = ()=>{
    arrPizzas.forEach((piza) =>{
        const card = d.createElement("div");
        card.classList.add("col-10", "col-sm-5", "col-md-5", "col-lg-4", "col-xl-3", "contiene-imagen");
        card.innerHTML = `
            <img src="${piza.img}" alt="${piza.nombre}" title="${piza.nombre}" />
            <div class="contiene-textos">
                <h3>${piza.nombre}</h3>
                <p>${piza.description}</p>
                <span>$${piza.precio}</span>
                <button id="boton${piza.id}">Añadir al carrito <i class="fa-solid fa-cart-shopping"></i></button>
            </div>
        `

        $contenedorPizzas.appendChild(card);

        // ejecutar función que agrega las pizzas al carrito

        const boton = d.getElementById(`boton${piza.id}`);
        boton.addEventListener("click", ()=>{
            cargarCarrito(piza.id);
        });

    });
 }

 //función cargarCarrito

 const cargarCarrito = (id) =>{
    const Pizza = arrPizzas.find((piza)=> piza.id === id);
    const pizzaEnCarrito = carrito.find((piza)=> piza.id === id);
    
    if(pizzaEnCarrito){
        pizzaEnCarrito.cantidad++;
    }else{
        carrito.push(Pizza);
    }

    calcularTotalDeLaCompra();

 }

 mostrarPizzas(); 

 