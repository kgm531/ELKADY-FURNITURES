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
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.marginBottom = '10px';

        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 10px; border-radius: 8px;">
            <div style="flex: 1;">
                <div><strong>${item.name}</strong></div>
                <div>${item.price} جنيه</div>
            </div>
            <span class="remove" onclick="removeFromCart(${index})" style="color: red; cursor: pointer; margin-left: 10px;">🗑️</span>
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

    cart.forEach((item, index) => {
        message += `🛒 منتج رقم ${index + 1}\n`;
        message += `${item.name}\n`;
        message += `السعر: ${item.price} جنية\n`;
        message += `صورة المنتج: ${item.image}\n\n`;
    });

    let totalPrice = cart.reduce((total, item) => total + item.price, 0);
    message += `🧮 المجموع الكلي: ${totalPrice} جنية`;

    let phoneNumber = '201225406810';
    
    // فقط ترميز نص الرسالة (وليس الروابط)
    let encodedMessage = encodeURIComponent(message);
    
    let url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(url, '_blank');
}
