// Step 1: HTML Elements select kar rahe hain
const passwordInput = document.getElementById('pwdinput');
const continueBtn = document.getElementById('continueButton');

// 🎯 NEW FEATURE: Live Uppercase Filtering (A-Z only allow karega)
passwordInput.addEventListener('input', function () {
    // Current input ko uppercase me convert karke non-A-Z characters remove kar do
    this.value = this.value.toUpperCase().replace(/[^A-Z]/g, '');
});

// Step 2: Button ke click par event listener lagayein
continueBtn.addEventListener('click', function () {
    // Input se password read kar rahe hain
    const enteredPassword = passwordInput.value;

    // Validation: Agar user ne bina kuch likhe button daba diya
    if (enteredPassword === "") {
        alert("Please enter a valid password (UPPERCASE A-Z only)!");
        return; // Function ko yahin rok do
    }

    // Step 3: Password ko LocalStorage mein save kar rahe hain
    localStorage.setItem('userPassword', enteredPassword);

    // Step 4: Next page par navigate karna
    window.location.href = "useless2.html"; 
});
