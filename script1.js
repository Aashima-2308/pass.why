// Step 1: HTML Elements select kar rahe hain
const passwordInput = document.getElementById('pwdinput');
const continueBtn = document.getElementById('continueButton');

// Step 2: Button ke click par event listener lagayein
continueBtn.addEventListener('click', function () {
    // Input se password read kar rahe hain
    const enteredPassword = passwordInput.value;

    // Validation 1: Agar input empty ho
    if (enteredPassword === "") {
        alert("Please enter a password first!");
        return;
    }

    // 🎯 Validation 2: Regex check - Sirf Uppercase (A-Z) allow karega
    const isOnlyUppercase = /^[A-Z]+$/.test(enteredPassword);

    if (!isOnlyUppercase) {
        alert("⚠️ Invalid Password! Only UPPERCASE letters (A-Z) are allowed. Numbers, lowercase letters, spaces & special characters are not accepted.");
        return; // Next page par jaane se rok do
    }

    // Step 3: Password ko LocalStorage mein save kar rahe hain
    localStorage.setItem('userPassword', enteredPassword);

    // Step 4: Next page par navigate karna
    window.location.href = "useless2.html"; 
});
