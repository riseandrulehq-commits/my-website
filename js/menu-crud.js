(function () {
  var form = document.getElementById("menu-form");
  var tbody = document.getElementById("menu-tbody");
  var editIdInput = document.getElementById("menu-edit-id");
  var nameInput = document.getElementById("menu-name");
  var priceInput = document.getElementById("menu-price");
  var imageInput = document.getElementById("menu-image");
  var saveBtn = document.getElementById("btn-save-item");
  var cancelBtn = document.getElementById("btn-cancel-edit");

  function nextId(menu) {
    if (!menu.length) return 1;
    return (
      Math.max.apply(
        null,
        menu.map(function (m) {
          return m.id;
        }),
      ) + 1
    );
  }

  function renderTable() {
    var menu = data.getMenu();
    if (!tbody) return;
    tbody.innerHTML = menu
      .map(function (item) {
        var imgSrc =
          item.imageUrl ||
          "https://via.placeholder.com/48?text=" +
            encodeURIComponent(item.name);
        return (
          '<tr data-id="' +
          item.id +
          '">' +
          "<td>" +
          escapeHtml(item.name) +
          "</td>" +
          "<td>₹" +
          item.price +
          "</td>" +
          '<td><img src="' +
          escapeAttr(imgSrc) +
          '" alt="" onerror="this.src=\'https://via.placeholder.com/48?text=img\'"></td>' +
          "<td>" +
          '<button type="button" class="btn-edit">Edit</button>' +
          '<button type="button" class="btn-delete">Delete</button>' +
          "</td></tr>"
        );
      })
      .join("");

    tbody.querySelectorAll(".btn-edit").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var row = btn.closest("tr");
        var id = parseInt(row.getAttribute("data-id"), 10);
        var item = menu.find(function (m) {
          return m.id === id;
        });
        if (!item) return;
        editIdInput.value = item.id;
        nameInput.value = item.name;
        priceInput.value = item.price;
        imageInput.value = item.imageUrl || "";
        saveBtn.textContent = "Update item";
      });
    });

    tbody.querySelectorAll(".btn-delete").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var row = btn.closest("tr");
        var id = parseInt(row.getAttribute("data-id"), 10);
        var menu = data.getMenu().filter(function (m) {
          return m.id !== id;
        });
        data.setMenu(menu);
        renderTable();
      });
    });
  }

  function escapeHtml(s) {
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function escapeAttr(s) {
    if (!s) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function resetForm() {
    editIdInput.value = "";
    nameInput.value = "";
    priceInput.value = "";
    imageInput.value = "";
    saveBtn.textContent = "Add item";
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var id = editIdInput.value ? parseInt(editIdInput.value, 10) : null;
      var name = nameInput.value.trim();
      var price = parseInt(priceInput.value, 10);
      var imageUrl = imageInput.value.trim() || undefined;
      var menu = data.getMenu();

      if (id) {
        var idx = menu.findIndex(function (m) {
          return m.id === id;
        });
        if (idx >= 0) {
          menu[idx] = { id: id, name: name, price: price, imageUrl: imageUrl };
        }
      } else {
        menu.push({
          id: nextId(menu),
          name: name,
          price: price,
          imageUrl: imageUrl,
        });
      }
      data.setMenu(menu);
      resetForm();
      renderTable();
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", resetForm);
  }

  window.menuCrud = { renderTable };
})();
