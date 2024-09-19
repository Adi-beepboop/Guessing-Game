let attempts = 5;
const maxRange = 100;
const randomNumber = Math.floor(Math.random() * maxRange) + 1;

function promptGuess() {
  if (attempts > 0) {
    swal(`Guess a number (1 to ${maxRange}):`, {
      content: "input",
      buttons: true,
    }).then((value) => {
      if (value === null) {
        // User pressed "Cancel" -> Confirm if they really want to quit
        swal({
          title: "Are you sure?",
          text: "Do you want to quit the game?",
          icon: "warning",
          buttons: ["No, continue", "Yes, quit"],
          dangerMode: true,
        }).then((willQuit) => {
          if (willQuit) {
            // User confirmed to quit the game
            swal("Game Over!", "You have quit the game.", "info").then(() => {
              window.location.href = "guessing_game.html"; // Redirect to home screen
            });
          } else {
            // User chose to continue, re-prompt for the guess
            promptGuess();
          }
        });
        return; // Exit the function early if we're asking the quit confirmation
      }

      let userGuess = parseInt(value);
      if (isNaN(userGuess)) {
        // If the user doesn't enter a valid number
        swal("Invalid input!", "Please enter a number.", "error").then(() =>
          promptGuess()
        );
      } else if (userGuess < 1 || userGuess > maxRange) {
        // If the user's guess is out of bounds (1 to maxRange)
        swal("Out of bounds!", `Your guess should be between 1 and ${maxRange}.`, "error").then(() =>
          promptGuess()
        );
      } else if (userGuess === randomNumber) {
        // User guessed the correct number
        swal({
          title: "You win",
          text: "congrats!",
          icon: "success",
          content: {
            element: "div",
            attributes: {
              innerHTML: `<a href="mailto:adinath.ka01@gmail.com">Email us suggestions to improve this game</a>`,
            },
          },
        }).then(() => (window.location.href = "guessing_game.html")); // Redirect back to home after win
      } else {
        // Wrong guess, decrement attempts
        attempts--;
        if (attempts > 0) {
          let clue = userGuess > randomNumber ? "LOWER!!" : "HIGHER!!";
          swal(
            `${clue}`,
            `Incorrect! You have ${attempts} attempts left.`,
            "error"
          ).then(() => promptGuess());
        } else {
          // No more attempts left, game over
          swal(
            "Game Over!",
            `No more attempts left. The correct number was ${randomNumber}.`,
            "error"
          ).then(() => (window.location.href = "guessing_game.html")); // Redirect back to home after game over
        }
      }
    });
  }
}

// Start the game when the page loads
window.onload = promptGuess;
