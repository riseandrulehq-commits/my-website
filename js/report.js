(function () {
  var monthLabel = document.getElementById("report-month-label");
  var summaryEl = document.getElementById("report-summary");
  var ordersEl = document.getElementById("report-orders");
  var btnPrev = document.getElementById("btn-prev-month");
  var btnNext = document.getElementById("btn-next-month");

  var currentYear = new Date().getFullYear();
  var currentMonth = new Date().getMonth();

  function setReportMonth(year, month) {
    currentYear = year;
    currentMonth = month;
  }

  function getOrdersInMonth(orders, year, month) {
    return orders.filter(function (o) {
      var d = new Date(o.createdAt);
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }

  function monthName(m) {
    var names = [
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
    return names[m];
  }

  function render() {
    if (!monthLabel || !summaryEl || !ordersEl) return;

    monthLabel.textContent = monthName(currentMonth) + " " + currentYear;

    var all = orders.getOrders();
    var inMonth = getOrdersInMonth(all, currentYear, currentMonth);
    var totalRevenue = inMonth.reduce(function (sum, o) {
      return sum + (o.total || 0);
    }, 0);

    summaryEl.innerHTML =
      "<p><strong>Orders:</strong> " +
      inMonth.length +
      "</p>" +
      "<p><strong>Revenue:</strong> ₹" +
      totalRevenue +
      "</p>";

    if (inMonth.length === 0) {
      ordersEl.innerHTML = "<p>No orders in this month.</p>";
    } else {
      ordersEl.innerHTML =
        '<div class="report-order-row" style="font-weight:600;">Date — Total</div>' +
        inMonth
          .map(function (o) {
            var d = new Date(o.createdAt);
            var dateStr =
              d.toLocaleDateString() +
              " " +
              d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            return (
              '<div class="report-order-row">' +
              dateStr +
              " — ₹" +
              (o.total || 0) +
              "</div>"
            );
          })
          .join("");
    }
  }

  function prevMonth() {
    currentMonth -= 1;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear -= 1;
    }
    render();
  }

  function nextMonth() {
    currentMonth += 1;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear += 1;
    }
    render();
  }

  if (btnPrev) btnPrev.addEventListener("click", prevMonth);
  if (btnNext) btnNext.addEventListener("click", nextMonth);

  window.report = {
    render: render,
    setReportMonth: setReportMonth,
  };
})();
