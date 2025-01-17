
import {convertIdToDays} from "../scripts/utils/dayjs.js"
import {calculateWeekDays} from "./deliveryOptions.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import {cart} from "./cart-class.js";

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
  return deliveryDate;
}



function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}
  


 