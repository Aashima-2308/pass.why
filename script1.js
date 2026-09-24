// Step 1: HTML Elements select kar rahe hain
const passwordInput = document.getElementById('pwdinput');
const continueBtn = document.getElementById('continueButton');

// Step 2: Button ke click par event listener lagayein
continueBtn.addEventListener('click', function () {
    // Input se password read kar rahe hain
    const enteredPassword = passwordInput.value;

    // Validation: Agar user ne bina kuch likhe button daba diya
    if (enteredPassword === "") {
        alert("Please enter a password first!");
        return; // Function ko yahin rok do
    }

    // Step 3: Password ko LocalStorage mein save kar rahe hain
    localStorage.setItem('userPassword', enteredPassword);

    // Step 4: Next page par navigate karna
    // (Aapke Page 2 ke HTML file ka jo bhi naam ho, yahan woh likho)
    window.location.href = "useless2.html"; 
});
