// Menu
let menu = document.querySelector('.menu-icon');
let nav = document.querySelector('.navbar');

menu.onclick = () => {
    nav.classList.toggle('active');
    menu.classList.toggle('move');
}

/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
    if (elem.length > 1) {
        for (let i = 0; i < elem.length; i++) {
            elem[i].addEventListener(type, callback);
        }
    } else {
        elem.addEventListener(type, callback);
    }
}
/**
* header & back top btn active when window scroll down to 100px
*/

const header = document.querySelector(".header");
//const backTopBtn = document.querySelector("[data-back-top-btn]");

const showElemOnScroll = function () {
    if (window.scrollY > 100) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
}

addEventOnElem(window, "scroll", showElemOnScroll);
const heroo = document.querySelector('.hero-list');
function renderHero() {
    hero.forEach((item) => {
        heroo.innerHTML += `
    <li class="${item.itsClass}">
    <div class="hero-card">

      <figure class="card-banner img-holder" style="--width: ${item.imgWid}; --height:  ${item.imgHeight};">
        <img src="${item.imgSrc}" width="${item.imgWid}" height="${item.imgHeight}" alt="Art Deco Home" class="img-cover">
      </figure>
      <div class="card-content">
        <h3>
          <a href="#" class="card-title">${item.name}</a>
        </h3>

        <p class="card-text">${item.itembelong}</p>
      </div>

    </div>
  </li>`;
    });
}
renderHero();