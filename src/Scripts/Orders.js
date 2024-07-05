import { cart, saveData, clearCart } from "../Data/Cart.js";
import { Products } from "../Data/Products.js";
import { orders, saveOrders } from "../Data/Orders.js";

const orderContainer = document.querySelector(".order-container");

let html = ``;
orders.forEach((order) => {
  html += `<div class="w-full flex flex-row gap-2 items-center justify-center"><p>${order.id}</p><p>${order.quantity}</p><p>${order.price}</p> </div>`;
  console.log(order);
});

orderContainer.innerHTML = html;
