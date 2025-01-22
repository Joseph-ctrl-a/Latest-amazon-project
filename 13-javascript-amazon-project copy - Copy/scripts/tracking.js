    import { getProduct, loadProductsFetch } from "../data/products.js";
    import { Track } from "../data/trackingClass.js";    
    import { cart } from "../data/cart-class.js";
     async function renderTrackingPage() {
        await loadProductsFetch()
        const tracking = new Track();
        tracking.product = getProduct(tracking.productId)
        const trackingHTML = `
         <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${tracking.deliveryDate}
        </div>

        <div class="product-info">
          ${tracking.product.name}
        </div>

        <div class="product-info">
          Quantity: ${tracking.quantity}
        </div>

        <img class="product-image" src=${tracking.product.image}>

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width:${tracking.calcuateShipping()}%"></div>
        </div>
      </div>
        `
        document.querySelector('.main')
          .innerHTML = trackingHTML;

        cart.updateCartQuantity('.js-cart-quantity')
      }

      if (window.location.pathname.includes('tracking.html')) {
        renderTrackingPage();
      }
  