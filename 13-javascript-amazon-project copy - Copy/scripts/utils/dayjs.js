import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import {cart} from "../../data/cart-class.js"
import { calculateWeekDays } from "../../data/deliveryOptions.js";
export function formatDate(string, format) {
  let date;
  if (string === null) {
    date = dayjs()
  }
  else {
   date = dayjs(string);
  }
  const dateFormat = date.format(format);
  return dateFormat;
}

export function convertIdToDays(Id) {
  let deliveryDays = 0;
  if(Id === '1') {
    deliveryDays = 7;
  }
  if(Id === '2') {
    deliveryDays = 3;
  }
  if(Id === '3') {
    deliveryDays = 1;
  }
  return deliveryDays;
}

export function getDeliveryDays() {
  const deliveryIds = [];
  let deliveryDates = []; // before we run calculateWeekdays function
  let deliveryDatesArr = []; // this is the final array of delivery dates!
  cart.cartItems.forEach(cartItem => {
    deliveryIds.push(cartItem.deliveryOptionId);

   deliveryDates = deliveryIds.map(id => {
      const deliveryDays = convertIdToDays(id);
      return deliveryDays;
    });
  });
  
  deliveryDates.forEach(date => {
    const temp = true;
   deliveryDatesArr.push(calculateWeekDays(date, temp))
  });
  return deliveryDatesArr;
}

export function formatDates(dates) {
  const today = dayjs();
  const shippingDate = today.add(dates, 'days');;
  const shippingDateFormat = shippingDate.format('MMMM M');
  return shippingDateFormat;
}

