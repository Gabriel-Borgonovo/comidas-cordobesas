// Cuando hago click en .button, a .header_nav le añado la clase .activado
// Este efecto en js se llama TOGGLE

const button = document.querySelector(`.button`);
const nav = document.querySelector(`.header_nav`);

button.addEventListener(`click`, () => {
    nav.classList.toggle(`activado`);
});