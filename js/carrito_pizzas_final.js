// Primero voy a crear una variable que contenga la palabra document

const d = document;

//Conectamos con nuestro archivo JSON

fetch('./js/pizzas.json')
    .then( (resp) => resp.json() )
    .then( (data) => {
        pintarProductos(data);
        detectarBotones(data);
    }); 


//El tercer paso es crear una función que pinte las cards con los productos
// ACLARACIÓN: Las variables que tienen el signo $ son variables que tienen elementos del DOM

const $contenedorDeProductos = d.getElementById("contenedor-productos");

const pintarProductos = (data) => {
    const $template = d.getElementById("template-productos").content,
        $fragment = d.createDocumentFragment();
    
    data.forEach(producto => {
        $template.querySelector("img").setAttribute('src', producto.imagen);
        $template.querySelector("img").setAttribute('alt', producto.nombre);
        $template.querySelector("img").setAttribute('title', producto.nombre);

        $template.querySelector("h3").textContent = producto.nombre;
        $template.querySelector("p").textContent = producto.descripcion;
        $template.querySelector("span").textContent = producto.precio;
        $template.querySelector("button").dataset.id = producto.id;

        const clone = $template.cloneNode(true);
        $fragment.appendChild(clone);
    });

    $contenedorDeProductos.appendChild($fragment);
}


// El cuarto paso es iniciar el carrito como un objeto vacío:

let carrito = {};

//El quinto paso es Crear una función que detecte el botón de la card al cual hacemos click

const detectarBotones = (data) => {
    const $btnAgregarCarrito = d.querySelectorAll(".contiene-textos button");

    $btnAgregarCarrito.forEach(btn => {
        btn.addEventListener("click", () => {
            const producto = data.find(item => item.id === parseInt(btn.dataset.id));
            producto.cantidad = 1;
            
            if(carrito.hasOwnProperty(producto.id)){
                producto.cantidad = carrito[producto.id].cantidad + 1;
            }
             
            carrito[producto.id] = {...producto}

            pintarCarrito();

        });
    });
}

//El sexto paso es crear la función pintar carrito, encargada de pintar el carrito

