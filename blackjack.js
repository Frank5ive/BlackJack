var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck;

var canHit = true; // able to draw 

window.onload = function () {
    buildDeck();
    shuffleDeck();
    startGame();
}

// Build a deck with 52 cards (4 suits and 13 values)
function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "S", "H"];

    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }
}

// Shuffle the deck using Fisher-Yates algorithm
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

// Start the game by dealing cards to the dealer and player
function startGame() {
    dealerSum = 0;
    yourSum = 0;
    dealerAceCount = 0;
    yourAceCount = 0;

    // Deal cards to dealer and player
    hidden = deck.pop();  // The dealer's hidden card
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    // Dealer gets more cards if the sum is less than 17
    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("Dealer-cards").append(cardImg);
    }

    // Deal two cards to the player
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("Your-cards").append(cardImg);
    }

    // Add event listeners for buttons
    document.getElementById('hit').addEventListener('click', hit);
    document.getElementById('stay').addEventListener('click', stay);
}

// Hit action: the player draws a new card
function hit() {
    if (!canHit) return;

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("Your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false;
        showResultMessage("You Lose!");
    }
}

// Stay action: the player ends their turn
function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById('hidden').src = "./cards/" + hidden + ".png";  // Show the hidden card

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
    } else if (dealerSum > 21) {
        message = "You Win!";
    } else if (yourSum === dealerSum) {
        message = "It’s a Tie!";
    } else if (yourSum > dealerSum) {
        message = "You Win!";
    } else if (yourSum < dealerSum) {
        message = "You Lose!";
    }

    // Show results
    document.getElementById('Dealer-sum').innerText = dealerSum;
    document.getElementById('your-sum').innerText = yourSum;
    document.getElementById('results').innerText = message;

    showResultMessage(message);
}

// Get the value of the card (A=11, face cards=10, others are their numeric value)
function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10; // Face cards (J, Q, K) are worth 10
    }
    return parseInt(value);
}

// Check if the card is an Ace
function checkAce(card) {
    if (card[0] === "A") {
        return 1;
    }
    return 0;
}

// Adjust Ace value if the total is over 21
function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount--;
    }
    return playerSum;
}

// Show result message in the modal
function showResultMessage(message) {
    const modal = document.getElementById('game-over-modal');
    const resultMessage = modal.querySelector("p");
    resultMessage.textContent = message;

    // Adjust modal background color based on the result
    if (message === "You Win!") {
        modal.classList.add('win');
        modal.classList.remove('lose', 'tie');
    } else if (message === "You Lose!") {
        modal.classList.add('lose');
        modal.classList.remove('win', 'tie');
    } else if (message === "It’s a Tie!") {
        modal.classList.add('tie');
        modal.classList.remove('win', 'lose');
    }

    modal.classList.add('active'); // Show modal
}

// Reset the game to start a new round
function resetGame() {
    // Reset all variables
    dealerSum = 0;
    yourSum = 0;
    dealerAceCount = 0;
    yourAceCount = 0;
    deck = [];
    canHit = true;

    // Clear previous cards
    document.getElementById("Dealer-cards").innerHTML = "";
    document.getElementById("Your-cards").innerHTML = "";
    document.getElementById('results').innerText = "";
    document.getElementById('Dealer-sum').innerText = "";
    document.getElementById('your-sum').innerText = "";

    // Reset buttons
    document.getElementById('hit').disabled = false;
    document.getElementById('stay').disabled = false;

    // Reload the hidden card to its initial state (the back image)
    const hiddenCard = document.createElement("img");
    hiddenCard.src = "./cards/BACK.png"; // Reset to the back of the card image
    hiddenCard.id = "hidden"; // Ensure the ID is set
    document.getElementById("Dealer-cards").appendChild(hiddenCard);

    // Rebuild and shuffle the deck
    buildDeck();
    shuffleDeck();
    startGame();

    // Close the modal
    document.getElementById('game-over-modal').classList.remove('active');
}

// Add event listener for "Play Again" button in the modal
document.querySelector('#game-over-modal button').addEventListener('click', () => {
    resetGame(); // Reset the game when the user clicks "Play Again"
});
