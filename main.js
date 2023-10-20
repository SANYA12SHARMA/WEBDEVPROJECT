// Menu
let menu = document.querySelector('.menu-icon');
let nav = document.querySelector('.navbar');

menu.onclick = () => {
    nav.classList.toggle('active');
    menu.classList.toggle('move');
    cart.classList.remove('active');
    login.classList.remove('active');
}


//SELECT ELEMENTS
const productsEl = document.querySelector(".products-content");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const popularEl=document.querySelector(".popular-content");
//render popular
function renderPopular(){
    popular.forEach((item)=>{
        popularEl.innerHTML+=`
        <div class="box">
                <img src="${item.imgSrc}" alt="">
                <div class="box-text">
                    <div class="title-price">
                        <h3>${item.name}</h3>
                        <span>${item.price}</span>
                    </div>
                    <a href="#"><i class='bx bx-cart-alt'></i></a>
                </div>
            </div>
        `;
    });
};
renderPopular();
//RENDER PRODUCTS
function renderProducts(){
    products.forEach((product)=>{
       productsEl.innerHTML+=`
       <div class="box">
       <img src="${product.imgSrc}" alt="">
       <div class="box-text">
           <div class="title-price">
               <h3>${product.name}</h3>
               <span>${product.price}</span>
           </div>
           <div onclick="addToCart(${product.id})"><i class='bx bx-cart-alt'></i></div>
       </div>
      </div>
       `;
    });
}
renderProducts();
//cart array
let cartt=JSON.parse(localStorage.getItem("CART")) || [];
updateCart();
//ADD TO CART
function addToCart(id){
    //check if product already exist in cart
    if(cartt.some((item) => item.id === id)){
        changeNumberOfUnits("plus",id);
    }else{
        const item = products.find((product) => product.id === id);
        cartt.push({
            ...item,    numberOfUnits:1
        }); 
    }
    updateCart();
}
function updateCart(){
    renderCartItems();
    renderSubTotal();

    //save cart to local storage
    localStorage.setItem("CART",JSON.stringify(cartt));
}
function renderSubTotal(){
    let totalPrice = 0,
    totalItems = 0;

  cartt.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });
  subtotalEl.innerHTML = ` Your Total( ${totalItems} items): $ ${totalPrice.toFixed(2)}`;
}
function renderCartItems(){
    cartItemsEl.innerHTML=""//clear cart element
    cartt.forEach((item)=>{
        cartItemsEl.innerHTML+=`
        <div class="cart-box">
        <img src="${item.imgSrc}" alt="${item.name}">
        <div class="cart-text">
            <h3>${item.name}</h3>
            <span>${item.price}</span><span><i class='bx bx-trash' onclick=" removeItemFromCart(${item.id})"></i></span>
        </div>
        <div>
            <i class="bx bx-chevron-up" onclick="changeNumberOfUnits('minus',${item.id})"></i>
            <p class="item-amount">${item.numberOfUnits}</p>
            <i class="bx bx-chevron-down" onclick="changeNumberOfUnits('plus',${item.id})"></i>
        </div>
    </div>
        `;
    });
}

//change number of units
function changeNumberOfUnits(action,id){
    cartt=cartt.map((item)=>{
        let numberOfUnits = item.numberOfUnits;
        if (item.id === id) {
            if (action === "minus" && numberOfUnits > 1) {
              numberOfUnits--;
            } else if (action === "plus") {
              numberOfUnits++;
            }
          }
          return {
            ...item,
            numberOfUnits,
          };
    });
    updateCart();
}


//remove item from cart
function removeItemFromCart(id){
    cartt=cartt.filter((item) => item.id !==id );
    updateCart();
}
//Cart Toggle
let cart=document.querySelector('.cart');
document.querySelector('#cart-icon').onclick = () =>{
    cart.classList.toggle('active');
    nav.classList.remove('active');
    menu.classList.remove('move');
    login.classList.remove('active');
}
 
//Login Form Toggle
let login=document.querySelector('.login-form');
document.querySelector('#user-icon').onclick = () =>{
    login.classList.toggle('active');
    cart.classList.remove('active');
    nav.classList.remove('active');
    menu.classList.remove('move');
}
//On Click On Menu Links Removed Menu
window.onscroll = () =>{
    nav.classList.remove('active');
    menu.classList.remove('move');
}
// Change Header Background and Shadow on Scroll 
let header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});
// Scroll Top
let scrolltop = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    scrolltop.classList.toggle('active', window.scrollY > 0);
});

