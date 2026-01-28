(function () {
  const billingView = document.getElementById("billing-view");
  const manageView = document.getElementById("manage-view");
  const menuGrid = document.getElementById("menu-grid");

  function renderMenu() {
    var menu = data.getMenu();
    if (!menuGrid) return;
    menuGrid.innerHTML = menu
      .map(function (item) {
        var src =
          item.imageUrl ||
          "https://via.placeholder.com/160x120?text=" +
            encodeURIComponent(item.name);
        return (
          '<div class="menu-card" data-menu-id="' +
          item.id +
          '" data-name="' +
          escapeAttr(item.name) +
          '" data-price="' +
          item.price +
          '">' +
          '<img src="' +
          escapeAttr(src) +
          '" alt="' +
          escapeAttr(item.name) +
          '" loading="lazy" onerror="this.src=\'https://via.placeholder.com/160x120?text=' +
          encodeURIComponent(item.name) +
          "'\">" +
          '<div class="card-body">' +
          '<p class="card-name">' +
          escapeHtml(item.name) +
          "</p>" +
          '<p class="card-price">₹' +
          item.price +
          "</p>" +
          "</div></div>"
        );
      })
      .join("");
  }

  function onMenuCardClick(e) {
    var card = e.target.closest(".menu-card");
    if (!card) return;
    var id = parseInt(card.getAttribute("data-menu-id"), 10);
    var name = card.getAttribute("data-name");
    var price = parseInt(card.getAttribute("data-price"), 10);
    cart.addToCart(id, name, price);
  }

  function escapeAttr(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeHtml(s) {
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function showTab(tabId) {
    document.querySelectorAll(".tab").forEach(function (t) {
      t.classList.toggle("active", t.getAttribute("data-tab") === tabId);
    });
    if (tabId === "billing") {
      billingView.classList.add("active");
      manageView.classList.remove("active");
      renderMenu();
      cart.renderCart();
    } else {
      billingView.classList.remove("active");
      manageView.classList.add("active");
      if (window.menuCrud && menuCrud.renderTable) menuCrud.renderTable();
      if (window.report && report.render) report.render();
    }
  }

  function initTabs() {
    document.querySelectorAll(".tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        showTab(btn.getAttribute("data-tab"));
      });
    });
  }

  function init() {
    data.getMenu();
    initTabs();
    renderMenu();
    cart.renderCart();

    if (menuGrid) {
      menuGrid.addEventListener("click", onMenuCardClick);
    }

    document
      .getElementById("btn-clear-cart")
      .addEventListener("click", function () {
        cart.clearCart();
      });

    document
      .getElementById("btn-print-bill")
      .addEventListener("click", function () {
        if (cart.getCart().length === 0) {
          alert("Cart is empty. Add items before printing.");
          return;
        }
        window.print();
      });

    var payModal = document.getElementById("pay-modal");
    var btnPayNow = document.getElementById("btn-pay-now");
    var btnConfirmPaid = document.getElementById("btn-confirm-paid");
    var btnCloseModal = document.getElementById("btn-close-modal");

    if (btnPayNow && payModal) {
      btnPayNow.addEventListener("click", function () {
        if (cart.getCart().length === 0) {
          alert("Cart is empty. Add items before paying.");
          return;
        }
        payModal.setAttribute("aria-hidden", "false");
      });
    }
    if (btnConfirmPaid && payModal) {
      btnConfirmPaid.addEventListener("click", function () {
        orders.saveOrderFromCart();
        cart.clearCart();
        payModal.setAttribute("aria-hidden", "true");
      });
    }
    if (btnCloseModal && payModal) {
      btnCloseModal.addEventListener("click", function () {
        payModal.setAttribute("aria-hidden", "true");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.app = { renderMenu, showTab };
})();
