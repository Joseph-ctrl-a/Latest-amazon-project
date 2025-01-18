
import {formatCurrency} from "./utils/money.js"
import {getProduct, loadProductsFetch} from "../data/products.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import { orders, getDeliveryDate } from "../data/orders.js";
import { cart } from "../data/cart-class.js";

  async function renderOrders() {
    await loadProductsFetch();
    let orderHTML = '';


  orders.forEach(order => {

    const orderTimeString = dayjs(order.orderTime).format('MMMM D');
    

      function generateOrdersHTML(order) {
        let orderProductHTML = '';
        let index = 0;
        order.products.forEach(product => {

          const {productId} = product;
          const matchingProduct = getProduct(productId);
          const deliveryDate = getDeliveryDate(product)
          product.estimatedDeliveryTime = deliveryDate;
          orderProductHTML+= `
            <div class="product-image-container">
                  <img src=${matchingProduct.image}>
                </div>
    
                <div class="product-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-delivery-date">
                    Arriving on: ${product.estimatedDeliveryTime}
                  </div>
                  <div class="product-quantity">
                    Quantity: ${product.quantity}
                  </div>
                  <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message js-buy-again-message" data-product-id="${matchingProduct.id}">Buy it again</span>
                  </button>
                </div>
    
                <div class="product-actions">
                  <a href="tracking.html">
                    <button class="track-package-button button-secondary">
                      Track package
                    </button>
                  </a>
                </div>
          `
          index++;
      });
      return orderProductHTML;
      }
     
    
    


    orderHTML +=
    `
     <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTimeString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
          <div class="order-details-grid"> 
          ${generateOrdersHTML(order)}
          </div>
        </div>
        `
  });

  cart.updateCartQuantity('.js-cart-quantity')
  document.querySelector('.js-orders-grid').innerHTML = orderHTML;
  
  document.querySelectorAll('.js-buy-again-message').forEach(message => {
    message.addEventListener('click', () => {
        const {productId} = message.dataset;
        cart.addToCart(productId)
        cart.updateCartQuantity('.js-cart-quantity')
    
    });
  });

  }


  if (window.location.pathname.includes('orders.html')) {
  renderOrders();
}