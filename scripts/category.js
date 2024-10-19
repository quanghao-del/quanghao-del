const categoryId = new URLSearchParams(new URL(location.href).search).get(
  "categoryId"
);

const category = categories.find((item) => item.id === categoryId);

if (!category) location.href = "./index.html";

document.querySelector("#category").innerText = category.name;

const filtered = products.filter((product) => {
  return product.category === categoryId;
});

for (let product of filtered) {
  let card = /*html*/ `
  <a href="./product.html?id=${product.id}" class="card">
    <div class="image-container">
      <img src="./assets/products/${product.image}" /> 
    </div> 
    <div class="container">
      <p>${
        categories.find((category) => product.category === category.id).name
      }</p>
      <h5>${product.name}</h5> 
      <div class="stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i></div>
      <h6><span>${product.oldPrice}</span> <span>${product.newPrice}</span></h6>
    </div>
  </a>
  `;

  document.getElementById("products").innerHTML += card;
}
