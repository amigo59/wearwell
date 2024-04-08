//Script.js
document.addEventListener('DOMContentLoaded', fetchProducts);

document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Récupérer les valeurs des champs du formulaire
    const productName = document.getElementById('productName').value;
    const brandId = parseInt(document.getElementById('brandId').value, 10);
    const categoryId = parseInt(document.getElementById('categoryId').value, 10);
    const description = document.getElementById('description').value;
    const price = parseFloat(document.getElementById('price').value);
    const imageUrl = document.getElementById('imageUrl').value;
    const dateAdded = document.getElementById('dateAdded').value;
    const materialInfo = document.getElementById('materialInfo').value;
    const sustainabilityScoreId = parseInt(document.getElementById('sustainabilityScoreId').value, 10);
    const sexe = document.getElementById('sexe').value;

    addProduct(productName, brandId, categoryId, description, price, imageUrl, dateAdded, materialInfo, sustainabilityScoreId, sexe);
});

function fetchProducts() {
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const list = document.getElementById('products-list');
            list.innerHTML = ''; // Effacer les entrées précédentes pour éviter les doublons
            data.forEach(product => {
                console.log(`${product.ProductName}`); // Log de l'URL de l'image ici
                const item = document.createElement('li');
                item.innerHTML = `
                    <img src="../assets/${product.ImageURL}" alt="${product.ProductName}" style="width:100px; height:100px;">
                    <h3>${product.ProductName}</h3>
                    <p>${product.Description}</p>
                    <p>Prix: ${product.Price} €</p>
                    <p>Score de durabilité: ${product.SustainabilityScoreId}</p>
                    <p>Sexe: ${product.Sexe}</p>  <!-- Ajouté en exemple -->
                `;
                list.appendChild(item);
            });

        })
        .catch(error => console.error('Erreur:', error));
}


function addProduct(productName, brandId, categoryId, description, price, imageUrl, dateAdded, materialInfo, sustainabilityScoreId, sexe) {
    console.log('Sending product data:', {
        productname: productName,
        brandId: brandId,
        categoryId: categoryId,
        description: description,
        price: price,
        imageUrl: imageUrl,
        dateAdded: dateAdded,
        materialInfo: materialInfo,
        sustainabilityScoreId: sustainabilityScoreId,
        sexe: sexe
    });
    fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productname: productName,
            brandId: brandId,
            categoryId: categoryId,
            description: description,
            price: price,
            imageUrl: imageUrl,
            dateAdded: dateAdded,
            materialInfo: materialInfo,
            sustainabilityScoreId: sustainabilityScoreId,
            sexe: sexe
        }),
    })
    .then(response => {
        if (!response.ok) {
            // Log l'erreur ou rejette une nouvelle erreur
            throw new Error('La requête a échoué avec le statut ' + response.status);
        }
        return response.json();
    })

    .then(product => {
        console.log('Produit ajouté avec succès:', product.productid);
        // Après avoir ajouté le produit, notifier les utilisateurs
        if (product && product.productid) {
            notifyUsersOfNewProduct(product.productid, brandId);
        }
        fetchProducts(); // Recharger la liste des produits après l'ajout
    })
    .catch(error => console.error('Erreur:', error));
}

function notifyUsersOfNewProduct(newProductId, brandId) {
    console.log('Notifying users for new product. Product ID:', newProductId, 'Brand ID:', brandId);
    fetch('http://localhost:3000/notifications/notifyNewProduct', { // Assurez-vous que l'URL est correcte ici
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            newProductId: newProductId,
            brandId: brandId
        }),
    })
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch(error => console.error('Erreur lors de la notification des utilisateurs:', error));
}




