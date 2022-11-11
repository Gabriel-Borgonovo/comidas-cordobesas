// Menu hamburguesa

const button = document.querySelector(`.button`);
const nav = document.querySelector(`.header_nav`);

button.addEventListener(`click`, () => {
    nav.classList.toggle(`activado`);
});

//********************************************************************** */

//efecto scroll al menu

const $header = document.querySelector(".header");

const addClassToHeader = () =>{

    window.addEventListener("scroll", ()=> {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if(scrollTop > 150){
            $header.classList.add("header-bg-scroll");
        }else{
            $header.classList.remove("header-bg-scroll");
    }
    });
    
}

addClassToHeader();

