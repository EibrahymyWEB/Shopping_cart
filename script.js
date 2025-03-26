document.addEventListener("DOMContentLoaded", function () {
    const productFormContainer = document.getElementById("productFormContainer");
    const productForm = document.getElementById("productForm");
    const productContainer = document.getElementById("productContainer");
    const cartDropdown = document.getElementById("cartDropdown");
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const totalPrice = document.getElementById("totalPrice");

    let products = [];
    let cart = [];

    document.getElementById("newProductBtn").addEventListener('click', function () {
        productFormContainer.style.display = 'block';
    });

    document.getElementById("cancelBtn").addEventListener('click', function () {
        productFormContainer.style.display = 'none';
    });

    productForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const titre = document.getElementById("productTitle").value;
        const prix = parseFloat(document.getElementById("productPrice").value);
        const imageFile = document.getElementById("productImage").files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const newProduct = {
                id: Date.now(),
                titre: titre,
                prix: prix,
                image: e.target.result
            };
            products.push(newProduct);
            afficherProducts();
            productForm.reset();
            productFormContainer.style.display = 'none';
        };

        reader.readAsDataURL(imageFile);
    });

    function afficherProducts() {
        productContainer.innerHTML = "";
        products.forEach(product => {
            const div = document.createElement("div");
            div.classList.add("col-md-3", "my-3");
            div.innerHTML = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" style="height: 220px;">
                    <div class="card-body">
                        <h5 class="card-title">${product.titre}</h5>
                        <p class="card-text">${product.prix} dh</p>
                        <button class="btn btn-success add-to-cart-btn">Ajouter au panier</button>
                        <button class="btn btn-danger delete-btn">Supprimer</button>
                    </div>
                </div>
            `;
            div.querySelector(".add-to-cart-btn").addEventListener("click", () => addToCart(product));
            div.querySelector(".delete-btn").addEventListener("click", () => deleteProduct(product.id));
            productContainer.appendChild(div);
        });
    }

    function addToCart(product) {
        cart.push(product);
        updateCart();
    }

    function deleteProduct(id) {
        products = products.filter(product => product.id !== id);
        afficherProducts();
    }

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            total += item.prix;
            const div = document.createElement("div");
            div.classList.add("cart-item", "d-flex", "justify-content-between", "mb-2");
            div.innerHTML = `
                <span>${item.titre} - ${item.prix} dh</span>
                <button class="btn btn-sm btn-danger remove-cart-item">Supprimer</button>
            `;
            div.querySelector(".remove-cart-item").addEventListener("click", () => removeFromCart(item));
            cartItems.appendChild(div);
        });

        totalPrice.textContent = `${total} dh`;
        cartCount.textContent = cart.length;
    }

    function removeFromCart(product) {
        cart = cart.filter(item => item.id !== product.id);
        updateCart();
    }

    document.getElementById("cartIcon").addEventListener('click', function () {
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    });
});