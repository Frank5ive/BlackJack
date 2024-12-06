# Black Jack Game

This is a simple web-based Black Jack game built using HTML, CSS, and JavaScript. The game allows you to play against the dealer, and it includes features like hitting, staying, and automatic dealer behavior based on Black Jack rules.

## Features

- **Dealer vs Player:** Play against the computer (dealer).
- **Card Values:** Aces are counted as 11, face cards (J, Q, K) as 10, and other cards by their face value.
- **Automatic Dealer Play:** The dealer automatically hits until their hand value reaches at least 17.
- **Responsive Design:** The game is designed to be playable on both desktop and mobile devices.
- **Hit or Stay:** You can choose to hit (draw a card) or stay (end your turn).
- **Game Reset:** After a round, you can reset the game and start a new one.

## How to Play

1. **Start the Game:**
   - When you load the page, the game starts automatically, and the dealer and player each receive 2 cards.
   
2. **Your Turn:**
   - You can either **hit** (draw a card) or **stay** (end your turn).
   - The objective is to get as close to 21 as possible without going over.

3. **Dealer's Turn:**
   - After you choose to stay, the dealer will reveal their hidden card.
   - The dealer will continue drawing cards until their total is 17 or more.

4. **Game Result:**
   - The game will determine if you won, lost, or if it’s a tie based on your hand value versus the dealer’s hand.
   
5. **Reset the Game:**
   - After a round ends, you can reset the game and start a new round with the **Reset Game** button.

## Prerequisites

To run the Black Jack game locally, you need:
- A modern web browser (e.g., Chrome, Firefox, Safari).
- Basic understanding of HTML, CSS, and JavaScript.

## Installation

To run the game locally:

1. **Clone this repository:**
   ```bash
   git clone https://github.com/Frank5ive/blackjack.git
   ```

2. **Navigate into the project directory:**
   ```bash
   cd blackjack
   ```

3. **Open the `index.html` file in your browser:**
   - Simply open the `index.html` file with any browser, and the game will load.

## Game Flow

1. The dealer and player are dealt two cards each. The dealer has one card face down.
2. The player can choose to hit (draw a card) or stay (end their turn).
3. If the player’s total exceeds 21, they lose the round.
4. If the player stays, the dealer reveals their hidden card and hits until their total is 17 or higher.
5. If the player’s total is higher than the dealer's total, or the dealer busts (exceeds 21), the player wins.
6. If the totals are equal, it’s a tie. If the dealer's total is higher, the player loses.

## Technologies Used

- **HTML** for the structure of the game.
- **CSS** for styling and responsive design.
- **JavaScript** for the game logic, including deck creation, shuffling, and card handling.

## Contributions

Contributions are welcome! If you'd like to suggest improvements or add features, feel free to fork this project and submit a pull request. You can also open an issue if you encounter any bugs or have feature requests.
