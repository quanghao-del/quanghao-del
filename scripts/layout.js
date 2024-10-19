if (localStorage.getItem("currentUser")) {
  document.querySelector(".icons").innerHTML += /*html*/ `
    <a class="navbar-icon" href="./cart.html">
      <i class='bx bx-cart'></i>
      <span id="cart-count">0</span>
    </a>
    <a class="navbar-icon" href="./wishlist.html">
      <i class='fa-regular fa-heart'></i>
      <span id="wishlist-count">0</span>
    </a>
    <div tabindex="0" class="avatar-action">
      <img src="${`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        JSON.parse(localStorage.getItem("currentUser")).username
      )}`}" />
      <div class="popup">
        <button onclick="location.href = './profile.html'">
          <i class="fa-solid fa-user"></i>
          <span> Profile</span>
        </button>
        <button onclick="logout()">
          <i class='bx bx-log-out' ></i>
          <span> Logout</span>
        </button>
      </div>
    </div>
  `;
} else {
  document.querySelector(".icons").innerHTML += /*html*/ `
    <a href="./register.html">
      <i class="fa-solid fa-right-to-bracket"></i>
    </a>
  `;
}

const updateCartCount = () => {
  if (localStorage.getItem("cart")) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    document.getElementById("cart-count").innerText = cart.length;
  }
  if (localStorage.getItem("wishlist")) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist"));
    document.getElementById("wishlist-count").innerText = wishlist.length;
  }
};

updateCartCount();

const logout = () => {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("cart");
  location.reload();
};

document.body.innerHTML += /*html*/ `
  <button class="back-to-top">
  <i class="fa-solid fa-angles-up"></i>
  </button>
`;

window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 0)
    document.querySelector(".back-to-top").classList.add("back-to-top-visible");
  else
    document
      .querySelector(".back-to-top")
      .classList.remove("back-to-top-visible");
});

document
  .querySelector(".back-to-top")
  .addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
