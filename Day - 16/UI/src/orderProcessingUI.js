let orders = [
  { orderId: 101, items: ["Item1", "Item2"], timeToPrepare: 10000 },
  { orderId: 102, items: ["Item1", "Item2", "Item3"], timeToPrepare: 8000 },
  { orderId: 103, items: ["Item1", "Item2"], timeToPrepare: 7000 },
  { orderId: 104, items: ["Item1", "Item2", "Item3"], timeToPrepare: 5000 },
];

const renderOrders = () => {
  const ordersContainer = document.getElementById("orders-container");
  ordersContainer.innerHTML = ""; 

  orders.forEach((order, index) => {
    const orderDiv = document.createElement("div");
    orderDiv.classList.add("flex", "justify-between", "border", "p-4", "rounded", "bg-white");

    orderDiv.innerHTML = `
      <div>Order ID: ${order.orderId}</div>
      <div>Items: ${order.items.join(", ")}</div>
      <div>Prep Time: ${order.timeToPrepare / 1000} sec</div>
      <button class="bg-red-500 text-white p-2 rounded delete-order-btn" data-index="${index}">
        Delete
      </button>
    `;
    ordersContainer.appendChild(orderDiv);
  });

  document.querySelectorAll(".delete-order-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      orders.splice(index, 1);
      renderOrders();
    });
  });
};

document.getElementById("add-order-btn").addEventListener("click", () => {
  const orderId = document.getElementById("orderId").value;
  const items = document.getElementById("items").value.split(",");
  const timeToPrepare = parseInt(document.getElementById("timeToPrepare").value) * 1000;

  if (orderId && items && timeToPrepare) {
    orders.push({
      orderId: parseInt(orderId),
      items,
      timeToPrepare,
    });
    renderOrders();

    document.getElementById("orderId").value = "";
    document.getElementById("items").value = "";
    document.getElementById("timeToPrepare").value = "";
  }
});

const prepareCurrentOrder = (order) => {
  let delay = order.timeToPrepare;
  return new Promise((resolve) => {

    const countdownTimer = setInterval(() => {
      if (delay > 0) {
        delay -= 1000;
        document.getElementById(`timer-${order.orderId}`).textContent = `Time Left: ${delay / 1000} sec`;
      } else {
        clearInterval(countdownTimer);
      }
    }, 1000);

    setTimeout(() => {
      resolve(`Order #${order.orderId} completed!`);
    }, order.timeToPrepare);
  });
};

function* processOrders(orders) {
  const logsContainer = document.getElementById("logs-container");
  logsContainer.innerHTML += `<div>Processing orders...</div>`;
  for (let order of orders) {
    logsContainer.innerHTML += `
      <div id="log-${order.orderId}" class="p-4 border rounded bg-gray-100">
        <div>Starting Order #${order.orderId}</div>
        <div>Items: ${order.items.join(", ")}</div>
        <div>Estimated prep time: ${order.timeToPrepare / 1000} sec</div>
        <div id="timer-${order.orderId}" class="text-blue-500 font-semibold">Time Left: ${order.timeToPrepare / 1000} sec</div>
      </div>
    `;
    yield prepareCurrentOrder(order).then(result => {
      logsContainer.innerHTML += `<div class="text-green-500">${result}</div>`;
    });
  }
  logsContainer.innerHTML += `<div>All orders processed!</div>`;
}

document.getElementById("start-processing-btn").addEventListener("click", async () => {
  const logsContainer = document.getElementById("logs-container");
  logsContainer.innerHTML = ""; 
  const orderProcessor = processOrders(orders);

  for await (let result of orderProcessor) {
    console.log(result);
  }
});

renderOrders();
