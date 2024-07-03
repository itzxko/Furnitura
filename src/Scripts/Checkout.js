import { Products } from "../Data/Products.js";
import { cart, cartCount, removeProduct, ifEmptyCart } from "../Data/Cart.js";

const container = document.getElementById("cart-container");
const priceContainer = document.getElementById("total-price");

let html = ``;
cart.forEach((items) => {
  const productId = items.id;

  let matchingProduct;

  Products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;

      // console.log(`Price: ${matchingProduct.price}, Qty: ${items.quantity}`);
      // totalPrice += parseInt(matchingProduct.price) * parseInt(items.quantity);
      // priceContainer.innerText = totalPrice;
    }
  });

  html += `
                <div
            class="relative w-full flex flex-row items-center justify-center h-full p-4"
            id="cart-product-${matchingProduct.id}"
          >
            <div
              class="relative h-[160px] w-full flex items-center justify-center rounded-md overflow-hidden cursor-pointer group"
            >
              <img
                src="${matchingProduct.img}"
                alt=""
                class="object-cover w-full h-full duration-500 hover:scale-105 transition-transform"
              />
              <div
                class="absolute top-2 left-2 hidden group-hover:block cursor-pointer"
              >
                <div
                  class="remove-button "
                  id=""
                  data-id="${matchingProduct.id}"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4 "
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
              class="absolute bottom-8 right-[-12px] flex flex-col items-start justify-center py-2 px-4 w-2/4 bg-[#2f2f2f] text-white shadow-xl rounded-md"
            >
              <p class="text-sm font-semibold w-full truncate">
                ${matchingProduct.name}
              </p>
              <p class="text-xs font-normal w-full truncate">
                PHP ${matchingProduct.price}
              </p>
              <p class="text-xs font-normal w-full truncate">
                Quantity: ${items.quantity}
              </p>
            </div>
          </div>
    `;
});
container.innerHTML = html;

const remove = document.querySelectorAll(".remove-button");

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
}

remove.forEach((items) => {
  items.addEventListener("click", () => {
    const productId = items.dataset.id;
    removeProduct(productId);
    console.log(productId);
    const parent = document.getElementById(`cart-product-${productId}`);
    parent.remove();
    cartCount();
    calculateTotalPrice();
    ifEmptyCart();
  });
});
calculateTotalPrice();
ifEmptyCart();
