import React from "react";

const PrototypeDemo = () => {

  const carPrototype = {
    startEngine: function () {
      console.log("Engine started..." + `${this.model}`);
    },
    stopEngine: function () {
      console.log("Engine stopped." + `${this.model}`);
    },
  };

  function Car(make, model) {
    const car = Object.create(carPrototype);
    car.make = make;
    car.model = model;
    return car;
  }

  const car1 = Car("A", "Swift");
  const car2 = Car("B", "Alto");

  console.log(car1.make);
  console.log(car1.model);
  console.log(car2.make);
  console.log(car2.model);

  car1.startEngine();
  car2.stopEngine();

  return <div>Prototype Pattern Demo</div>;
};

export default PrototypeDemo;
