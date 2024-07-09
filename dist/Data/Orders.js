let orders = JSON.parse(localStorage.getItem("orders"));

// localStorage.removeItem("orders");

if (!orders) {
  orders = [];
}

function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export { orders, saveOrders };
