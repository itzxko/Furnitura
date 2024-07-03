import { Products } from "../Data/Products.js";
import { cart, removeProduct } from "../Data/Cart.js";

const container = document.getElementById("cart-container");

let html = ``;
cart.forEach((items) => {
  const productId = items.id;

  let matchingProduct;

  Products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  html += `
      <div
          class="relative w-full flex flex-row items-center justify-center h-full p-4" id="cart-product-${matchingProduct.id}"
        >
          <div
            class="relative h-[160px] w-full flex items-center justify-center rounded-md overflow-hidden cursor-pointer group"
          >
            <img
              src="${matchingProduct.img}"
              alt=""
              class="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
            />
            <div
              class="absolute top-2 left-2 hidden group-hover:block cursor-pointer"
            >
              <div class="remove-button" id="" data-id="${matchingProduct.id}">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4 text-white shadow-xl"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
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

function removeItem() {}

remove.forEach((items) => {
  items.addEventListener("click", () => {
    const productId = items.dataset.id;
    removeProduct(productId);
    console.log(productId);
    const parent = document.getElementById(`cart-product-${productId}`);
    parent.remove();
  });
});