import { cart } from "../../data/cart-class.js";
import { getDelieveryOption } from "../../data/deliveryOptions.js";
import { addToOrder} from "../../data/orders.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0; // Total Items Price
  let shippingPriceCents = 0; //Total Shipping Price
  let totalCartQuantity = cart.calculateCartQuantity();
  cart.cartItems.forEach(cartItem => {
    // Calculating Total Cart Quantity
    // Calculating Total Items Price
    const matchingProduct = getProduct(cartItem.productId);
        productPriceCents += (cartItem.quantity * matchingProduct.priceCents);
    // Calculating Total Shippping Price
    const deliveryOption = getDelieveryOption(cartItem.deliveryOptionId, cartItem);
       shippingPriceCents += deliveryOption.priceCents;
  });
    // Total Before Tax
    
    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTax * 0.1;
    const totalCents = totalBeforeTax + taxCents
    
    const paymentSummaryHTML = `
            <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${totalCartQuantity}):</div>
          <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money js-payment-summary-money">
          $${formatCurrency(shippingPriceCents)}
          </div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money js-payment-summary-total">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order-button">
          Place your order
        </button>
    `;

    document.querySelector('.js-payment-summary')
      .innerHTML = paymentSummaryHTML;



const placeOrderButton = document.querySelector('.js-place-order-button');
    placeOrderButton
  .addEventListener('click', async () => {
    try {
      if (cart.cartItems.length >= 1) {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({cart: cart})
        });
        placeOrderButton.classList.remove('no-quantity');
        const order = await response.json();
        addToOrder(order)
        cart.cartItems = [];
        cart.saveToStorage()
        window.location.href = 'orders.html';
      }
      
    }
    catch(error) {
      console.log('Unexpected error. Please try again later');
    }
  })
  if (cart.cartItems.length <= 0) {
    placeOrderButton.classList.add('no-quantity')
  }
}
// when the function runs, WE CANNOT LOOP THROUGH AN EMPTY CART