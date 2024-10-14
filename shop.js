window.onload = function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="null">        
                <p class="null-p">Sepetiniz boş.</p> 
            </div>
        `;
    } else {
        cart.forEach((product, index) => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product-shop");

            productDiv.innerHTML = `
                <div class="shopping-img">
                    <img src="${product.image}" alt="${product.name}" class="shop-img">
                </div>
                <div class="shopping-about">
                    <p class="shopping-p">${product.description}</p>
                </div>
                <div class="form-shop">
                    <form action="">
                        <input type="number" placeholder="Kaç Adet(Gram-Adet)" min="0" class="form-input">
                    </form>
                </div>
                <div class="shopping-price">
                    <p>Fiyat: ${product.price}</p>
                </div>
                <div class="shopping-button">
                    <button class="shopping-buy">Satın Al</button>
                    <button class="remove-button" onclick="removeFromCart(${index})">
                        <i class="fa-solid fa-x"></i>
                    </button>
                </div>
            `;
            cartContainer.appendChild(productDiv);

 
            const buyButton = productDiv.querySelector(".shopping-buy");
            const inputField = productDiv.querySelector(".form-input");

            buyButton.addEventListener("click", function() {
                if (inputField.value == 0) {
                    alert("0 Adet Satın Alamazsınız");
                    inputField.value = ""; 
                    inputField.focus();
                } else {
                    console.log("Geçerli bir değer girildi:", inputField.value);
                    
                }
            });
        });
    }
};

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); 
    localStorage.setItem("cart", JSON.stringify(cart)); 

    window.location.reload(); 
}
