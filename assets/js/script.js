// Menu
let menu = document.querySelector('.menu-icon');
let nav = document.querySelector('.navbar');

menu.onclick = () => {
    nav.classList.toggle('active');
    menu.classList.toggle('move');
}

/* add event on element */

const addEventOnElem = function (elem, type, callback) {
    if (elem.length > 1) {
        for (let i = 0; i < elem.length; i++) {
            elem[i].addEventListener(type, callback);
        }
    } else {
        elem.addEventListener(type, callback);
    }
}
/* header & back top btn active when window scroll down to 100px */

const header = document.querySelector(".header");
const backTopBtn = document.querySelector(".back-top-btn");

const showElemOnScroll = function () {
    if (window.scrollY > 100) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
    } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
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
const ProductsDOM = document.querySelector(".product-list");
//initialise cart(getting info from local storage)
let cart = [];
//getting Products 
class Products{
    async getProducts(){
        try{
            let result = await fetch('products.json');
            let data = await result.json();
            let products = data.items;
            products = products.map(item => {
                const {itembelong,name,price} = item.fields;
                const {id} = item.sys;
                const image = item.fields.image.fields.file.url;
                return {itembelong,name,price,id,image};
            });
            return products;
        }
        catch(error){
            console.log(error);
        }
    }
};

//Display Products
class UI{
    displayProducts(products){
        let result = '';
        products.forEach(item =>{
            result+=`
            <li class="${item.itembelong}">
            <div class="product-card">
              <a href="#" class="card-banner img-holder has-before" style="--width: 300; --height: 300;">
                <img src="${item.image}" width="300" height="300" loading="lazy"
                  alt="Artificial potted plant" class="img-cover">
                <ul class="card-action-list">
                  <li>
                    <button class="card-action-btn" aria-label="add to cart" title="add to cart"  data-id="${item.id}">
                      <ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon>
                    </button>
                  </li>
                </ul>
              </a>
              <div class="card-content">
                <h3 class="h3">
                  <a href="#" class="card-title">${item.name}</a>
                </h3>
                <div class="card-price">
                  <data class="price" value="40">$${item.price}</data>
                </div>
              </div>
            </div>
          </li>
            `;
        });
        ProductsDOM.innerHTML = result;
    }
    getBagButtons(){
      const btns= [...document.querySelectorAll(".card-action-btn")];
      console.log(btns);
    }
};

//Local Storage
class Storage{
  static saveProducts(products){
    localStorage.setItem("products",JSON.stringify(products));
}
};

document.addEventListener("DOMContentLoaded",()=>{
    const ui= new UI();
    const products = new Products();

    //get all products
    products.getProducts().then(products => {
      ui.displayProducts(products);
      Storage.saveProducts(products);//static method
    }).then(()=>{
      ui.getBagButtons();
    });
    
});



/**
 * product filter
 */

const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterBox = document.querySelector("[data-filter]");

let lastClickedFilterBtn = filterBtns[0];

const filter = function () {
    lastClickedFilterBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedFilterBtn = this;

    filterBox.setAttribute("data-filter", this.dataset.filterBtn)
}

addEventOnElem(filterBtns, "click", filter);
