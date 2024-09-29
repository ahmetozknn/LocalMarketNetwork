document.getElementById('add-producer-button').addEventListener('click', function() {
    // Formdaki değerleri al
    const producerName = document.getElementById('producer-name').value;
    const phoneNumber = document.getElementById('phone-number').value; // Telefon numarası
    const groupNo = document.getElementById('group-no').value; // Grup No

    // Eğer formda eksik alan varsa ekleme yapma
    if (!producerName || !phoneNumber || !groupNo) {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    // Kart objesi oluştur
    const producerData = {
        name: producerName,
        phone: phoneNumber,
        groupNo: groupNo
    };

    // localStorage'a kaydet
    let producers = JSON.parse(localStorage.getItem('producers')) || [];
    producers.push(producerData);
    localStorage.setItem('producers', JSON.stringify(producers));

    // Kartı sayfaya ekle
    addProducerCard(producerData);

    // Formu temizle
    document.getElementById('producer-name').value = '';
    document.getElementById('phone-number').value = '';
    document.getElementById('group-no').value = '';
});

// Üretici kartını sayfaya ekleyen fonksiyon
function addProducerCard(producerData) {
    const newProducerCard = document.createElement('div');
    newProducerCard.classList.add('product-card');

    newProducerCard.innerHTML = `
        <div class="product-card-inside">
            <div class="product-producer">
                <h3>${producerData.name}</h3>
            </div>
            <div class="producer-communication">
                <span>Tel No: ${producerData.phone}</span>
                <span>Grup No: ${producerData.groupNo}</span>
            </div>
            <div class="button">
                <button class="delete-product">Sil</button>
            </div>
        </div>
    `;

    newProducerCard.querySelector('.delete-product').addEventListener('click', function() {
        newProducerCard.remove();
        removeProducerFromStorage(producerData);
    });

    document.getElementById('producer-container').appendChild(newProducerCard);
}

// localStorage'daki üreticileri yükleme
window.onload = function() {
    let producers = JSON.parse(localStorage.getItem('producers')) || [];
    producers.forEach(function(producer) {
        addProducerCard(producer);
    });
};

function removeProducerFromStorage(producerToRemove) {
    let producers = JSON.parse(localStorage.getItem('producers')) || [];
    producers = producers.filter(producer => producer.name !== producerToRemove.name || producer.phone !== producerToRemove.phone);
    localStorage.setItem('producers', JSON.stringify(producers));
}
