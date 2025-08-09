import { products } from "./data/products.js";
import { cart, deleteItem, saveToStorage} from "./data/cart.js";
import { formatPrice } from "./utility.js";
import { deliveryOption } from "./data/delivery-option.js";

// loadCartCount();

renderOrderSummary();
// order summery
function renderOrderSummary(){
    let carthtml = '';
    cart.forEach( cartItem =>{
        let matchingproduct;
        products.forEach(product =>{
            if(product.id === cartItem.productId){
                matchingproduct = product;
            }
        });
        let matchingOption;
        deliveryOption.forEach(option =>{
            if(cartItem.deliveryOptionId === option.deliveryOptionId){
                matchingOption = option;
            }
        })

        const today = dayjs();
        const deliveryDate = today.add(matchingOption.days, 'day');

        const formattedDeliveryDate = deliveryDate.format('dddd, MMMM D');

        

        let html = `
            <div class="item-box js-item-box">
            <div class="delivery-date">Delivery date: ${formattedDeliveryDate}</div>
            <div class="item-row">
            <img src="${matchingproduct.image}">
            <div class="item-details">
                <h3>${matchingproduct.name}</h3>
                <div class="item-price">${formatPrice(matchingproduct.priceCents)}</div>
                <p>Quantity: ${cartItem.quantity} 
                <span data-product-id="${cartItem.productId}" class="link">Delete</span>
                </p>
            </div>
            </div>
            <div class="delivery-options">
            ${updateDeliveryOption(cartItem, matchingproduct)}
            </div>
        </div>
        `;

        carthtml += html;
    })

    document.querySelector('.item-container').innerHTML = carthtml;

    const deleteLink = document.querySelectorAll('.link');
    deleteLink.forEach(link =>{
        link.addEventListener('click', () =>{
            let productId = link.dataset.productId;
            deleteItem(productId);
            renderOrderSummary();
            paymentSummary();
            saveToStorage();

        })
    })

    function updateDeliveryOption(cartItem, matchingproduct){
        let html = '';
        deliveryOption.forEach( option =>{
        
            const today = dayjs();
            const deliveryDate = today.add(option.days, 'day');

            const formattedDeliveryDate = deliveryDate.format('dddd, MMMM D');
            let deliveryPrice = option.priceCents === 0 ? 'FREE' : `$${formatPrice(option.priceCents)}`;
            let isChecked = option.deliveryOptionId === cartItem.deliveryOptionId ;


        html += `
                <label><input data-product-id="${matchingproduct.id}" class="js-delivery-option" data-delivery-option-id="${option.deliveryOptionId}" type="radio" name="ship-${cartItem.productId}" ${isChecked ? 'checked' : ''}> ${formattedDeliveryDate} - ${deliveryPrice} Shipping</label>
            `;
        })
        return html;
    }

    document.querySelectorAll('.js-delivery-option').forEach( optionLink =>{
        let deliveryOptionId = optionLink.dataset.deliveryOptionId;
        let productId = optionLink.dataset.productId;
        optionLink.addEventListener('click', ()=>{
            let matchingItem;
            cart.forEach( cartItem =>{
                if(cartItem.productId === productId){
                    matchingItem = cartItem;
                }
            })
            if(matchingItem){
                matchingItem.deliveryOptionId = deliveryOptionId;
            }
            renderOrderSummary()
            paymentSummary()
            saveToStorage();
        })
    })
}

// payment summary
function paymentSummary(){
    let pricetotal = 0;
    let deliveryfee = 0;
    let html = '';
    cart.forEach(cartItem =>{
        let matchingItem;
        products.forEach(product =>{
            if(product.id === cartItem.productId){
                matchingItem = product;
            }
        })
        if(matchingItem){
            pricetotal += matchingItem.priceCents * cartItem.quantity;
        }

        let matchingOption;
        deliveryOption.forEach( option =>{
            if(option.deliveryOptionId === cartItem.deliveryOptionId){
                matchingOption = option;
            }
        })
        if(matchingOption){
            deliveryfee += matchingOption.priceCents;
        }

    })

    let totalQauntity = 0;
        
    cart.forEach(cartItem =>{
        totalQauntity += cartItem.quantity;
    })

    let totalCostBeforeTax = pricetotal + deliveryfee;
    let tax = totalCostBeforeTax * 0.1
    let totalAfterTax = totalCostBeforeTax + tax;
    html =`
        <h2>Order Summary</h2>
        <div class="summary-row">
            <span>Items (${totalQauntity}):</span>
            <span>$${formatPrice(totalCostBeforeTax)}</span>
        </div>
        <div class="summary-row">
            <span>Shipping & handling:</span>
            <span>$${formatPrice(deliveryfee)}</span>
        </div>
        <div class="summary-row">
            <span>Total before tax:</span>
            <span>$${formatPrice(totalCostBeforeTax)}</span>
        </div>
        <div class="summary-row">
            <span>Estimated tax (10%):</span>
            <span>$${formatPrice(tax)}</span>
        </div>
        <div class="summary-row total">
            <span>Order total:</span>
            <span>$${formatPrice(totalAfterTax)}</span>
        </div>
        <button class="order-button">Place your order</button>

    `;
    document.querySelector('.js-summary').innerHTML = html;
}
paymentSummary();
// console.log(paymentSummary());





