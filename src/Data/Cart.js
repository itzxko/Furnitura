const cart = JSON.parse(localStorage.getItem("cart"));

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
    document.getElementById(
      "cartQuantity"
    ).innerHTML = `<p class="text-[9px] font-bold">${cartQuantity}</p>`;
  });
  saveData();
}

export { cart, addToCart, cartCount };
