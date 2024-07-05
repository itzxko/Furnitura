let orders = JSON.parse(localStorage.getItem("orders"));

if (!orders) {
  orders = [];
}

function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export { orders, saveOrders };
