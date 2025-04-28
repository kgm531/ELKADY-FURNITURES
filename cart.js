// مصفوفة لتخزين العناصر في العربة
let cart = [];

// دالة لإضافة منتج إلى العربة
function addToCart(productName, productPrice, productImage) {
    cart.push({ name: productName, price: productPrice, image: productImage });
    updateCartCount();
    updateCartItems();
    updateTotalPrice();
}

// دالة لتحديث عدد العناصر في العربة
function updateCartCount() {
    let cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.length;
}

// دالة لتحديث محتويات العربة
function updateCartItems() {
    let cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';

    cart.forEach((item, index) => {
        let li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - ${item.price} جنيه
            <span class="remove" onclick="removeFromCart(${index})">حذف</span>
        `;
        cartItemsList.appendChild(li);
    });
}

// دالة لحساب المجموع الإجمالي
function updateTotalPrice() {
    let totalPrice = cart.reduce((total, item) => total + item.price, 0);
    document.getElementById('total-price').innerText = totalPrice;
}

// دالة لحذف منتج من العربة
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartItems();
    updateTotalPrice();
}

// دالة لفتح نافذة العربة
function toggleCart() {
    let modal = document.getElementById('cart-modal');
    modal.classList.toggle('open');
}

// دالة لإغلاق نافذة العربة
function closeCart() {
    let modal = document.getElementById('cart-modal');
    modal.classList.remove('open');
}

// دالة لإتمام عملية الشراء
function checkout() {
    if (cart.length === 0) {
        alert('العربة فارغة');
    } else {
        alert('تم إتمام الطلب بنجاح');
        cart = [];
        updateCartCount();
        updateCartItems();
        updateTotalPrice();
    }
}

// دالة لإرسال الطلب عبر WhatsApp
function sendOrderToWhatsApp() {
    if (cart.length === 0) {
        alert('العربة فارغة');
        return;
    }

    let message = 'تفاصيل الطلب:\n\n';

    cart.forEach(item => {
        // ترميز اسم الصورة حتى لا يحدث خطأ بسبب الفراغات
        let encodedImage = encodeURIComponent(item.image);
        let imageUrl = `${window.location.origin}/${encodedImage}`;

        message += `${item.name}\n`;
        message += `السعر: ${item.price} جنية\n`;
        message += `صورة المنتج: ${imageUrl}\n\n`;
    });

    let totalPrice = cart.reduce((total, item) => total + item.price, 0);
    message += `المجموع الكلي: ${totalPrice} جنية`;

    let phoneNumber = '201225406810';
    let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
}
