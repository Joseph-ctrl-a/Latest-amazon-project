
import {calculateWeekDays} from "./deliveryOptions.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
 export const orders = JSON.parse(localStorage.getItem('orders')) || [];


export function addToOrder(order) {
 orders.unshift(order);
  saveToStorage();

}

export function getDeliveryDate(product) {
  const tempDayNum = Number(dayjs(product.estimatedDeliveryTime).format('D'));
  const todayNum = Number(dayjs().format('D'));
  const tempDeliveryDays = tempDayNum - todayNum;
  const deliveryDays = calculateWeekDays(tempDeliveryDays, true);
  const today = dayjs();
  const deliveryDate = today.add(deliveryDays, 'days').format('MMMM D');
  
  const deliveryDayNum = Number(today.add(deliveryDays, 'days').format('D'))
  return {
    deliveryDayNum,
    todayNum,
    deliveryDate,
  };

}



function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}
  
export function getOrderQuantityAndDate(orderId, productId) {
  let order;
  let arr = [];
  orders.forEach(orders => {
    if (orders.id === orderId) {
      order = orders;
      
    }
  });
  order.products.forEach(product => {
    if (product.productId === productId) {
      arr.push(product.quantity);
      arr.push(getDeliveryDate(product, false));
      arr.push(Number(dayjs(order.orderTime).format('D')))
    }
  })
  return arr;
}

 