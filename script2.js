


// 1. Get stored password
const storedPassword = localStorage.getItem("userPassword") || "HELLO";

// State tracking
let currentIndex = 0;
let clickCount = 0;

// Set initial random trigger between 1 and 10 clicks
let nextRandomTrigger = Math.floor(Math.random() * 10) + 1;

// Grab DOM elements
const pipelineContainer = document.getElementById("pipelineContainer");
const charDisplay = document.getElementById("currentChar");
const clickBtn = document.getElementById("clickBtn");

// Render Pipeline Boxes dynamically based on password length
function renderPipeline() {
    if (!pipelineContainer) return;
    pipelineContainer.innerHTML = "";
    
    for (let i = 0; i < storedPassword.length; i++) {
        const box = document.createElement("div");
        box.innerText = "•";
        if (i === 0) box.classList.add("active");
        pipelineContainer.appendChild(box);
    }
}

const statusMessages = [
    "LOL 🤣",
    "Noob 🤣",
    "Cooked FR 🥀",
    "Skill issue ngl 💀",
    "Touch grass maybe? 🌱",
    "Bro really thought he had it 🤡",
    "Let someone else try 😭",
    "Loser😭",
];

// Function to pick and display a random message
function updateFunnyStatus() {
    const statusBox = document.getElementById("funnyStatus");
    if (statusBox) {
        const randomIndex = Math.floor(Math.random() * statusMessages.length);
        statusBox.textContent = statusMessages[randomIndex];
    }
}

// Function to randomly move the button across screen
function moveButtonRandomly() {
    clickBtn.style.width = "200px"; 

    const maxX = window.innerWidth - 220; 
    const maxY = window.innerHeight - 80; 

    const randomX = Math.floor(Math.random() * Math.max(10, maxX));
    const randomY = Math.floor(Math.random() * Math.max(10, maxY));

    clickBtn.style.position = "fixed";
    clickBtn.style.left = randomX + "px";
    clickBtn.style.top = randomY + "px";
}

// Function to reset button position back to center/normal layout
function resetButtonPosition() {
    clickBtn.style.position = "static";
    clickBtn.style.width = "100%";
}

// Initial Pipeline Render
renderPipeline();


// Function to update the center box target character
// function updateTargetDisplay() {
//     const charBox = document.getElementById("currentChar");
//     if (charBox && storedPassword[currentIndex]) {
//         // Show current required target letter (e.g., 'H', then 'E', etc.)
//         charBox.textContent = storedPassword[currentIndex].toUpperCase();
//     }
// }

// Function to update the center target box AND total required clicks
function updateTargetDisplay() {
    const charBox = document.getElementById("currentChar");
    const clickCountDisplay = document.getElementById("clickCount");

    if (storedPassword && storedPassword[currentIndex]) {
        let currentTarget = storedPassword[currentIndex].toUpperCase();

        // 1. Target letter set karo (e.g., 'H')
        if (charBox) {
            charBox.textContent = currentTarget;
        }

        // 2. Required clicks calculate karo (e.g., 'H' = 8 clicks)
        let totalRequiredClicks = currentTarget.charCodeAt(0) - 64;

        // 3. UI par '0 / 8' format me update karo
        if (clickCountDisplay) {
            clickCountDisplay.textContent = `0 / ${totalRequiredClicks}`;
        }
    }
}

// Initial page load setup
updateTargetDisplay();

// Initial setup: Page load hote hi pehla target letter (e.g., 'H') dikhao
updateTargetDisplay();


// --- MAIN BUTTON CLICK LOGIC ---
clickBtn.addEventListener("click", function (event) {
    event.stopPropagation(); // Background reset roko

    clickCount++;

    // 1. Calculate dynamic letter (A, B, C...)
    let charCode = ((clickCount - 1) % 26) + 65;
    let generatedChar = String.fromCharCode(charCode);

    // 2. Continuous A, B, C update goes to the ACTIVE TOP PIPELINE BOX!
    const boxes = pipelineContainer.querySelectorAll("div");
    if (boxes[currentIndex]) {
        boxes[currentIndex].textContent = generatedChar;
    }

    // // Update click counter buttons
    clickBtn.innerText = "CLICK ME " + clickCount;
    

let currentTarget = storedPassword[currentIndex].toUpperCase();
let totalRequiredClicks = currentTarget.charCodeAt(0) - 64;

// Display format: '3 / 8'
const clickCountDisplay = document.getElementById("clickCount");
if (clickCountDisplay) {
    clickCountDisplay.textContent = `${clickCount} / ${totalRequiredClicks}`;

    }

    // 3. Random Movement Check (1 to 10 clicks)
    if (clickCount === nextRandomTrigger) {
        moveButtonRandomly();
        nextRandomTrigger = clickCount + (Math.floor(Math.random() * 8) + 1);
    }

    // 4. Target Match Check
    if (storedPassword && storedPassword[currentIndex]) {
        let targetChar = storedPassword[currentIndex].toUpperCase();

        if (generatedChar === targetChar) {
            // Lock current completed letter in top box
            boxes[currentIndex].classList.remove("active");

            // Move to next password character
            currentIndex++;
            clickCount = 0;
            nextRandomTrigger = Math.floor(Math.random() * 10) + 1;
            resetButtonPosition();

            if (currentIndex < storedPassword.length) {
                // Next pipeline box active karo
                boxes[currentIndex].classList.add("active");
                
                // CENTER BOX KO NEXT LETTER PAR SET KARO (e.g., 'E')
                updateTargetDisplay();
                
                clickBtn.innerText = "CLICK ME 0";
                if (clickCountDisplay) clickCountDisplay.textContent = "0";
            } else {
              setTimeout(() => {
        window.location.href = "useless3.html"; // Make sure your HTML file name matches
    }, 300);
            }
        }
    }
});





document.addEventListener("click", function (event) {
    if (!clickBtn.contains(event.target) && (currentIndex > 0 || clickCount > 0)) {
        // alert("⚠️ MISSED CLICK DETECTED! Pipeline wiped. Progress reset to 0!");
        
        const sound = document.getElementById("missSoundAudio");
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log("Play error:", e));
        }

        currentIndex = 0;
        clickCount = 0;
        nextRandomTrigger = Math.floor(Math.random() * 8) + 1;
        
        resetButtonPosition();
        renderPipeline();
        updateTargetDisplay();

        // 🎯 HAR MISSED-CLICK PAR TEXT RANDOM CHANGE HO JAYEGA!
        updateFunnyStatus();
    }
});
