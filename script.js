document.addEventListener("DOMContentLoaded", () => {
    //Select the elements
    const textToTypeElement = document.getElementById("text-to-type");
    const typingInputElement = document.getElementById("typing-input");
    const speedElement = document.getElementById("speed");
    const accuracyElement = document.getElementById("accuracy");

    //Text to display
    let sampleTexts = [
        "Push yourself, because no one else is going to do it for you.",
        "Failure is the condiment that gives success its flavor.",
        "Wake up with determination. Go to bed with satisfaction.",
        "It's going to be hard, but hard does not mean impossible.",
        "Learning never exhausts the mind.",
        "The only way to do great work is to love what you do."
    ];
    //initial values
    let currentIndex = 0;
    let startTime = new Date();
    let errors = 0;

    //Function to initialize or restart the game
    function initializeGame() {
        const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        textToTypeElement.textContent = text;
        typingInputElement.value = "";
        currentIndex = 0;
        startTime = new Date();
        errors = 0;
        //update fn
        updateFeedback();
    }
    //Function to update the speed and the accuracy feedback
    function updateFeedback() {
        const currentTime = new Date();
        const elapsedTime = (currentTime - startTime) / 60000;
        if (elapsedTime <= 0) {
            speedElement.textContent = 0;
        } else {
            const wordsTyped = typingInputElement.value.trim().split(/\s+/).length;
            const speed = Math.round(wordsTyped / elapsedTime);
            speedElement.textContent = speed;
        }
        //cal accurracy
        const accuracy =
            currentIndex > 0 ?
            Math.round(((currentIndex - errors) / currentIndex) * 100) :
            100;
        accuracyElement.textContent = accuracy;
    }

    //Function to check typed character
    function checkCharacter(inputChar, targetChar) {
        if (inputChar !== targetChar) {
            errors++;
            //play error sound
            new Audio("PROJECTS_Typing-test-project-final_error.mp3").play();
            return false;
        } else {
            return true;
        }
    }
    //Function to display messages to the user
    function displayMessage(message) {
        const messageArea = document.getElementById("message-area");
        messageArea.textContent = message;
        //clear the msg after 3s
        setTimeout(() => {
            messageArea.textContent = "";
        }, 3000);
    }
    //Event listener for typing input
    typingInputElement.addEventListener("input", (e) => {
        const typedText = typingInputElement.value;
        const targetText = textToTypeElement.textContent;
        if (currentIndex < targetText.length) {
            const isCorrect = checkCharacter(
                typedText[currentIndex],
                targetText[currentIndex]
            );

            textToTypeElement.innerHTML =
                targetText.substring(0, currentIndex) +
                `<span class='${isCorrect ? "correct" : "incorrect"}'>${
            targetText[currentIndex]
          }</span>` +
                targetText.substring(currentIndex + 1);
            currentIndex++;
            if (currentIndex === targetText.length) {
                displayMessage("Text completed starting a new one.");
                initializeGame();
            }
        }
        //update the feedback
        updateFeedback();
    });
    //Start the game
    initializeGame();
});