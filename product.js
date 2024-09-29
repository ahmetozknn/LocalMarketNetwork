
function filterProducts() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    const producerFilters = document.querySelectorAll('.filter-li input[type="checkbox"]:not(.category-filter)');
    const products = document.querySelectorAll('.product-card'); // Tüm product-card sınıfına sahip ürünler
    const activeCategories = Array.from(categoryFilters).filter(checkbox => checkbox.checked).map(checkbox => checkbox.name);
    const activeProducers = Array.from(producerFilters).filter(checkbox => checkbox.checked).map(checkbox => checkbox.name);

    products.forEach(product => {
        const productCategories = Array.from(product.classList); // Ürün sınıfları (kategori veya üretici)
        const productProducers = Array.from(product.classList); // Aynı class'tan üretici

        const categoryMatch = activeCategories.length === 0 || activeCategories.some(filter => productCategories.includes(filter));
        const producerMatch = activeProducers.length === 0 || activeProducers.some(filter => productProducers.includes(filter));


        if (categoryMatch && producerMatch) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
});


filterProducts();

document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById('products-container');
    const addButton = document.getElementById('add-product-button');

    if (!productsContainer || !addButton) {
        console.error('Ürünler konteyneri veya ekleme butonu bulunamadı.');
        return;
    }


    function saveProductToLocalStorage(productData) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(productData);
        localStorage.setItem('products', JSON.stringify(products));
    }


    function loadProductsFromLocalStorage() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.forEach((productData, index) => {
            createProductCard(productData, index);
        });
    }

    function createProductCard(productData, index) {
        const newProductCard = document.createElement('div');
        newProductCard.className = `product-card ${productData.class || 'default-class'} ${productData.producer || 'default-class'}`; // Üretici sınıfı ekleniyor
        newProductCard.setAttribute('data-index', index);
    
        newProductCard.innerHTML = `
            <div class="product-card-inside">
                <div class="product-image">
                    <img src="${productData.image}" alt="Ürün Görseli">
                </div>
                <div class="product-text">
                    <p>${productData.description}</p>
                </div>
                <div class="product-price">
                    <section class="text">Fiyat: ${productData.price} TL</section>
                </div>
                <div class="button">
                    <button class="product-button"><a href="producer.html" class="product-a">Bilgi Al </a></button>
                    <button class="delete-product">Sil</button>
                </div>
            </div>
        `;
    
        newProductCard.querySelector('.delete-product').addEventListener('click', function () {
            deleteProduct(index);
        });
    
        productsContainer.appendChild(newProductCard);
    }
    
    
    function deleteProduct(index) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));



        productsContainer.innerHTML = '';
        loadProductsFromLocalStorage();
    }



    loadProductsFromLocalStorage();

    addButton.addEventListener('click', function () {
        const productImageInput = document.getElementById('product-image');
        const productClassSelect = document.getElementById('products');
        const productDescriptionInput = document.getElementById('product-description');
        const productPriceInput = document.getElementById('product-price');
        const producerSelect = document.getElementById('producer-name'); // Üretici seçimi
    
        if (!productImageInput || !productClassSelect || !productDescriptionInput || !productPriceInput || !producerSelect) {
            console.error('Form elemanları bulunamadı.');
            return;
        }
    
        const imageSrc = productImageInput.files.length > 0
            ? URL.createObjectURL(productImageInput.files[0])
            : 'path/to/placeholder-image.jpg';
    
        const productData = {
            image: imageSrc,
            class: productClassSelect.value,
            producer: producerSelect.value, // Üretici bilgisini ekliyoruz
            description: productDescriptionInput.value,
            price: productPriceInput.value
        };
    
        createProductCard(productData);
        saveProductToLocalStorage(productData);
    
        productImageInput.value = '';
        productClassSelect.value = 'Gida';
        producerSelect.value = ''; // Üretici seçimini sıfırlıyoruz
        productDescriptionInput.value = '';
        productPriceInput.value = '';
    });
    
});

// MenuBtn Filtreleme
const menuBtn = document.getElementById('menuBtn');
const filterSidebar = document.querySelector('.filter-sidebar');

menuBtn.addEventListener('change', function () {
    if (menuBtn.checked) {
        filterSidebar.style.display = 'block';
        filterSidebar.style.transform = 'translateX(0)';
    } else {
        filterSidebar.style.display = 'none';
        filterSidebar.style.transform = 'translateX(100%)';
    }
});
