import { Products } from "../Data/Products.js";
import {
  cart,
  cartCount,
  removeProduct,
  ifEmptyCart,
  clearCart,
  saveData,
  toHome,
} from "../Data/Cart.js";
import { shipping } from "../Data/Shipping.js";
import { orders, saveOrders } from "../Data/Orders.js";

const container = document.getElementById("cart-container");
const priceContainer = document.getElementById("total-price");
const shippingContainer = document.querySelectorAll(".shipping");
const shippingValue = document.querySelectorAll(".shipping-value");
const totalValue = document.getElementById("total-value");
const proceedButton = document.getElementById("proceed-button");
const homeButton = document.getElementById("home-button");
const countModal = document.getElementById("count-modal");
const removeModal = document.getElementById("remove-modal");

let shippingPrice = 0;
let totalAmount = 0;
let totalCheckout = 0;

let html = ``;
cart.forEach((items) => {
  const productId = items.id;

  let matchingProduct;

  Products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  html += ` <div
              class="relative w-full flex flex-col items-center justify-center h-full gap-2 p-4 group"
              id="cart-product-${matchingProduct.id}"
            >
              <div
                class="relative h-[160px] w-full flex items-center justify-center cursor-pointer group"
              >
                <div
                  class="w-full h-full flex items-center justify-center rounded-md overflow-hidden"
                >
                  <img
                    src="${matchingProduct.img}"
                    alt=""
                    class="object-cover w-full h-full duration-500 hover:scale-105 transition-transform"
                  />
                </div>
                <div
                  class="absolute bottom-8 right-[-12px] flex flex-col items-start justify-center py-2 px-4 w-2/4 bg-[#2f2f2f] text-white shadow-xl rounded-md"
                >
                  <p class="text-sm font-semibold w-full truncate">
                    ${matchingProduct.name}
                  </p>
                  <p class="text-xs font-normal w-full truncate">
                    PHP ${matchingProduct.price}
                  </p>
                  <p
                    class="qty-value-${items.id} text-xs font-normal w-full truncate"
                  >
                    Quantity: ${items.quantity}
                  </p>
                </div>
                <div
                  class="absolute top-2 left-2 hidden group-hover:block cursor-pointer"
                >
                  <div
                    class="remove-button"
                    id=""
                    data-id="${matchingProduct.id}"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div
                class="w-full hidden group-hover:flex flex-row gap-2 items-center justify-start"
              >
                <div
                  class="flex flex-row justify-center items-center gap-2 bg-white py-2 px-3 rounded-md"
                >
                  <div
                    class="add-quantity cursor-pointer pr-2 border-r"
                    data-id="${matchingProduct.id}"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-3"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                  <p class="qty-${items.id} text-xs font-semibold px-1">
                    ${items.quantity}
                  </p>
                  <div
                    class="minus-quantity cursor-pointer pl-2 border-l"
                    data-id="${matchingProduct.id}"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-3"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 12h14"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>`;
});
container.innerHTML = html;
const remove = document.querySelectorAll(".remove-button");
const addQty = document.querySelectorAll(".add-quantity");
const minusQty = document.querySelectorAll(".minus-quantity");

shippingContainer.forEach((shipItem) => {
  shipItem.addEventListener("click", () => {
    calculateShipping(shipItem.dataset.id);
    calculateCheckout();
  });
});

function calculateShipping(shipId) {
  shipping.forEach((shipping) => {
    if (shipping.id === shipId) {
      shippingPrice = shipping.price;
    }
  });
  shippingValue.forEach((shippingValue) => {
    shippingValue.innerText = shippingPrice;
  });
  return shippingPrice;
}

function calculateTotalPrice() {
  let totalPrice = 0;
  cart.forEach((items) => {
    let matchingProduct;

    Products.forEach((product) => {
      if (product.id === items.id) {
        matchingProduct = product;

        totalPrice +=
          parseInt(matchingProduct.price) * parseInt(items.quantity);
      }
    });
  });
  priceContainer.innerText = `PHP ${totalPrice}`;
  totalAmount = totalPrice;
}
function calculateCheckout() {
  totalCheckout = shippingPrice + totalAmount;
  totalValue.innerText = totalCheckout;
}

