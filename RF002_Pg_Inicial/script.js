document.addEventListener('DOMContentLoaded', () => {
    const openCartBtn = document.getElementById('open-cart');
    const closeCartBtn = document.getElementById('close-cart');
    const sideCart = document.getElementById('side-cart');
    const overlay = document.getElementById('cart-overlay');
    const cartItemsWrapper = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    let cart = [];

    function toggleCart() {
        sideCart.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    if(openCartBtn) openCartBtn.onclick = (e) => { e.preventDefault(); toggleCart(); };
    if(closeCartBtn) closeCartBtn.onclick = toggleCart;
    if(overlay) overlay.onclick = toggleCart;

    document.querySelectorAll('.btn-add').forEach(button => {
        button.onclick = function() {
            const card = this.closest('.card');
            const title = card.querySelector('.product-title').innerText;
            const img = card.querySelector('.product-img').src;
            
            const existingItem = cart.find(item => item.title === title);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: Date.now(),
                    title: title,
                    img: img,
                    price: 25.00,
                    quantity: 1
                });
            }
            updateUI();
        };
    });

    window.removeFromCart = function(id) {
        cart = cart.filter(item => item.id !== id);
        updateUI();
    };

    window.changeQty = function(id, delta) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) removeFromCart(id);
            else updateUI();
        }
    };

    function updateUI() {
        // 1. Atualiza contador da Nav
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCount.innerText = totalItems;
        
        // 2. Atualiza os crachás (badges) nos cards da página principal
        document.querySelectorAll('.card').forEach(card => {
            const title = card.querySelector('.product-title').innerText;
            const badge = card.querySelector('.card-qty-badge');
            const itemInCart = cart.find(item => item.title === title);

            if (itemInCart && badge) {
                badge.innerText = `${itemInCart.quantity} no carrinho`;
                badge.classList.add('active');
            } else if (badge) {
                badge.classList.remove('active');
            }
        });

        // 3. Renderiza itens na aba lateral
        if (cart.length === 0) {
            cartItemsWrapper.innerHTML = '<p style="text-align:center; color:#888; margin-top:20px;">Vazio...</p>';
        } else {
            cartItemsWrapper.innerHTML = cart.map((item) => `
                <div class="cart-item-row">
                    <img src="${item.img}" style="width: 40px; height: 40px; object-fit: contain;">
                    <div style="flex-grow: 1;">
                        <p style="margin: 0; font-weight: bold; font-size: 14px;">${item.title}</p>
                        <p style="margin: 0; color: #41beb1; font-size: 13px;">R$ ${(item.price * item.quantity).toFixed(2)}</p>
                        <div style="display: flex; align-items: center; gap: 10px; margin-top: 5px;">
                            <button onclick="changeQty(${item.id}, -1)" style="border:1px solid #ddd; background:none; border-radius:5px; width:25px; cursor:pointer;">-</button>
                            <span style="font-size: 14px; font-weight: bold;">${item.quantity}</span>
                            <button onclick="changeQty(${item.id}, 1)" style="border:1px solid #ddd; background:none; border-radius:5px; width:25px; cursor:pointer;">+</button>
                        </div>
                    </div>
                    <button class="btn-remove" onclick="removeFromCart(${item.id})">🗑️</button>
                </div>
            `).join('');
        }

        const totalMoney = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        cartTotal.innerText = `R$ ${totalMoney.toFixed(2)}`;
    }
});