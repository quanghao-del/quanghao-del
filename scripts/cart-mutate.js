const addToCart = (productId, quantity = 1) => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      ...products.find((product) => product.id === productId),
      quantity,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
};

const removeFromCart = (productId, quantity = 1) => {
  let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  let existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    if (existingItem.quantity === 1 || quantity === "all") {
      cart = cart.filter((item) => item.id !== existingItem.id);
    } else {
      existingItem.quantity--;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
};

const addToWishlist = (productId) => {
  const wishlist = localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [];

  const existingItem = wishlist.find((item) => item.id === productId);

  if (!existingItem) {
    wishlist.push({
      ...products.find((product) => product.id === productId),
    });
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateCartCount();
};

const removeFromWishlist = (productId) => {
  let wishlist = localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [];

  let existingItem = wishlist.find((item) => item.id === productId);

  wishlist = wishlist.filter((item) => item.id !== existingItem.id);

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateCartCount();
};
