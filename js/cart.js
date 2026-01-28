(function () {
  function getCart() {
    return data.getCart();
  }

  function setCart(cart) {
    data.setCart(cart);
  }

  function addToCart(menuId, name, price) {
    const cart = getCart();
    const existing = cart.find(function (x) {
      return x.menuId === menuId;
    });
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ menuId: menuId, name: name, price: price, qty: 1 });
    }
    setCart(cart);
    renderCart();
  }

  function clearCart() {
    setCart([]);
    renderCart();
  }

  function renderCart() {
    const cart = getCart();
    const itemsEl = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    if (!itemsEl || !totalEl) return;

    if (cart.length === 0) {
      itemsEl.innerHTML = '<p class="cart-empty">Cart is empty</p>';
      totalEl.textContent = "";
      return;
    }

    let total = 0;
    const lines = cart.map(function (item) {
      const lineTotal = item.price * item.qty;
      total += lineTotal;
      return (
        '<div class="cart-line">' +
        "<span>" +
        escapeHtml(item.name) +
        " × " +
        item.qty +
        " — ₹" +
        item.price +
        "</span>" +
        "<span>₹" +
        lineTotal +
        "</span>" +
        "</div>"
      );
    });
    itemsEl.innerHTML = lines.join("");
    totalEl.textContent = "Total: ₹" + total;
  }

  function escapeHtml(s) {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  window.cart = {
    getCart,
    setCart,
    addToCart,
    clearCart,
    renderCart,
  };
})();
