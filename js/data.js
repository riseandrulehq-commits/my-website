(function () {
  const MENU_KEY = "menu";
  const CART_KEY = "cart";
  const ORDERS_KEY = "orders";

  const defaultMenu = [
    {
      id: 1,
      name: "Idly",
      price: 30,
      imageUrl:
        "https://images.unsplash.com/photo-1626154653598-27953b241aab?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Dosa",
      price: 50,
      imageUrl:
        "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Poori",
      price: 40,
      imageUrl:
        "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop",
    },
    {
      id: 4,
      name: "Pongal",
      price: 45,
      imageUrl:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=200&fit=crop",
    },
    {
      id: 5,
      name: "Vada",
      price: 35,
      imageUrl:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop",
    },
  ];

  function getMenu() {
    const raw = localStorage.getItem(MENU_KEY);
    if (!raw) {
      localStorage.setItem(MENU_KEY, JSON.stringify(defaultMenu));
      return defaultMenu;
    }
    return JSON.parse(raw);
  }

  function setMenu(menu) {
    localStorage.setItem(MENU_KEY, JSON.stringify(menu));
  }

  function getCart() {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  function setCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function getOrders() {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  function setOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  window.data = {
    MENU_KEY,
    CART_KEY,
    ORDERS_KEY,
    defaultMenu,
    getMenu,
    setMenu,
    getCart,
    setCart,
    getOrders,
    setOrders,
  };
})();
