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
            
            if(carrito.hasOwnProperty(producto.id)) producto.cantidad = carrito[producto.id].cantidad + 1;
            
            carrito[producto.id] = {...producto}
            
              pintarCarrito();

              alertaProductoAgregado();

        });
    });
}


//El sexto paso es crear la función pintar carrito, encargada de pintar el carrito

const $items = d.getElementById("items");

const pintarCarrito = () => {

    $items.innerHTML = "";

    const $template = d.getElementById("template-carrito").content,
        $fragment = d.createDocumentFragment();

    //transformamos el carrito en un arreglo para recorrerlo con forEach
    Object.values(carrito).forEach(producto => {
        pintarItemCarrito($template, $fragment, producto);
    });

    $items.appendChild($fragment);

    pintarPieDeCarrito();
    botonesSumarRestar();

}

const pintarItemCarrito = (template, fragment, producto) => {
    let temp = template
    temp.querySelector("th").textContent = producto.id;
    temp.querySelectorAll("td")[0].textContent = producto.nombre;
    temp.querySelectorAll("td")[1].textContent = producto.cantidad;
    temp.querySelector("span").textContent = producto.precio * producto.cantidad;

    temp.querySelector(".btn-info").dataset.id = producto.id;
    temp.querySelector(".btn-danger").dataset.id = producto.id;

    const clone = temp.cloneNode(true);
    fragment.appendChild(clone);

}


//El septimo paso es crear una función que pinte el pie del carrito donde estará el monto total y el botón de vaciar carrito

const $pieDeCarrito = d.getElementById("footer-carrito");

const pintarPieDeCarrito = () =>{

    $pieDeCarrito.innerHTML = "";

    if(Object.keys(carrito).length === 0){
        $pieDeCarrito.innerHTML = 
            `<th scope="row" colspan="5">Carrito vacío - Comience a comprar!</th>`;
        
        return;
    }

    const $template = d.getElementById("template-footer").content,
        $fragment = d.createDocumentFragment();

    $template.querySelectorAll("td")[0].textContent = sumarCantidades();
    $template.querySelector("span").textContent = sumarPrecios();

    const clone = $template.cloneNode(true);
    $fragment.appendChild(clone);
    $pieDeCarrito.appendChild($fragment);

    vaciarCarrito();
}

//El octavo paso es crear una función que sume la cantidad total de productos agregados al carrito
const sumarCantidades = () => {
    const cantidadTotal = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0);
    return cantidadTotal;
}

//El noveno paso es crear una función que sume la cantidad total de productos agregados al carrito
const sumarPrecios = () => {
    const precioTotal = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad*precio, 0);
    pagarCompra(precioTotal);
    return precioTotal;
}

//El decimo paso es crear una función que le de funcionalidad al boton de vaciar el carrito
const vaciarCarrito = () => {
    const $botonVaciarCarrito = d.getElementById("vaciar-carrito");
    $botonVaciarCarrito.addEventListener("click", () => {
        carrito = {};
        pintarCarrito();
    });
}

//El onceavo paso es crear una función que le de funcionalidad a los botones de aumentar y disminuir cantidad en el carrito
const botonesSumarRestar = () =>{
    const $botonesAgregar = d.querySelectorAll("#items .btn-info"),
        $botonesEliminar = d.querySelectorAll("#items .btn-danger");
    
    $botonesAgregar.forEach( btn => {
        btn.addEventListener("click", () => {
            btnSumarCantidad(btn);
        });
    });

    $botonesEliminar.forEach(btn => {
        btn.addEventListener("click", () => {
            btnEliminarCantidad(btn);
        });
    });
}

//función que le da funcionalidad al boton de aumentar cantidad en el carrito
const btnSumarCantidad = (btn) => {
    const producto = carrito[btn.dataset.id];
    producto.cantidad ++;
    carrito[btn.dataset.id] = {...producto};
    pintarCarrito();
}

//función que le da funcionalidad al boton de disminuir cantidad en el carrito
const btnEliminarCantidad = (btn) => {
    const producto = carrito[btn.dataset.id];
    producto.cantidad --;
    if(producto.cantidad === 0){
        delete carrito[btn.dataset.id]; 
    }else{
        carrito[btn.dataset.id] = {...producto};
    }
    pintarCarrito();
}


/***********APLICANDO LIBRERIAS********************/

const alertaProductoAgregado = () =>{
    Toastify({
        text: "agregado al carrito",
        duration: 700,
        gravity: "bottom",
        position: "right",
        style: {
            background: "#5622D4",
            color: "#fff",
          }
    }).showToast();
}



const $btnpagar = d.getElementById("pagar");

const pagarCompra = (total) => {
    
    const montoTotal = total;
    
    $btnpagar.addEventListener("click", () => {

        if(Object.values(carrito).length !==0){

            Swal.fire({
                title: `El total de tu compra es de $${montoTotal} ARS`,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Pagar'
              }).then((result) => {
                carrito = {};
                pintarCarrito();
                if (result.isConfirmed) {
                  Swal.fire({
                    title:'Pago Exitoso',
                    text:'Muchas gracias por su compra',
                    icon:'success',
                    showConfirmButton: false,
                    timer: 1500
                })  
                }    
              });

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay productos en el carrito',
                showConfirmButton: true,
                confirmButtonText: 'Volver a comprar'
              });
        }
       
    });

    
}







