import { cart, loadFromStorage, saveToStorage, removeFromCart, updateDeliveryOption} from "../../data/cart.js"


const productId1 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
const productId2 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
 function addToCart(productId) {
    let matchingItem;
  
    cart.forEach(cartItem => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += 1 //selectorValue;
    }
    else {
      cart.push({
        productId,
        quantity: 1, // selectorValue,
        deliveryOptionId: '1'
      });
    }
  
    saveToStorage();
 }
describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });
  it('adds a new item to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(        [{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '1'
    }
    ]));

  });
  it('adds an exisiting item to the cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify(
        [{
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '1'
        }, {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '2'
        }]
      );
    });
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[1].quantity).toEqual(2);
  });

  it('removes a product from the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify(
        [{
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '1'
        }, {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '2'
        }]
      );
    });
    loadFromStorage();
    removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });
  it('removes non exisiting product from the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify(
        [
       {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '2'
        }]
      );
    });
    loadFromStorage();
    removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');

    expect(cart).toEqual([
      {
         productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
         quantity: 1,
         deliveryOptionId: '2'
       }]);
  });
 
});

  describe('Test Suite: updateDeliveryOption', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
          return JSON.stringify(
            [{
              productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
              quantity: 1,
              deliveryOptionId: '1'
              }, 
            ]
          );
        });
    });
   it('updates delivery option of a product', () => {
     loadFromStorage();
     updateDeliveryOption(productId1, '2');
     expect(cart[0].deliveryOptionId).toEqual('2');
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
   });

    it('doesnt update cart if no matching id was found', () => {
      loadFromStorage();
      updateDeliveryOption(productId2, '2');
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
      expect(cart[0].deliveryOptionId).toEqual('1')
    });
    it('wont update cart if given in invalid id', () => {
      loadFromStorage();
      updateDeliveryOption(productId1, '4');
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
      expect(cart[0].deliveryOptionId).toEqual('1');
    });
  });