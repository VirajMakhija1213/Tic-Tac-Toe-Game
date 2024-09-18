    let boxes = document.querySelectorAll(".inner");
    let resetBtn = document.querySelector(".reset-btn");
    let newBtn = document.querySelector(".new-btn");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.querySelector(".msg");
    let turnO = true; // true = O's turn, false = X's turn
    const winningPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ];

    // Function to add event listeners to all boxes
    const addListeners = () => {
        for (let box of boxes) {
            box.addEventListener("click", function handler() {
                // Prevent further clicks on the same box
                if (this.innerText !== "") return;

                // Set the text based on whose turn it is
                if (turnO) {
                    this.innerText = "O";
                } else {
                    this.innerText = "X";
                }

                // Toggle turn after each valid click
                turnO = !turnO;

                // Remove the event listener to prevent further clicks
                this.removeEventListener("click", handler);

                // Check if there is a winner
                CheckWinner();
            });
        }
    };

    // Initial call to add listeners when the game starts
    addListeners();

    const resetGame = () => {
        turnO = true; // Reset the turn to O's turn
        enableBoxes();
        msgContainer.classList.add("hide"); // Hide the winner message
    };

    const enableBoxes = () => {
        for (let box of boxes) {
            box.classList.remove("disabled");  // Remove disabled class
            box.innerText = "";  // Clear the text
        }
        addListeners();  // Re-add the event listeners to the boxes
    };

    const disabledBoxes = () => {
        for (let box of boxes) {
            box.classList.add("disabled");  // Disable further clicks
        }
    };

    const showWinner = (winner) => {
        msg.innerText = `Congratulations, ${winner} wins!`;
        msgContainer.classList.remove("hide"); // Show winner message
        disabledBoxes();  // Disable all boxes after a win
    };

    const CheckWinner = () => {
        for (let pattern of winningPatterns) {
            let pos1 = boxes[pattern[0]].innerText;
            let pos2 = boxes[pattern[1]].innerText;
            let pos3 = boxes[pattern[2]].innerText;

            if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
                if (pos1 === pos2 && pos2 === pos3) {
                    showWinner(pos1); // Show the winner based on the matched pattern
                    return;
                }
            }
        }

        // Check for a draw if all boxes are filled and no winner
        if ([...boxes].every(box => box.innerText !== "")) {
            msg.innerText = `It's a draw!`;
            msgContainer.classList.remove("hide");
            disabledBoxes();
        }
    };

    // Event listeners for reset and new game buttons
    newBtn.addEventListener("click", resetGame);
    resetBtn.addEventListener("click", resetGame);
