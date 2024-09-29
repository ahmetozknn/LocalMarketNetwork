// Öne Çıkanlar Bölümü
const featuredImages = document.querySelectorAll('.one-cikaranlar-content'); // Öne çıkan içerikleri seçiyoruz
let featuredIndex = 0; // Başlangıç indeksi

function updateCheckboxes(sectionId, index) {
    const checkboxes = document.querySelectorAll(`#${sectionId} input[type="radio"]`);
    checkboxes.forEach((checkbox, i) => {
        checkbox.checked = (i === index); // Yalnızca şu anki indeksli checkbox işaretlenecek
    });
}

function updateVisibility(items, index) {
    items.forEach((item, i) => {
        item.style.display = (i === index) ? 'block' : 'none'; // Sadece o andaki indeks görünür olacak
    });
}


document.getElementById('right-arrow1').addEventListener('click', function () {
    featuredIndex = (featuredIndex + 1) % featuredImages.length; // Sonraki içeriğe geçiş
    updateVisibility(featuredImages, featuredIndex);
    updateCheckboxes('featured-form', featuredIndex);
});


document.getElementById('left-arrow1').addEventListener('click', function () {
    featuredIndex = (featuredIndex - 1 + featuredImages.length) % featuredImages.length;
    updateVisibility(featuredImages, featuredIndex);
    updateCheckboxes('featured-form', featuredIndex);
});


const newsContents = document.querySelectorAll('.haberler-content');
let newsIndex = 0;

document.getElementById('right-arrow2').addEventListener('click', function () {
    newsIndex = (newsIndex + 1) % newsContents.length;
    updateVisibility(newsContents, newsIndex);
    updateCheckboxes('news-form', newsIndex);
});

document.getElementById('left-arrow2').addEventListener('click', function () {
    newsIndex = (newsIndex - 1 + newsContents.length) % newsContents.length;
    updateVisibility(newsContents, newsIndex);
    updateCheckboxes('news-form', newsIndex);
});

// Blog Bölümü
const blogContents = document.querySelectorAll('.blog-content');
let blogIndex = 0;

document.getElementById('right-arrow2').addEventListener('click', function () {
    blogIndex = (blogIndex + 1) % blogContents.length;
    updateVisibility(blogContents, blogIndex);
    updateCheckboxes('blog-form', blogIndex);
});

document.getElementById('left-arrow2').addEventListener('click', function () {
    blogIndex = (blogIndex - 1 + blogContents.length) % blogContents.length;
    updateVisibility(blogContents, blogIndex);
    updateCheckboxes('blog-form', blogIndex);
});


function addCheckboxListeners(sectionId, items) {
    const checkboxes = document.querySelectorAll(`#${sectionId} input[type="radio"]`);
    checkboxes.forEach((checkbox, i) => {
        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                updateVisibility(items, i);

                updateCheckboxes(sectionId, i);
            }
        });
    });
}


addCheckboxListeners('featured-form', featuredImages);
addCheckboxListeners('news-form', newsContents);
addCheckboxListeners('blog-form', blogContents);


