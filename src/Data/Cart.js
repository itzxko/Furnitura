let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [];
}

function ifEmptyCart(callback) {
  if (cart.length === 0) {
    document.getElementById("cart-parent").innerHTML = `
    <div class="w-full flex flex-col gap-2 items-center justify-center h-[70svh]"
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 animate-bounce"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      </div>
      <p class="text-xs font-bold">The Cart is Empty!</p>
      <div
        class="py-2 px-4 rounded-md bg-[#2f2f2f] text-white hover:bg-[#474747] transition-all duration-500 shadow-xl cursor-pointer"
        id="home-button" href="./Pages/Home.html"
      >
        <p class="text-xs font-semibold">Back to Home</p>
      </div>
    </div>`;
    callback();
  }
}
function toHome() {
  document.getElementById("home-button").addEventListener("click", () => {
    window.location.href = "Home.html";
  });
}

function saveData() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(buttons) {
  let alreadyInCart;

  cart.forEach((items) => {
    if (buttons.dataset.id == items.id) {
      alreadyInCart = items;
    }
  });

  if (alreadyInCart) {
    alreadyInCart.quantity += 1;
  } else {
    cart.push({ id: buttons.dataset.id, quantity: 1 });
  }
  saveData();
}

function cartCount() {
  let cartQuantity = 0;
  cart.forEach((items) => {
    cartQuantity += items.quantity;
  });
  document.getElementById(
    "cartQuantity"
  ).innerHTML = `<p class="text-[9px] font-bold">${cartQuantity}</p>`;
  saveData();
}

function removeProduct(productId) {
  const newCart = [];

  cart.forEach((items) => {
    if (items.id !== productId) {
      newCart.push(items);
    }
  });
  cart = newCart;
  saveData();
  cartCount();
}
function clearCart() {
  cart = [];
}
cartCount();

export {
  cart,
  addToCart,
  cartCount,
  removeProduct,
  ifEmptyCart,
  clearCart,
  saveData,
  toHome,
};
