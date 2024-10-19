for (let category of categories) {
  let card = /*html*/ `
  <div class="category-card">
    <a href="./category.html?categoryId=${encodeURIComponent(
      category.id
    )}" class="category-image-container">
      <img src="./assets/categories/${category.image}" />
    </a>
    <div class="category-container">
      <a href=""><h3>${category.name}</h3></a> 
      <a href=""><p>${
        products.filter((product) => product.category === category.id).length
      } Products</p></a> 

    </div>
  </div>
  `;

  document.getElementById("categories").innerHTML += card;

  let element = /*html*/ `
<button>
  <span>
    <img src="./assets/categories/${category.image}" alt="" />
    <span>${category.name}</span>
  </span>
  <i class="fa-solid fa-chevron-right"></i>
</button>
  `;

  document.querySelector(".category-drops").innerHTML += element;
}

for (let product of products) {
  let card = /*html*/ `
  <div onclick="location.href='./product.html?id=${product.id}'" class="card">
    <div class="image-container">
      <img src="./assets/products/${product.image}" /> 
      <div class="card-actions">
        <button onclick="event.stopPropagation();addToCart('${
          product.id
        }');alert('Added to cart')" data-tooltip="Add to cart">
          <i class="fa-solid fa-cart-shopping"></i>
        </button>
        <button onclick="event.stopPropagation();location.href='./product.html?id=${
          product.id
        }'" data-tooltip="Quick view"><i class="fa-regular fa-eye"></i></button>
        <button onclick="event.stopPropagation();addToWishlist('${
          product.id
        }');alert('Added to wishlist')" data-tooltip="Add to wishlist"><i class="fa-regular fa-heart"></i></button>
      </div>
    </div> 
    <div class="container">
      <p>${
        categories.find((category) => product.category === category.id).name
      }</p>
      <h5>${product.name}</h5> 
      <div class="stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i></div>
      <h6><span>${product.oldPrice}</span> <span>${product.newPrice}</span></h6>
    </div>
  </div>
  `;

  document.getElementById("products").innerHTML += card;
}

let slideCount = 1;

const setBannerContent = (count) => {
  document.querySelector("#banner-content").innerHTML = /*html*/ `
<div>
<p class="slide-in-1" style="font-size: 16px">Starting at $274.00</p>
<h2 class="slide-in-2">The best tablet</h2>
<h2 class="slide-in-2">Collection 2023</h2>
<p
  class="slide-in-3"
  style="
    font-family: 'Oregano', cursive;
    font-size: 30px;
    margin-top: 10px;
  "
>
  Exclusive offer
  <span style="color: #f8d65a; font-family: 'Oregano', cursive"
    >-35%</span
  >
  off this week
</p>
<button class="shop-now-btn slide-in-4">
  Shop Now <i class="fa-solid fa-arrow-right"></i>
</button>
</div>
<img class="slide-in-5" src="./assets/slider-img-${count}.png" alt="" />
<div class="carousel-navigation">
<span onclick="setSlide(1)" style="${
    count === 1 ? "color: white" : ""
  }"><i class="fa-solid fa-circle"></i></span>
<span onclick="setSlide(2)" style="${
    count === 2 ? "color: white" : ""
  }"><i class="fa-solid fa-circle"></i></span>
<span onclick="setSlide(3)" style="${
    count === 3 ? "color: white" : ""
  }"><i class="fa-solid fa-circle"></i></span>
</div>
`;
};

const setSlide = (number) => {
  slideCount = number;
  setBannerContent(slideCount);
};
document.querySelector("#left-navigator").addEventListener("click", () => {
  slideCount = slideCount === 1 ? 3 : slideCount - 1;
  setBannerContent(slideCount);
});

document.querySelector("#right-navigator").addEventListener("click", () => {
  slideCount = slideCount === 3 ? 1 : slideCount + 1;
  setBannerContent(slideCount);
});

setBannerContent(slideCount);
