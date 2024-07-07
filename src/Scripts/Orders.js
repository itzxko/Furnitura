import { cart, saveData, clearCart, cartCount } from "../Data/Cart.js";
import { Products } from "../Data/Products.js";
import { orders, saveOrders } from "../Data/Orders.js";

const orderContainer = document.querySelector(".order-container");
const addModal = document.getElementById("add-modal");

console.log(orders);

let html = ``;
orders.forEach((order) => {
  html += `<div class="w-full flex items-center justify-center">
            <p class="text-xs font-semibold text-start w-full">${order.date}</p>
          </div>`;

  html += `<div class="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">`;
  order.items.forEach((orderItem) => {
    Products.forEach((product) => {
      if (orderItem.id === product.id) {
        html += `
            <div class="w-full flex flex-col gap-2 items-center justify-center">
              <div
                class="relative w-full h-[160px] flex items-center justify-center rounded-md overflow-hidden"
              >
                <img
                  src="${product.img}"
                  alt=""
                  class="object-cover object-center w-full h-full hover:scale-105 transition-transform duration-500 cursor-pointer"
                />
                <div
                  class="absolute top-2 left-2 p-2 py-1 rounded-md bg-[#2f2f2f] text-white"
                >
                  <p class="text-xs font-normal">x${orderItem.quantity}</p>
                </div>
              </div>
              <div class="w-full flex items-center justify-center px-1">
                <div class="w-1/2 flex flex-col items-start justify-center">
                  <p class="text-sm font-semibold w-full truncate">
                    ${product.name}
                  </p>
                  <p class="text-xs font-normal">PHP ${orderItem.price}</p>
                </div>
                <div class="w-1/2 flex items-end justify-end">
                  <div
                    class="order-again p-2 rounded-full bg-[#2f2f2f] text-white group cursor-pointer"
                    data-id="${orderItem.id}"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-3 group-hover:animate-slideFadeIn"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>`;
      }
    });
  });

  html += `</div>`;
});

orderContainer.innerHTML = html;
const orderAgain = document.querySelectorAll(".order-again");

orderAgain.forEach((item) => {
  item.addEventListener("click", () => {
    const orderId = item.dataset.id;
    let matchingOrder;

    showAddModal();

    cart.forEach((cartItem) => {
      if (cartItem.id === orderId) {
        matchingOrder = cartItem;
        cartItem.quantity = cartItem.quantity + 1;
        saveData();
        cartCount();
      }
    });

    if (!matchingOrder) {
      cart.push({ id: orderId, quantity: 1 });
      saveData();
      cartCount();
    }
  });
});

function showAddModal() {
  addModal.classList.remove("hidden");
  addModal.classList.add("flex");

  setTimeout(() => {
    addModal.classList.remove("flex");
    addModal.classList.add("hidden");
  }, 1000);
}
