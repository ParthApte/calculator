const keys = document.querySelectorAll(".calculator .key");
const display = document.querySelector(".calculator .input");
const clickSound = new Audio("clickSound.wav");

let expression = "";

function updateDisplay() {
    display.textContent = expression || "0";
}

keys.forEach((key) => {
    key.addEventListener("click", () => {
        // ✅ Play click sound
        clickSound.currentTime = 0;
        clickSound.play();

        // ✅ Handle calculator logic
        const value = key.textContent;

        switch (value) {
            case "AC":
                expression = "";
                break;
            case "DEL":
                expression = expression.slice(0, -1);
                break;
            case "=":
                try 
                {
                    const finalExpression = expression
                        .replace(/x/g, "*")
                        .replace(/\^/g, "**");
                    expression = eval(finalExpression).toString();
                } 
                catch
                 {
                    expression = "Error";
                    setTimeout(() =>
                    {
                        expression = "";
                        updateDisplay();
                    }, 1000);
                }
                break;
            default:
                expression += value;
                break;
        }

        updateDisplay();
    });
});

// Initial display
updateDisplay();
