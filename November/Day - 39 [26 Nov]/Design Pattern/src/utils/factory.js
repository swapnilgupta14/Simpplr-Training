export function vehicleFactory(type) {
  return {
    type,
    wheels: type === "Car" ? 4 : type === "Bike" ? 2 : type === "Truck" ? 6 : 0,
    engine:
      type === "Car"
        ? "V8"
        : type === "Bike"
        ? "Single Cylinder"
        : type === "Truck"
        ? "Diesel"
        : "None",
    describe() {
      return `This is a ${type} with ${this.wheels} wheels and a ${this.engine} engine.`;
    },
  };
}
