class Car {
  #brand;
  #model;
  speed = 0;
  accleration = 0;
  isTrunkOpen = false;
  constructor(carType) {
    this.brand = carType.brand;
    this.model = carType.model;
  }

  displayInfo() {
    console.log(this.speed);
    console.log(this.isTrunkOpen);
    console.log(this.accleration)
  }

  go() {
    if (this.speed < 200) {
      this.speed+= 5;
    }
  }

  brake() {
    if (this.speed > 0) {
      this.speed -= 5;
    }
  }
  emergencyBreak() {
    this.speed = 0;
  }
  openTrunk() {
    if (!this.speed) {
      this.isTrunkOpen = true;
    }
  }
  closeTrunk() {
    if (this.speed) {
      this.isTrunkOpen = false;
    }
  }
}


  class RaceCar extends Car {
    constructor(carType) {
      super(carType);
      this.accleration = carType.accleration;
    }
    go() {
      if (this.speed < 300) {
        this.speed += this.accleration;
      }
    }
  }
const toyota = new Car(
  {
    brand: 'toyota',
    model: 'Corolla',
  }
);
const tesla = new Car(
  {
    brand: 'Tesla',
    model: 'Model 3'
  }
);

const McLaren = new RaceCar(
  {
    brand: 'McLaren',
    model: 'F1',
    accleration: 20
  }
);


McLaren.displayInfo();