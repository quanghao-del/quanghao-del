// if not logged in, redirect to login page
if (!localStorage.getItem("currentUser")) {
  location.href = "./login/login.html";
}

let extraFee = 0;

const displayCart = () => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  if (cart.length === 0) {
    document.getElementById("cart-container").innerHTML = /* html */ `
      <h4 class="empty-warning">Your cart is empty</h4>
    `;
  } else {
    const subTotal =
      Math.round(
        cart.reduce((acc, product) => {
          acc += Number(product.newPrice.trim().slice(1)) * product.quantity;
          return acc;
        }, 0) * 100
      ) / 100;

    document.getElementById("cart-container").innerHTML = /* html */ `
      <h2>Shopping Cart</h2>
      <p>Home • Shopping Cart</p>
      <div>
        <div style="flex: 1">
          <table>
            <thead>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
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
                    <div class="quantity-cell">
                      <button onclick="removeFromCart('${product.id}');displayCart()">
                        <i class="fa-solid fa-minus"></i>
                      </button>
                      <span>${product.quantity}</span>
                      <button onclick="addToCart('${product.id}');displayCart()">
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </td>
                  <td><button onclick="removeFromCart('${product.id}', 'all');displayCart()" class="remove-from-cart"><i class="fa-solid fa-x"></i> Remove</button></td>
                </tr>
              `
              )
              .join("")}
          </table>

          <div>
            <div class="coupon-code">
              <p>Coupon Code:</p>
              <div>
                <form><input type="text" placeholder="Enter Coupon Code" /><button>Apply</button></form>
                <button onclick="localStorage.removeItem('cart');displayCart()" class="clear-cart">Clear Cart</button>
              </div>
            </div>
          </div>
        </div>

        <div class="checkout-wrapper">
          <div
            class="checkout-top"
          >
            <span>Subtotal</span>
            <span id="subtotal">$${subTotal}
            </span>
          </div>
          <div class="checkout-shipping">
            <h4>Shipping</h4>
            <div>
              <input id="flat_rate" type="radio" name="shipping" ${
                extraFee === 20 ? "checked" : ""
              } />
              <label
                for="flat_rate"
                >Flat rate: <span>$20.00</span></label
              >
            </div>
            <div>
              <input id="local_pickup" type="radio" name="shipping" ${
                extraFee === 25 ? "checked" : ""
              } />
              <label
                for="local_pickup"
                >Local pickup: <span> $25.00</span></label
              >
            </div>
            <div>
              <input id="free_shipping" type="radio" name="shipping"  ${
                extraFee === 0 ? "checked" : ""
              } />
              <label
                for="free_shipping"
                >Free shipping</label
              >
            </div>
          </div>
          <div
            class="checkout-total"
          >
            <span>Total</span><span>$${subTotal + extraFee}</span>
          </div>
          <div class="checkout-proceed">
            <a href="" onclick="alert('Purchased successfully');localStorage.removeItem('cart');displayCart()"
              >Proceed to Checkout</a
            >
          </div>
        </div>
      </div>
    `;
    document.querySelectorAll("input[type=radio]").forEach((item) => {
      item.addEventListener("change", () => {
        extraFee =
          item.id === "flat_rate" ? 20 : item.id === "local_pickup" ? 25 : 0;
        displayCart();
      });
    });
  }
};

displayCart();
