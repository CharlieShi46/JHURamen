function isValidCardNumber(number) {
    let sum = 0;
    let shouldDouble = false;

    // Loop through the number from right to left
    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number.charAt(i), 10);

        if (shouldDouble) {
            digit *= 2; // Double the digit
            if (digit > 9) {
                digit -= 9; // Subtract 9 if the doubled digit is more than 9
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble; // Flip the double flag for the next digit
    }

    // If the sum is divisible by 10, the card number is valid
    return sum % 10 === 0;
}

// Add event listener to the card number input
document.addEventListener('DOMContentLoaded', function() {
    const ccNumberInput = document.getElementById('cc-number');

    ccNumberInput.addEventListener('input', function() {
        // Remove spaces and hyphens to ensure only digits are processed
        const cardNumber = ccNumberInput.value.replace(/\s|-/g, '');

        // Check if the length is 16 digits and the card number is invalid according to the Luhn Algorithm
        if (cardNumber.length === 16 && !isValidCardNumber(cardNumber)) {
            alert('Card number is invalid');
            ccNumberInput.value = '';  // Clear the input field after displaying the alert
        }
    });
});
