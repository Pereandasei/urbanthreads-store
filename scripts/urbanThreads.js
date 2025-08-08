import { products } from "./data/products.js";
import { cart, saveToStorage } from "./data/cart.js";
import { formatPrice } from "./utility.js";


let productHTML = '';
products.forEach(product =>{
    let html = `
        <div class="card">
            <img src="${product.image}" alt="">
            <h4>${product.name}</h4>
            <p class="price">$${formatPrice(product.priceCents)}</p>
            <button class="add-to-cart" data-name="${product.name}"  data-product-id="${product.id}">Add to Cart</button>
        </div>
    `;

    productHTML += html;
});

document.querySelector('.js-grid-container').innerHTML = productHTML;

updateCartCount();
function updateCartCount() {
    let totalQuantity = 0;
    cart.forEach(cartItem => {
        totalQuantity += cartItem.quantity;
    });
    document.querySelector('.js-item-count').textContent = totalQuantity;
}

const addTocartButton = document.querySelectorAll(".add-to-cart");
addTocartButton.forEach(button =>{
    let productId = button.dataset.productId;
    button.addEventListener('click', () =>{
        let matchingItem;
        cart.forEach(cartItem =>{
            
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
         })
         if(matchingItem){
                matchingItem.quantity += 1;
        }else{
                cart.push({
                    productId: productId,
                    quantity: 1,
                    deliveryOptionId: '0'
                })
        }
        
        saveToStorage();
        updateCartCount();
    })
    
});


