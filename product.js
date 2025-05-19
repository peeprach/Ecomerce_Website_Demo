// Sample product data
const products = [
    { id: 1, name: "Nike-Tshirt", price: "฿740", image: "images/product1.jpg",id: "1" },
    { id: 2, name: "KATIFIA เก้าอี้", price: "฿699", image: "images/product2.png" },
    { id: 3, name: "รองเท้า Puma Dribble", price: "฿2,740", image: "images/product3.png" },
    { id: 4, name: "Apple iPhone 15", price: "฿25,900", image: "images/product4.png" },
    { id: 5, name: "Agnesi Chifferi Rigati No.50 แอคเนซี ชิฟเฟอรี ริกาติ เบอร์ 50 พาสต้าข้องอ 500 กรัม", price: "฿91", image: "images/product5.png" },
    { id: 6, name: "Adidas Samba OG", price: "฿4,790", image: "images/product6.png" },
    { id: 7, name: "Kawa โซฟาผ้า 3 ที่นั่ง", price: "฿16,200", image: "images/product7.png" },

    // More products as needed...
  ];

const productsPerRow = 6; // Number of products per row
const rowsPerPage = 10; // Number of rows per page
const productsPerPage = productsPerRow * rowsPerPage; // Total products per page

let currentPage = 1; // Current page being displayed
let currentLoadedProducts = 0; // Count of products loaded on the current page

const productGrid = document.getElementById("product-grid");
const pagination = document.getElementById("pagination");

// Create the product card HTML structure
function createProductCard(product) {
    const maxNameLength = 20; // ตั้งค่าจำนวนตัวอักษรสูงสุด
    const shortName = product.name.length > maxNameLength 
        ? product.name.substring(0, maxNameLength) + "..." 
        : product.name;

    return `
        <div class="product-card">
            <a href="products/product_page${product.id}.html"> 
                <img src="${product.image}" alt="${product.name}">
            </a>
            <div class="product-info">
                <h3 title="${product.name}">${shortName}</h3>
                <p>${product.description || "No description available."}</p>
                <p class="price">${product.price}</p>
                <a href="products/product_page${product.id}.html" class="details-btn">View Details</a>
            </div>
        </div>
    `;
}




// Load products dynamically based on the current page
function loadProducts() {
    const start = (currentPage - 1) * productsPerPage;
    const end = Math.min(start + productsPerPage, products.length);

    // Clear the grid and load products for the current page
    productGrid.innerHTML = '';

    for (let i = start; i < end; i++) {
        productGrid.innerHTML += createProductCard(products[i]);
    }

    // After loading, remove the scroll listener to prevent infinite scroll beyond the last page
    if (currentPage * productsPerPage >= products.length) {
        window.removeEventListener("scroll", handleScroll);
    }

    renderPagination(); // Update pagination after loading products
}

// Render the pagination buttons
function renderPagination() {
    const totalPages = Math.ceil(products.length / productsPerPage);
    pagination.innerHTML = '';

    // Create pagination buttons
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("page-btn");
        if (i === currentPage) {
            button.classList.add("active");
        }
        button.addEventListener("click", () => goToPage(i));
        pagination.appendChild(button);
    }
}

// Go to the selected page
function goToPage(pageNumber) {
    currentPage = pageNumber;
    currentLoadedProducts = (pageNumber - 1) * productsPerPage;
    loadProducts();

    // Scroll to the top of the page smoothly after changing pages
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Infinite scroll functionality
function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        if (currentLoadedProducts < products.length) {
            loadProducts();
        }
    }
}

// Initial product load and scroll event listener for infinite scroll
document.addEventListener("DOMContentLoaded", function () {
    loadProducts(); // Initial product load
    window.addEventListener("scroll", handleScroll); // Enable infinite scroll
});

document.getElementById("sort").addEventListener("change", function() {
    const sortValue = this.value;

    if (sortValue === "price-low") {
        products.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
    } else if (sortValue === "price-high") {
        products.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
    }

    loadProducts(); // โหลดสินค้าใหม่หลังจากเรียงลำดับ
});

// ฟังก์ชันแปลงราคาจาก "฿1,000" -> 1000
function extractPrice(priceString) {
    return parseInt(priceString.replace(/[^\d]/g, ""), 10);
}
