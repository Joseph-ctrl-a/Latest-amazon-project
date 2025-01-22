import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch} from "../data/products.js";
import { loadCart } from "../data/cart-class.js";

  async function loadPage() {
    try {
     // throw 'error1';
      await loadProductsFetch();
      loadCart();
    }
    catch (error) {
      console.log('Unexpected error. Please try again later');
      console.log(error);
    }
    renderOrderSummary();
    renderPaymentSummary();
  }
  
  loadPage()


