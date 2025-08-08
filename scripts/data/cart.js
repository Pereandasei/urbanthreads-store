export let cart = JSON.parse(localStorage.getItem('urbanThread')) || [];

export function saveToStorage(){
    localStorage.setItem('urbanThread', JSON.stringify(cart));
}

export function deleteItem(productId){
    cart = cart.filter(cartItem => cartItem.productId !== productId);
    document.querySelector('.js-item-box').remove();
    saveToStorage();
}