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
    }
}

const muzza = new pizza(1, "Pizza Muzzarella", "./images/muzzarella.jpg", "Incluye queso muzzarella, aceitunas y aceite de oliva", 750);
const especial = new pizza(2, "Pizza Especial j&q", "./images/pizza-jamon-y-queso.jpg", "Incluye muzzarella, jamon, aceitunas y aceite de oliva", 950);
const calabresa = new pizza(3, "Pizza Calabresa", "./images/calabresa.png", "Incluye muzzarella, salame, aceitunas y aceite de oliva", 1250);
const celeste = new pizza(4, "Pizza a la Celeste", "./images/pizza-celeste.webp", "Incluye muzzarella, papas, aceitunas y aceite de oliva", 1270);
const morrones = new pizza(4, "Pizza con Morrones", "./images/pizza_de_jamón_y_morrones_6.jpg", "Incluye muzzarella, morrones, aceitunas y jamon", 1140);

//Las agregamos a un array

const arrPizzas = [muzza, especial, calabresa, celeste, morrones];

console.log(arrPizzas);


//Creamos un array vacio que va a ser nuestro carrito

let carrito = [];



const $contenedorPizzas = d.getElementById("contenedor-pizzas");
 //console.log($contenedorPizzas);

 const mostrarPizzas = ()=>{
    arrPizzas.forEach((producto) =>{
        const card = d.createElement("div");
        card.classList.add("col-10", "col-sm-5", "col-md-5", "col-lg-4", "col-xl-3", "contiene-imagen");
        card.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}" title="${producto.nombre}" />
            <div class="contiene-textos">
                <h3>${producto.nombre}</h3>
                <p>${producto.description}</p>
                <span>$${producto.precio}</span>
                <button id="boton${producto.id}">Añadir al carrito <i class="fa-solid fa-cart-shopping"></i></button>
            </div>
        `

        $contenedorPizzas.appendChild(card);
    });
 }

 mostrarPizzas();