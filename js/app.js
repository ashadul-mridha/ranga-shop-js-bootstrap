// fetch all data from api
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    console.log(product.rating);
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: ${product.price}</h2>
      <h5>Rating: ${product.rating.rate} by ${product.rating.count} People</h5>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-info">add to cart</button>
      <button id="details-btn" class="btn btn-warning">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// update add to cart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();

  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

// get input value by id 
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    const taxprice = priceConverted * 0.2;
    setInnerText("total-tax", taxprice.toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    const taxprice = priceConverted * 0.3;
    setInnerText("total-tax", taxprice.toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    const taxprice = priceConverted * 0.4;
    setInnerText("total-tax", taxprice.toFixed(2));
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");

  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
