// import { displayCartItemsAdded } from './cart';

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
});

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
console.log(cartItems);

const saveCartToLocalStorage = () => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const displayBooks = () => {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  books.forEach((book) => {
    const existingCartItem = cartItems.find((item) => item.id === book.id);
    const quantity = existingCartItem ? existingCartItem.quantity : 0;

    const bookItem = document.createElement("div");
    bookItem.classList.add(
      "relative",
      "bg-white",
      "p-2",
      "shadow-xl",
      "rounded-xl"
    );

    bookItem.innerHTML = `
            <div class="relative">
                <img src="${book.image}" alt="${
      book.title
    }" class="w-full h-64 object-cover mb-4 rounded-t-xl">
                ${
                  quantity > 0
                    ? `<div class="absolute top-0 right-0 bg-amber-950 text-white text-xs px-2 py-1 rounded-bl-lg z-10">
                         ${quantity} added
                       </div>`
                    : ""
                }
            </div>
            <div class="flex justify-between px-5">
                <div class="flex flex-col justify-between">
                    <h3 class="text-lg font-semibold">${book.title}</h3>
                    <p class="text-gray-600">by ${book.author}</p>
                </div>
                <p class="text-amber-950 text-2xl font-bold">₹${(book.price * 90).toFixed(
                  2
                )}</p>
            </div>
           <div class="flex justify-between items-center">
                <button class="add-to-cart bg-amber-950 hover:bg-amber-900 text-white font-semibold py-2 px-4 rounded mt-6 flex-grow text-sm" data-id="${
                  book.id
                }">
                    Add to Cart
                </button>
                <button class="add-to-wishlist bg-amber-950 hover:bg-amber-900 text-white font-semibold py-2 px-4 rounded mt-6 w-[15%] flex items-center justify-center ml-2 text-xl">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656l-6.828 6.828a.5.5 0 01-.707 0L3.172 10.828a4 4 0 010-5.656z" />
        </svg>
                </button>
            </div>
          `;

    bookList.appendChild(bookItem);
  });
};

const addToCart = (id) => {
  const book = books.find((book) => book.id === id);
  const existingCartItem = cartItems.find((item) => item.id === id);

  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    cartItems.push({ ...book, quantity: 1 });
  }

  saveCartToLocalStorage();
  updateCartCount();
  displayBooks();
  displayCartItemsAdded();
};

const updateCartCount = () => {
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const bookId = parseInt(e.target.getAttribute("data-id"));
    addToCart(bookId);
  }
});

displayBooks();
updateCartCount();