minusQty.forEach((item) => {
  item.addEventListener("click", () => {
    showCountModal();

    const productId = item.dataset.id;
    const qtyParent = document.querySelector(`.qty-${productId}`);
    const qtyValue = document.querySelector(`.qty-value-${productId}`);
    cart.forEach((cartItem) => {
      if (cartItem.id === productId) {
        if (parseInt(cartItem.quantity) > 1) {
          cartItem.quantity = parseInt(cartItem.quantity) - 1;
          console.log(cartItem);
          saveData();

          qtyParent.innerText = cartItem.quantity;
          qtyValue.innerText = `Quantity: ${cartItem.quantity}`;
        } else {
          removeProduct(productId);
          const parent = document.getElementById(`cart-product-${productId}`);
          parent.remove();
          saveData();
        }
      }
    });
    calculateTotalPrice();
    calculateCheckout();
    cartCount();
  });
});

addQty.forEach((item) => {
  item.addEventListener("click", () => {
    showCountModal();

    const productId = item.dataset.id;
    const qtyParent = document.querySelector(`.qty-${productId}`);
    const qtyValue = document.querySelector(`.qty-value-${productId}`);
    cart.forEach((cartItem) => {
      if (cartItem.id === productId) {
        if (cartItem.id === productId) {
          cartItem.quantity = parseInt(cartItem.quantity) + 1;
          console.log(cartItem);
          saveData();

          qtyParent.innerText = cartItem.quantity;
          qtyValue.innerText = `Quantity: ${cartItem.quantity}`;
        }
      }
    });
    calculateTotalPrice();
    calculateCheckout();
    cartCount();
  });
});

remove.forEach((items) => {
  items.addEventListener("click", () => {
    showRemoveModal();

    const productId = items.dataset.id;
    removeProduct(productId);
    const parent = document.getElementById(`cart-product-${productId}`);
    parent.remove();
    cartCount();
    calculateTotalPrice();
    calculateCheckout();
    ifEmptyCart(toHome);
  });
});

function getDate() {}

function handleCheckout() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let orderDate = `${monthNames[month]} ${day}, ${year}`;

  cart.forEach((cartItem) => {
    Products.forEach((product) => {
      if (product.id === cartItem.id) {
        let orderFound;

        orders.forEach((order) => {
          if (orderDate === order.date) {
            orderFound = true;

            let matchItem;
            order.items.forEach((orderItem) => {
              if (orderItem.id === cartItem.id) {
                matchItem = true;
                orderItem.quantity =
                  parseInt(orderItem.quantity) + parseInt(cartItem.quantity);
              }
              clearCart();
              saveData();
              saveOrders();
            });
            if (!matchItem) {
              order.items.push({
                id: cartItem.id,
                price: product.price,
                quantity: cartItem.quantity,
              });
              clearCart();
              saveData();
              saveOrders();
            }
          }
        });
        if (!orderFound) {
          orders.push({
            date: orderDate,
            items: [
              {
                id: cartItem.id,
                price: product.price,
                quantity: cartItem.quantity,
              },
            ],
          });
          clearCart();
          saveData();
          saveOrders();
        }
      }
    });
  });
}

proceedButton.addEventListener("click", () => {
  handleCheckout();
  calculateTotalPrice();
  ifEmptyCart(toHome);
  cartCount();
  window.location.href = "Orders.html";
});

function showCountModal() {
  countModal.classList.remove("hidden");
  countModal.classList.add("flex");

  setTimeout(() => {
    countModal.classList.remove("flex");
    countModal.classList.add("hidden");
  }, 1000);
}

function showRemoveModal() {
  removeModal.classList.remove("hidden");
  removeModal.classList.add("flex");

  setTimeout(() => {
    removeModal.classList.remove("flex");
    removeModal.classList.add("hidden");
  }, 1000);
}

calculateTotalPrice();
ifEmptyCart(toHome);
