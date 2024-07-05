import { cart, saveData, clearCart } from "../Data/Cart.js";
import { Products } from "../Data/Products.js";

let orders = JSON.parse(localStorage.getItem("orders"));

if (!orders) {
  orders = [];
}

function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function handleCheckout() {
  cart.forEach((cartItem) => {
    Products.forEach((product) => {
      if (cartItem.id === product.id) {
        orders.push({
          id: product.id,
          price: product.price,
          quantity: cartItem.quantity,
        });
      }
    });
  });
  clearCart();
  saveData();
  saveOrders();
}
console.log(orders);

export { handleCheckout, orders };
