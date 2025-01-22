//This is the controller (cart)
// Global Variables
export let cart;

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
  cart = [{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}
}

// Functions

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let selectorValue = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
  let matchingItem;

  cart.forEach(cartItem => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity +=  selectorValue;
  }
  else {
    cart.push({
      productId,
      quantity: selectorValue,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach(cartItem => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    }
  });
  cart = newCart;


  saveToStorage();
}

export function updateCartQuantity(className) {
  let cartQuantity = 0;
  let totalCartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity
    totalCartQuantity += cartQuantity;
  });
  if (className === '.js-cart-quantity') {
    document.querySelector(className)
      .innerHTML = cartQuantity;
  }
 
  saveToStorage();

}

export function updateQuantity(productId) {
  let inputValue = document.querySelector(`.js-quantity-${productId}`).value
  let cartQuantity = 0
  cart.forEach(cartItem => {
    if (cartItem.productId === productId) {
      if (Number(inputValue) >= 100) { //To check for input Quantity
        document.querySelector(`.js-invalid-quantity-${productId}`)
          .innerHTML = 'Quantity is too large!'
        setTimeout(() => {
          document.querySelector(`.js-invalid-quantity-${productId}`)
            .innerHTML = ''
        }, 1200);
      }
      else if (Number(inputValue) <= 0) { //To check for input Quantity
        document.querySelector(`.js-invalid-quantity-${productId}`)
          .innerHTML = 'Invalid Quantity'
        setTimeout(() => {
          document.querySelector(`.js-invalid-quantity-${productId}`)
            .innerHTML = ''
        }, 1200);
      }
      else {
        cartItem.quantity = Number(inputValue);
      }


      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = cartItem.quantity;

    }

    cartQuantity += cartItem.quantity;
  })



  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach(cartItem => {
    if (productId === cartItem.productId) {
      if(deliveryOptionId >= 1 && deliveryOptionId <= 3) {
        matchingItem = cartItem;
        matchingItem.deliveryOptionId = deliveryOptionId;
        saveToStorage();
      }
    }
  else {
      return;
    }
  });
}         



  export function calculateCartQuantity() {
    let cartTotal = 0;
    cart.forEach(cartItem => {
      cartTotal += cartItem.quantity;
    });
    return cartTotal;
  }


  loadFromStorage();
  