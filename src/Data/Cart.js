let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cartQuantity = 0;
  cart = [];
  console.log("shit");
}

function ifEmptyCart() {
  if (cart.length === 0) {
    document.getElementById(
      "cart-parent"
    ).innerHTML = ` <p class="text-sm font-normal">The Cart is Empty!</p>`;
  }
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

cartCount();

export { cart, addToCart, cartCount, removeProduct, ifEmptyCart };
