import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"


export function getDelieveryOption(deliveryOptionId) {
  let deliveryOption;
    deliveryOptions.forEach(option => {
        if (deliveryOptionId === option.id) {
          deliveryOption = option;
        }
      });
      return deliveryOption || deliveryOptions[0];
}

export function calcuateDeliveryDate(deliveryOption) {
  const deliveryDays = deliveryOption.deliveryDays;
        const dateString = calculateWeekDays(deliveryDays);
            return dateString;
}

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0,
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];
 

export function calculateWeekDays(deliveryDays, arr = false) { 
  let i = 1;
  let weekendCounter = 0;
  const today = dayjs();
  while(i <= deliveryDays + weekendCounter) {

    const currentDay = today.add(i, 'days');
    const currentDayFormat = currentDay.format('dddd');

       if(currentDayFormat === 'Saturday' || currentDayFormat === 'Sunday') {
        weekendCounter++; 
      }

    i++;
  }
  const deliveryTime = weekendCounter + deliveryDays;
  const deliveryDate = today.add(deliveryTime, 'days');
  const dateString = deliveryDate.format('dddd, MMMM, D');
  if (arr) {
    return deliveryTime;
  }
  return dateString;
}



