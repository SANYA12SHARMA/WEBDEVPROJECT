// Menu
let menu = document.querySelector('.menu-icon');
let nav = document.querySelector('.navbar');
const cartDOM = document.querySelector(".cart");
const cartBtn = document.querySelector("#cart");
cartBtn.onclick = () => {
  cartDOM.classList.toggle('active');
  nav.classList.remove('active');
  menu.classList.remove('move');
}

const closeCartBtn = document.querySelector(".close-cart");
closeCartBtn.onclick = () => {
  cartDOM.classList.toggle('active');
}


const clearCartBtn = document.querySelector(".clear-cart");

const btnbadge = document.querySelector(".btn-badge");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".subtotal");
const cartContent = document.querySelector(".cart-content");

// Function to open the cart and disable scrolling
// function openCart() {
//     cat.style.display = 'block';
//     document.body.style.overflow = 'hidden'; // Disable scrolling
// }

// // // Function to close the cart and re-enable scrolling
// function closeCart() {
//     cat.style.display = 'none';
//     document.body.style.overflow = 'auto'; // Re-enable scrolling
// }

// // Attach event listeners for user interactions
// document.getElementById('.cart').addEventListener('click', openCart);
//  document.getElementById('close').addEventListener('click', closeCart);
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
let cart = JSON.parse(localStorage.getItem('cart')) || [];

//buttons
let buttonsDOM = [];
//getting Products 
class Products {
  async getProducts() {
    try {
      let result = await fetch('products.json');
      let data = await result.json();
      let products = data.items;
      products = products.map(item => {
        const { itembelong, name, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { itembelong, name, price, id, image };
      });
      return products;
    }
    catch (error) {
      console.log(error);
    }
  }
};

//Display Products
class UI {
  displayProducts(products) {
    let result = '';
    products.forEach(item => {
      result += `
            <li class="${item.itembelong}">
            <div class="product-card">
              <a class="card-banner img-holder has-before" style="--width: 300; --height: 300;">
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
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".card-action-btn")];
    buttonsDOM = buttons;
    buttons.forEach(button => {
      let id = button.dataset.id;
      let inCart = cart.find(item => item.id === id);
      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      }
      button.addEventListener('click', (event) => {
        event.target.innerText = "In Cart";
        event.target.disabled = true;
        //get product from products
        let cartItem = { ...Storage.getProduct(id), amount: 1 };

        //add product to the cart
        cart = [...cart, cartItem];

        //save cart in Local Storage
        Storage.saveCart(cart);
        this.setCartValues(cart);
        this.addCartItems(cartItem);
        
      
      })
    });

  }
  
  addCartItems(item){
    cartItems.innerHTML +=`<div class="cart-box">
    <img src="${item.image}" alt="">
        <div class="cart-text">
            <h3>${item.name}</h3>
            <span>${item.price}</span><span class="remove" data-id=${item.id}><ion-icon name="trash"></ion-icon></span>
        </div>
        <div>
        <span class="up" data-id=${item.id}><ion-icon name="add" ></ion-icon></span>
         
            <p class="item-amount">${item.amount}</p>
            <span class="down" data-id=${item.id}><ion-icon name="remove" ></ion-icon></span>
        </div>
        </div>
    `;
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    })
    btnbadge.innerText = itemsTotal;
    cartTotal.innerHTML = `Your Total( ${itemsTotal} items): $ ${tempTotal.toFixed(2)}`;
  }
  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populate(cart);

  }
  populate(cart) {
    cartItems.innerHTML="";
    cart.forEach((item) => this.addCartItems(item));

  };
  cartLogic() {
    //clear cart button
    clearCartBtn.addEventListener('click', () => {
      this.clearCart();
    })
    //cart functionality
    cartItems.addEventListener('click',(event) =>{
      if(event.target.classList.contains('remove')){
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cartItems.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      }else if(event.target.classList.contains('up')){
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount += 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerText = tempItem.amount;
        
      }else if(event.target.classList.contains('down')){
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount -= 1;
        if(tempItem.amount > 0){
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        }else{
          cartItems.removeChild(lowerAmount.parentElement.parentElement);
          this.removeItem(id);
        }
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.Eleme.innerText = tempItem.amount;
      }
    })
  }
  clearCart() {
    let cartItm = cart.map(item => item.id);
    cartItm.forEach(id => this.removeItem(id));
    console.log(cartItems.children);
    while(cartItems.children.length>0){
      cartItems.removeChild(cartItems.children[0]);
    }
    clearCartBtn.onclick = () =>{
      cartDOM.classList.toggle('active');
    }
    

  }
  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled=false;
    button.innerHTML=`<ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon>`;
  }
  getSingleButton(id){
    return buttonsDOM.find(button => button.dataset.id===id);
  }
};

//Local Storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    return products.find(product => product.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  //setup app
  ui.setupAPP();

  //get all products
  products.getProducts().then(products => {
    ui.displayProducts(products);
    Storage.saveProducts(products);//static method
  }).then(() => {
    ui.getBagButtons();
    //cart logic
    ui.cartLogic();
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
