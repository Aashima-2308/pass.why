document.addEventListener("DOMContentLoaded", function () {
    const bgMusic = document.getElementById("bgMusic");
    const restartBtn = document.getElementById("restartBtn");

    // 1. Play Background Music Automatically
    if (bgMusic) {
        bgMusic.volume = 0.5; // Set volume to 50%
        
        // Browsers require a gesture before audio plays automatically
        let playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay block handler: Plays music on first click anywhere
                document.addEventListener("click", function startAudio() {
                    bgMusic.play();
                    document.removeEventListener("click", startAudio);
                }, { once: true });
            });
        }
    }

    // 2. Clear stored password and Redirect to Page 1
    if (restartBtn) {
        restartBtn.addEventListener("click", function () {
            // Optional: Purana password clear karo taaki clean start ho
            localStorage.removeItem("userPassword");

            // Page 1 par redirect
            window.location.href = "useless.html"; // Change to your Page 1 file name
        });
    }
});
