(function () {
  function saveOrderFromCart() {
    var cart = data.getCart();
    if (cart.length === 0) return null;
    var total = cart.reduce(function (sum, item) {
      return sum + item.price * item.qty;
    }, 0);
    var order = {
      id: Date.now(),
      items: JSON.parse(JSON.stringify(cart)),
      total: total,
      createdAt: new Date().toISOString(),
    };
    var orders = data.getOrders();
    orders.push(order);
    data.setOrders(orders);
    return order;
  }

  function getOrders() {
    return data.getOrders();
  }

  window.orders = {
    saveOrderFromCart,
    getOrders,
  };
})();
