let products = JSON.parse(localStorage.getItem("products")) || [];

// Load awal
window.onload = function () {
    loadProducts();
    const user = localStorage.getItem("user");
    if (user) showDashboard(user);
};

function login() {
    const username = document.getElementById("username").value;
    if (!username) {
        alert("Masukkan nama pengguna");
        return;
    }
    localStorage.setItem("user", username);
    showDashboard(username);
}

function showDashboard(user) {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    document.getElementById("userName").innerText = user;
}

function logout() {
    localStorage.removeItem("user");
    location.reload();
}

function addProduct() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const address = document.getElementById("productAddress").value;
    const rating = document.getElementById("productRating").value;
    const imageFile = document.getElementById("productImage").files[0];

    if (!name || !price || !address || !rating || !imageFile) {
        alert("Lengkapi semua data!");
        return;
    }

    if (rating < 1 || rating > 10) {
        alert("Rating harus 1 - 10");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const product = {
            name,
            price,
            address,
            rating,
            image: reader.result
        };

        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
        loadProducts();
    };
    reader.readAsDataURL(imageFile);
}

function loadProducts(filtered = products) {
    const list = document.getElementById("productList");
    list.innerHTML = "";

    filtered.forEach(p => {
        list.innerHTML += `
            <div class="product">
                <img src="${p.image}">
                <b>${p.name}</b><br>
                Harga: Rp ${p.price}<br>
                Alamat: ${p.address}<br>
                <span class="rating">Rating: ${p.rating}/10</span>
            </div>
        `;
    });
}

function searchProduct() {
    const keyword = document.getElementById("search").value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(keyword)
    );
    loadProducts(filtered);
}
