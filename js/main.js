// Menu hamburguesa

const button = document.querySelector(`.button`);
const nav = document.querySelector(`.header_nav`);

button.addEventListener(`click`, () => {
    nav.classList.toggle(`activado`);
});


//clase que sirve de modelo para crear productos

class pizza {
    constructor(img, nombre, precio, id){
        this.img;
        this.nombre;
        this.precio;
        this.id;
        this.cantidad = 1;
    }
}


