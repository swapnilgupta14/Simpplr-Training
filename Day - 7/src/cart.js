const cartIcon = document.getElementById("cart-click");
cartIcon.addEventListener("click", () => {
  cartPopup.classList.toggle("hidden");
  displayCartItemsAdded();
});

const cartPopup = document.getElementById("cart-popup");
const cartItemsAddedContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const cartCountElement = document.getElementById("cart-count");

let cartItemsAdded = JSON.parse(localStorage.getItem("cartItems")) || [];

const displayCartItemsAdded = () => {
  let newItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  console.log("rendered");
  cartItemsAdded = newItems;
  cartItemsAddedContainer.innerHTML = "";
  let totalPrice = 0;

  if (cartItemsAdded.length === 0) {
    cartItemsAddedContainer.innerHTML = `<p>Your cart is empty.</p>`;
    totalPriceElement.textContent = "0.00";
    return;
  }

  cartItemsAdded.forEach((item, index) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "bg-gray-100",
      "p-4",
      "rounded-md"
    );

    cartItemDiv.innerHTML = `
      <div class="flex space-x-4">
        <img src="${item.image}" alt="${
      item.title
    }" class="w-16 h-24 object-cover rounded-md">
        <div>
          <h3 class="text-lg font-semibold">${item.title}</h3>
          <p class="text-sm text-gray-600">by ${item.author}</p>
          <p class="text-sm font-bold">₹${(item.price * 90).toFixed(2)} x ${
      item.quantity
    }</p>
        </div>
      </div>

      <div class="flex flex-col items-end">
        <p class="text-lg font-bold">₹${(
          item.price *
          item.quantity *
          90
        ).toFixed(2)}</p>
        <button data-index="${index}" class="text-red-500 remove-item">Remove</button>
      </div>
    `;

    totalPrice += item.price * 90 * item.quantity;
    cartItemsAddedContainer.appendChild(cartItemDiv);
  });

  totalPriceElement.textContent = totalPrice.toFixed(2);
  updateCartCount1();

  // Attach event listeners to remove buttons
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", removeItem);
  });
};

const updateCartCount1 = () => {
  const totalItems = cartItemsAdded.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  cartCountElement.textContent = totalItems;
};

const removeItem = (event) => {
  let newCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const index = event.target.dataset.index;
  newCartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  displayCartItemsAdded();
};

const addItemToCart = (item) => {
  cartItemsAdded.push(item);
  localStorage.setItem("cartItems", JSON.stringify(cartItemsAdded));

  displayCartItemsAdded();
};

updateCartCount1();
displayCartItemsAdded();
