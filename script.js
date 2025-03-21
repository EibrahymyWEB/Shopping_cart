



document.addEventListener("DOMContentLoaded", function () {
    const productFormContainer = document.getElementById("productFormContainer");
    const cancelBtn = document.getElementById("cancelBtn");
    const productForm = document.getElementById("productForm");
    const productContainer = document.getElementById("productContainer");

    let products = [];

    // Afficher le formulaire lorsqu'on clique sur "Nouveau Produit"
    document.getElementById("newProductBtn").addEventListener('click', function () {
        productFormContainer.style.display = 'block';  // Afficher le formulaire
    });

    // Masquer le formulaire lorsqu'on clique sur "Annuler"
    cancelBtn.addEventListener('click', function () {
        productFormContainer.style.display = 'none';  // Cacher le formulaire
    });

    // Ajouter un produit à la liste lorsque le formulaire est soumis
    productForm.addEventListener('submit', function (event) {
        event.preventDefault();  // Empêcher le rechargement de la page

        const titre = productForm['titre'].value;
        const image = productForm['image'].value;
        const prix = parseFloat(productForm['prix'].value);

        // Ajouter un produit à la liste
        const newProduct = { titre, image, prix };
        products.push(newProduct);

        // Masquer le formulaire après ajout
        productFormContainer.style.display = 'none';
        
        // Réinitialiser le formulaire
        productForm.reset();

        // Afficher la liste des produits
        afficherProducts();
    });

    // Fonction pour afficher les produits
    function afficherProducts() {
        productContainer.innerHTML = "";  // Réinitialiser la section des produits
        products.forEach(produit => {
            const div = document.createElement("div");
            div.classList.add("col-md-3", "my-3");
            div.innerHTML = `
                <div class="card">
                    <img src="${produit.image}" class="card-img-top" style="height: 220px;">
                    <div class="card-body">
                        <h5 class="card-title">${produit.titre}</h5>
                        <p class="card-text">${produit.prix} dh</p>
                        <button class="btn btn-success add-to-cart-btn">Ajouter au panier</button>
                        <button class="btn btn-danger delete-btn">Supprimer</button>
                    </div>
                </div>
            `;
            productContainer.appendChild(div);
        });
    }

    // Gérer l'ajout au panier (ici vous pouvez gérer l'événement du bouton "Ajouter au panier")
    productContainer.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains("add-to-cart-btn")) {
            // Ajouter au panier ici
            alert('Produit ajouté au panier');
        }
    });

    // Gérer la suppression des produits
    productContainer.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains("delete-btn")) {
            const card = event.target.closest(".card");
            const index = Array.from(productContainer.children).indexOf(card.parentElement.parentElement);
            products.splice(index, 1); // Retirer le produit de la liste
            afficherProducts(); // Réafficher la liste mise à jour
            alert('Produit supprimé !');
        }
    });
});