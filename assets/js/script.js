// Menu
let menu = document.querySelector('.menu-icon');
let nav = document.querySelector('.navbar');
menu.onclick = () => {
  nav.classList.toggle('active');
  menu.classList.toggle('move');
}
const cartDOM = document.querySelector(".cart");
const cartBtn = document.querySelector("#cart-btn");
cartBtn.onclick = () => {
  cartDOM.classList.toggle('active');
  document.body.style.overflow = "hidden";
}
const closeCartBtn = document.querySelector(".close-cart");
closeCartBtn.onclick = () => {
  cartDOM.classList.toggle('active');
  document.body.style.overflow = "auto";
}
const clearCartBtn = document.querySelector(".clear-cart");
const btnbadge = document.querySelector(".btn-badge");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".subtotal");
const cartContent = document.querySelector(".cart-content");
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
//buttons
let buttonsDOM = [];
//getting Products 
class Products {
  async getProducts() {
    try {
      let result = await fetch('products.json');
      let products = await result.json();
      products = products.map(item => {
        const { itembelong, name, price, id, image } = item;
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
    ProductsDOM.innerHTML = '';
    products.forEach(item => {
      ProductsDOM.innerHTML += `
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
  addCartItems(item) {
    cartItems.innerHTML += `<div class="cart-box">
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
    cartItems.innerHTML = "";
    if (cart.length == 0) {
      this.clearCart();
      document.body.style = "overflow:auto";
    }
    cart.forEach((item) => this.addCartItems(item));
  };
  cartLogic() {
    //clear cart button
    clearCartBtn.onclick = () => {
      this.clearCart();
    }
    //cart functionality
    cartItems.onclick = (event) => {
      const { target } = event; // Destructure the event object(event.target)
      const { classList, dataset } = target; // Destructure the classList and dataset properties
      const id = dataset.id;
      if (classList.contains("remove")) {
        this.removeItem(id);
      } else if (classList.contains("up")) {
        const { nextElementSibling } = target;
        const tempItem = cart.find((item) => item.id === id);
        tempItem.amount += 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        nextElementSibling.innerText = tempItem.amount;
      } else if (classList.contains("down")) {
        const { previousElementSibling } = target;
        const tempItem = cart.find((item) => item.id === id);
        tempItem.amount -= 1;
        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          previousElementSibling.innerText = tempItem.amount;
        } else {
          const { parentElement } = target;
          cartItems.removeChild(parentElement.parentElement);
          this.removeItem(id);
        }
        Storage.saveCart(cart);
        this.setCartValues(cart);
      }
    }
  }
  clearCart() {
    let cartItm = cart.map(item => item.id);
    cartItm.forEach(id => this.removeItem(id));
    cartDOM.classList.remove('active');
    document.body.style = "overflow:auto";
    clearCartBtn.onclick = () => {
      this.clearCart();
    }

  }
  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    if (cart.length == 0) {
      cartDOM.classList.toggle('active');
      document.body.style.overflow = "auto";
    }
    this.setCartValues(cart);
    this.populate(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `<ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon>`;
  }
  getSingleButton(id) {
    return buttonsDOM.find(button => button.dataset.id === id);
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
window.onscroll = showElemOnScroll;

/** * product filter */
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterBox = document.querySelector("[data-filter]");
let lastClickedFilterBtn = filterBtns[0];
const filter = function () {
  lastClickedFilterBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedFilterBtn = this;
  filterBox.setAttribute("data-filter", this.dataset.filterBtn)
}
filterBtns.forEach((btn) => {
  btn.onclick = filter;
});
