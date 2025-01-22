import { cart } from '../../data/cart-class.js';
import { getProduct} from "../../data/products.js"
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDelieveryOption, calcuateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';
let cartSummaryHTML = ''


  export  function renderOrderSummary() {
    renderCheckoutHeader();
    cartSummaryHTML= ''
    cart.cartItems.forEach(cartItem => {
    const {productId} = cartItem;
      const {deliveryOptionId} = cartItem
      const matchingProduct = getProduct(productId);
      let deliveryOption = getDelieveryOption(deliveryOptionId, cartItem);
    

    
      const dateString = calcuateDeliveryDate(deliveryOption);
        //view
      cartSummaryHTML += `        
              <div class=" not-editing cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date js-delivery-${matchingProduct.id}">
                  Delivery date: ${dateString}
                </div>
    
                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProduct.image}">
    
                  <div class="cart-item-detail">
                    <div class="product-name js-product-name-${matchingProduct.id}">
                      ${matchingProduct.name}
                    </div>
                    <div class="product-price js-product-price">
                        ${matchingProduct.getPrice()}
                    </div>
                    <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                      <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                      </span>
                      <span data-div-id= "${matchingProduct.id}" class="update-quantity-link link-primary js-update-quantity-link">
                        Update
                      </span>
                      <input data-product-id="${matchingProduct.id}"class="quantity-link quantity-input  js-quantity-input js-quantity-${matchingProduct.id}">
                      <span data-product-id="${matchingProduct.id}" class="save-quantity-link js-save-quantity-link link-primary quantity-input">Save</span>
                      <span class="delete-quantity-link  js-delete-link link-primary js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}"> 
                        Delete
                      </span>
                    </div>
                    <div class="invalid-quantity js-invalid-quantity-${matchingProduct.id}">
                 
                    </div>
                  </div>
    
                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                  </div>
                </div>
              </div>
              `
    });
    
    
    function deliveryOptionsHTML(matchingProduct, cartItem) {
      let html = ''
        deliveryOptions.forEach(deliveryOption => {
         const dateString = calcuateDeliveryDate(deliveryOption);
    
          const priceString = deliveryOption.priceCents 
          === 0 
          ? 'FREE'
          :
          `$${formatCurrency(deliveryOption.priceCents)} -`;
      
          const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
          html+= ` 
                  <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
                  data-product-id="${matchingProduct.id}"
                  data-delivery-option-id="${deliveryOption.id}"
                  >
                      <input 
                        ${isChecked ? 'checked': ''}
                        type="radio"
                        class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
                        name="${matchingProduct.id}">
                      <div>
                        <div class="delivery-option-date">
                          ${dateString}
                        </div>
                        <div class="delivery-option-price">
                          ${priceString} Shipping
                        </div>
                      </div>
                  </div>
                    `
        });
        return html
    }
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
    
    

    //Controllers
    document.querySelectorAll('.js-delete-link')
      .forEach((link) => {
        link.addEventListener('click', () => {
          const { productId } = link.dataset;
          cart.removeFromCart(productId);
          renderCheckoutHeader();
          renderOrderSummary();
          renderPaymentSummary();
        })
      });
    
    document.querySelectorAll('.js-update-quantity-link')
      .forEach(link => {
        link.addEventListener('click', () => {
          const { divId } = link.dataset;
          const itemContainer = (document.querySelector(`.js-cart-item-container-${divId}`))
          itemContainer.classList.add('is-editing-quantity');
          itemContainer.classList.remove('not-editing');
          renderPaymentSummary();
        })
      });
    
    document.querySelectorAll('.js-save-quantity-link')
      .forEach(saveLink => {
        saveLink.addEventListener('click', () => {
          const { productId } = saveLink.dataset;
          document.querySelector(`.js-cart-item-container-${productId}`)
            .classList.remove('is-editing-quantity');
          document.querySelector(`.js-cart-item-container-${productId}`)
            .classList.add('not-editing');
          cart.updateQuantity(productId);
          renderPaymentSummary();
          renderCheckoutHeader();
        })
      })
    
    
    document.querySelectorAll(`.js-quantity-input`)
      .forEach(saveLink => {
        const { productId } = saveLink.dataset;
        saveLink.addEventListener('keydown', event => {
          if (event.key === 'Enter') {
            cart.cartItems.forEach(cartItem => {
              if (cartItem.productId === productId) {
                cart.updateQuantity(productId);
                document.querySelector(`.js-cart-item-container-${productId}`)
                  .classList.remove('is-editing-quantity');
                document.querySelector(`.js-cart-item-container-${productId}`)
                  .classList.add('not-editing');
              }
            })
          }
          renderPaymentSummary();
          renderCheckoutHeader();
        })
      });
    
    document.querySelectorAll('.js-delivery-option')
      .forEach(option => {
        option.addEventListener('click', () => {
          const {productId, deliveryOptionId } = option.dataset
            
          cart.updateDeliveryOption(productId, deliveryOptionId);
          renderOrderSummary();
          renderPaymentSummary();
        });
      });



    if (cart.cartItems < 1) {
      document.querySelector('.js-order-summary').innerHTML =
        `
        <div class="empty-cart">
        <p class="test">Your amazon cart is empty</p>
        <button class="buy-items button-primary js-buy-items">Buy Items</button>
        </div>
        `;

        document.querySelector('.js-buy-items')
        .addEventListener('click', () => {
          window.location.href = 'amazon.html'
        });
    }

  }





