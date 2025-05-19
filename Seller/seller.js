document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("add-product-form");
    const productList = document.getElementById("seller-products");
  
    let products = JSON.parse(localStorage.getItem("products")) || [];
  
    function displayProducts() {
      if (productList) {
        productList.innerHTML = "";
        products.forEach((product, index) => {
          let li = document.createElement("li");
          li.innerHTML = `
            <strong>${product.name}</strong> - $${product.price} 
            <button onclick="deleteProduct(${index})">Delete</button>
          `;
          productList.appendChild(li);
        });
      }
    }
  
    if (productForm) {
      productForm.addEventListener("submit", function (event) {
        event.preventDefault();
  
        const product = {
          type: document.getElementById("product-type").value,
          name: document.getElementById("product-name").value,
          shortDesc: document.getElementById("short-desc").value,
          detail: document.getElementById("detail").value,
          tags: document.getElementById("tags").value,
          sku: document.getElementById("sku").value,
          price: document.getElementById("price").value,
          category: document.getElementById("category").value,
          brand: document.getElementById("brand").value,
          verify: document.getElementById("verify").value
        };
  
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
  
        alert("Product added successfully!");
        window.location.href = "seller.html";
      });
    }
  
    window.deleteProduct = function (index) {
      products.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(products));
      displayProducts();
    };
  
    displayProducts();
  });
  