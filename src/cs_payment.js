document.addEventListener('DOMContentLoaded', function() {
    // Get the cart container element
    const cartList = document.querySelector('.list-group.mb-3');
    const badgePill = document.querySelector('.badge.badge-secondary.badge-pill');

    // Read cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    // Clear the current content of the cart list
    cartList.innerHTML = '';

    // Iterate over cart items and create new list items
    cart.forEach(item => {
        const { name, quantity, price } = item; // Destructuring assignment
        const itemPrice = parseFloat(price) * parseInt(quantity);
        total += itemPrice; // Add to the total price

        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between lh-condensed';

        // Create a form for each cart item
        const form = document.createElement('form');
        form.innerHTML = `
            <div class="form-group mb-0 flex-grow-1">
                <h6 class="my-0">${name}</h6>
                <small class="text-muted">Quantity:</small>
                <input type="number" min="0" value="${quantity}" class="form-control form-control-sm d-inline-block w-auto">
            </div>
            <span class="text-muted item-price">$${itemPrice.toFixed(2)}</span>
        `;

        // Listen for changes in the quantity input
        form.querySelector('input[type=number]').addEventListener('change', (event) => {
            const newQuantity = event.target.value;
            updateQuantity(name, newQuantity, listItem, form);
        });

        listItem.appendChild(form);
        cartList.appendChild(listItem);
    });

    // Function to update quantity of an item
    function updateQuantity(name, quantity, listItem, form) {
        const item = cart.find(i => i.name === name);
        if (item) {
            item.quantity = quantity;
            const newPrice = parseFloat(item.price) * parseInt(item.quantity);
            form.querySelector('.item-price').textContent = `$${newPrice.toFixed(2)}`;
            saveCartToStorage(cart); // Save the updated cart
            updateTotal(); // Update the total displayed
        }
    }

    // Update the total price and badge
    function updateTotal() {
        const total = cart.reduce((acc, item) => acc + (parseFloat(item.price) * parseInt(item.quantity)), 0);
        badgePill.textContent = cart.reduce((acc, item) => acc + parseInt(item.quantity), 0); // Update the total quantity
        document.querySelector('.cart-total').textContent = `$${total.toFixed(2)}`;
    }

    // Function to save the cart to local storage
    function saveCartToStorage(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        badgePill.textContent = cart.length; // Update badge with the number of items
    }

    // Create a total item
    const totalItem = document.createElement('li');
    totalItem.className = 'list-group-item d-flex justify-content-between';
    totalItem.innerHTML = `
        <span>Total (USD)</span>
        <strong class="cart-total">$${total.toFixed(2)}</strong>
    `;
    cartList.appendChild(totalItem);
});
