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
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.length;
}

// دالة لتحديث محتويات العربة
function updateCartItems() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = ''; // مسح المحتوى القديم

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - ${item.price} ريال
            <span class="remove" onclick="removeFromCart(${index})">حذف</span>
        `;
        cartItemsList.appendChild(li);
    });
}

// دالة لحساب المجموع الإجمالي
function updateTotalPrice() {
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
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
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('open');
}

// دالة لإغلاق نافذة العربة
function closeCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.remove('open');
}

// دالة لإتمام عملية الشراء
function checkout() {
    if (cart.length === 0) {
        alert('العربة فارغة');
    } else {
        alert('تم إتمام الطلب بنجاح');
        cart = []; // مسح العربة بعد إتمام الطلب
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

    let message = '🛒 تفاصيل الطلب:\n\n';

    cart.forEach(item => {
        message += `🔸 ${item.name}\n💰 السعر: ${item.price} ريال\n`;
        if (item.image) {
            const imageUrl = item.image.startsWith('http') ? item.image : `${window.location.origin}/${item.image}`;
            message += `🖼️ صورة المنتج: ${imageUrl}\n`;
        }
        message += '\n'; // سطر فارغ بين المنتجات
    });

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    message += `\n🔻 المجموع الكلي: ${totalPrice} ريال 🔻`;

    const phoneNumber = '201225406810'; // رقم الهاتف مع كود الدولة
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
}
