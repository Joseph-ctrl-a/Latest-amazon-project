import { getOrderQuantityAndDate} from "./orders.js";
export class Track {

  orderId;
  productId;
  quantity;
  deliveryDate;
  product;
  shippingData;
  constructor() {
    const ids = this.getIds()
    this.orderId = ids.orderId;
    this.productId = ids.productId;

    this.arr = getOrderQuantityAndDate(this.orderId, this.productId);
    this.shippingData = this.arr;
     this.quantity = this.arr[0];
     this.deliveryDate = this.arr[1].deliveryDate;
  }

  getIds() {
      const url = new URL(window.location.href);
       return {
        orderId: url.searchParams.get('orderId'),
        productId: url.searchParams.get('productId')
      };
  }
  calcuateShipping() {
    const today = this.shippingData[1].todayNum; 
    const shippingDate = this.shippingData[1].deliveryDayNum; 
    const orderPlacedDate = this.shippingData[2];
    const daysCount = shippingDate - orderPlacedDate;
    const deliveryDays = shippingDate - today
    const widthPercentage = (100 - (deliveryDays / daysCount) * 100);
    return widthPercentage;

  }
}