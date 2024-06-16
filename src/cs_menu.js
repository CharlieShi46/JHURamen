document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.getElementById('cartButton');
    const cartDropdown = document.getElementById('cartDropdown');
    const cartItemsList = document.getElementById('cartItemsList');
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartBadge() {
        const badge = document.getElementById('cartCount');
        badge.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }

    updateCartBadge();

    function saveCartToStorage() {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartBadge();
    }

    function updateQuantity(itemName, quantity) {
        const item = cartItems.find(item => item.name === itemName);
        if (item) {
            item.quantity = quantity;
            if (item.quantity === 0) {
                cartItems = cartItems.filter(i => i.name !== itemName);
                item.element.remove();
            }
            saveCartToStorage();
        }
    }

    function createCartItemElement(item) {
        const listItem = document.createElement('li');
        listItem.className = 'cart-item';

        // Product name and price display
        const textSpan = document.createElement('span');
        textSpan.textContent = `${item.name} - $${item.price}`;
        listItem.appendChild(textSpan);

        const form = document.createElement('form');
        form.className = 'cart-item-form';

        // Minus button
        const minusButton = document.createElement('button');
        minusButton.type = 'button';
        minusButton.textContent = '-';
        minusButton.addEventListener('click', function() {
            const newQuantity = Math.max(item.quantity - 1, 0);
            quantityInput.value = newQuantity;
            quantityInput.dispatchEvent(new Event('change'));
        });

        // Quantity input
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = '0';
        quantityInput.max = '99';
        quantityInput.className = 'quantity-input';

        // Plus button
        const plusButton = document.createElement('button');
        plusButton.type = 'button';
        plusButton.textContent = '+';
        plusButton.addEventListener('click', function() {
            const newQuantity = Math.min(item.quantity + 1, 99);
            quantityInput.value = newQuantity;
            quantityInput.dispatchEvent(new Event('change'));
        });

        form.appendChild(minusButton);
        form.appendChild(quantityInput);
        form.appendChild(plusButton);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        quantityInput.addEventListener('change', () => {
            const newQuantity = parseInt(quantityInput.value, 10);
            updateQuantity(item.name, newQuantity);
            if (newQuantity === 0) {
                listItem.remove();
            }
        });

        listItem.appendChild(form);

        item.element = listItem; // Store the reference to the list item for later updates

        return listItem;
    }

    document.querySelectorAll('.pricing-button').forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productInfo = button.closest('.pricing-plan');
            const itemName = productInfo.querySelector('.pricing-header').textContent;
            const itemPrice = productInfo.querySelector('.pricing-price').textContent.replace('$', '');
            const existingItem = cartItems.find(item => item.name === itemName);
            if (existingItem) {
                existingItem.quantity++;
                const itemForm = existingItem.element.querySelector('form');
                const inputField = itemForm.querySelector('.quantity-input');
                inputField.value = existingItem.quantity;
            } else {
                const newItem = { name: itemName, price: itemPrice, quantity: 1 };
                cartItems.push(newItem);
                const newItemElement = createCartItemElement(newItem);
                cartItemsList.appendChild(newItemElement);
            }
            saveCartToStorage();
            alert(itemName + ' added to cart!');
        });
    });

    document.getElementById('checkoutButton').addEventListener('click', function() {
        window.location.href = 'cs_payment.html';
    });

    cartButton.addEventListener('click', function() {
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    });

    cartItems.forEach(item => cartItemsList.appendChild(createCartItemElement(item)));
    updateCartBadge();
});
