// if not logged in, redirect to login page
if (!localStorage.getItem("currentUser")) {
  location.href = "./login/login.html";
}

const displayWishlist = () => {
  const cart = localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [];

  if (cart.length === 0) {
    document.getElementById("wishlist-container").innerHTML = /* html */ `
      <h4 class="empty-warning">Your wishlist is empty</h4>
    `;
  } else {
    document.getElementById("wishlist-container").innerHTML = /* html */ `
      <h2>Wishlist</h2>
      <p>Home • Wishlist</p>
      <div>
        <div style="flex: 1">
          <table>
            <thead>
              <th>Product</th>
              <th>Price</th>
              <th>Add Cart</th>
              <th></th>
            </thead>
            ${cart
              .map(
                (product) => /*html*/ `
                <tr>
                  <td>
                    <div class="product-cell">
                      <img src="./assets/products/${product.image}" alt="" />
                      <p>${product.name}</p>
                    </div>
                  </td>
                  <td>${product.newPrice}</td>
                  <td>
                    <button class="add-to-cart-btn" onclick="addToCart('${product.id}');alert('Added to cart')">Add to cart</button>
                  </td>
                  <td><button onclick="removeFromWishlist('${product.id}');displayWishlist()" class="remove-from-cart"><i class="fa-solid fa-x"></i> Remove</button></td>
                </tr>
              `
              )
              .join("")}
          </table>

        </div>

      </div>
    `;
  }
};

displayWishlist();
