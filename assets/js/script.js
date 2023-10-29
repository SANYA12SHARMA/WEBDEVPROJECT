// Menu
let menu = document.querySelector('.menu-icon');
let nav = document.querySelector('.navbar');
let cat =document.querySelector('.cart');
document.querySelector("#cart").onclick = () =>{
  cat.classList.toggle('active');
  nav.classList.remove('active');
  menu.classList.remove('move');
}


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
// let cart = [];
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
      const buttons= [...document.querySelectorAll(".card-action-btn")];
      buttons.forEach(button =>{
         let id = button.dataset.id;
        //  let inCart = cart.find(item => item.id === id);
        //  if(inCart){
        //   button.innerText = "In Cart";
        //   button.disabled = true;
        //  }else{
        //   button.addEventListener('click',(event)=>{
        //     event.target.innerText = "In Cart";
        //     event.target.disabled = true;
        //     //get product from products
        //     //add product to the cart
        //     //save cart in Local Storage

        //   })
        //  }
      });

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


// let cartt= [];
// function renderCartItems(){
//   cartItemsEl.innerHTML=""//clear cart element
//   products.forEach((item)=>{
//       cartItemsEl.innerHTML+=`
//       <div class="cart-box">
//       <img src="${item.image}" alt="${item.name}">
//       <div class="cart-text">
//           <h3>${item.name}</h3>
//           <span>${item.price}</span><span><i class='bx bx-trash' onclick=" removeItemFromCart(${item.id})"></i></span>
//       </div>
//       <div>
//       <ion-icon name="arrow-forward" aria-hidden="true" onclick="changeNumberOfUnits('minus',${item.id})></ion-icon>
       
//           <p class="item-amount">${item.numberOfUnits}</p>
//           <ion-icon name="arrow-forward" aria-hidden="true" onclick="changeNumberOfUnits('plus',${item.id})></ion-icon>
//       </div>
//   </div>
//       `;
//   });
// }
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
