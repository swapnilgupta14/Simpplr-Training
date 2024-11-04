console.log("=== Restaurant Order Processing System ===\n");

const orders = [
  { orderId: 101, items: ["Item1", "Item2"], timeToPrepare: 4000 },
  { orderId: 102, items: ["Item1", "Item2", "Item3"], timeToPrepare: 8000 },
  { orderId: 103, items: ["Item1", "Item2"], timeToPrepare: 7000 },
  {
    orderId: 104,
    items: ["Item1", "Item2", "Item3"],
    timeToPrepare: 5000,
  },
];

const prepareCurrentOrder = (order)  => {
  let delay = order.timeToPrepare;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Order #${order.orderId} completed!`);
    }, delay);
  });
}

function* processOrders(orders) {
  console.log("processing orders...\n");
  console.log("------------------------\n");
  

  for (let order of orders) {
    console.log(`Starting Order #${order.orderId}`);
    console.log(`Items to prepare are: ${order.items.join(", ")}`);
    console.log(
      `Estimated preparation time: wait for ${order.timeToPrepare / 1000} seconds`
    );
    yield prepareCurrentOrder(order);
    console.log(`Order #${order.orderId} is ready!`);
    console.log("------------------------\n");
  }

  console.log("All orders have been processed!");
}


const startProcessingOrders = async() => {
  const orderProcessor = processOrders(orders);
  // console.log(orderProcessor);
  for await (let result of orderProcessor) {
    console.log("Completed: ", result);
  }
}

startProcessingOrders();