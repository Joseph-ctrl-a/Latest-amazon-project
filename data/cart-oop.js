//This is the controller (cart)
// Global Variables

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(`${localStorageKey}`));
      if (!this.cartItems) {
          this.cartItems = [{
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 2,
          deliveryOptionId: '1'
      }, {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '2'
        }];
    }
    },

   saveToStorage() {
      localStorage.setItem(`${localStorageKey}`, JSON.stringify(this.cartItems));
    },
    
   addToCart(productId) {
    let selectorValue = 1
    if (document.querySelector(`.js-quantity-selector-${productId}`)) {
      selectorValue = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    }
      
      let matchingItem;
    
      this.cartItems.forEach(cartItem => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      if (matchingItem) {
        matchingItem.quantity +=  selectorValue;
      }
      else {
        this.cartItems.push({
          productId,
          quantity: selectorValue,
          deliveryOptionId: '1'
        });
      }
    
      this.saveToStorage();
    },

  removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach(cartItem => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem)
        }
      });
      this.cartItems = newCart;
    
    
      this.saveToStorage();
    },

  updateCartQuantity(className) {
      let cartQuantity = 0;
      let totalCartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity
        totalCartQuantity += cartQuantity;
      });
      if (className === '.js-cart-quantity') {
        document.querySelector('.js-cart-quantity')
          .innerHTML = cartQuantity;
      }
     
      this.saveToStorage();
    
    },

  updateQuantity(productId) {
      let inputValue = document.querySelector(`.js-quantity-${productId}`).value
      let cartQuantity = 0
      this.cartItems.forEach(cartItem => {
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
    
    
    
      this.saveToStorage();
    },

  updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
      this.cartItems.forEach(cartItem => {
        if (productId === cartItem.productId) {
          if(deliveryOptionId >= 1 && deliveryOptionId <= 3) {
            matchingItem = cartItem;
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
          }
        }
      else {
          return;
        }
      });
    },
    
    calculateCartQuantity() {
      let cartTotal = 0;
      this.cartItems.forEach(cartItem => {
        cartTotal += cartItem.quantity;
      });
      return cartTotal;
    }
  };

  return cart;
}



  const cart = Cart('cart-oop');
  const businessCart = Cart('cart-business');



  cart.loadFromStorage();
  businessCart.loadFromStorage();

  console.log(cart);
  console.log(businessCart);