let rollDiceButton = document.getElementById('rollDiceButton');
let diceNumber = document.getElementById('diceNumber');
let currentp0 = document.getElementById('currentp0');
let currentp1 = document.getElementById('currentp1');
let holdButton = document.getElementById('holdButton');
let newGameButton = document.getElementById('newGameButton');
let scores, roundScore, activePlayer, gamePlaying; //No assignment - just declaring these variables to look neat and for global scope(important)

init(); //The very first thing we do in this app is to run init function, which starts everything

function init() { //This is the function that starts the game from the very beginning. At the start of the app, we call it (line 9)
    scores = [0, 0]; //Use an array to keep track of the total scores. First index represents p1, second index p2
    roundScore = 0; //roundScore holds the total points from the dice, in NUMBER. not string. Makes it easier overall.
    activePlayer = 0; //This is needed to change players. For easy toggle between p1 and p2. Again, 0 is p1, 1 is p2. This is because 'scores' (line 12) is an array
    document.getElementById('totalp0').innerText = '0';
    document.getElementById('totalp1').innerText = '0';
    currentp0.innerText = '0';
    currentp1.innerText = '0';
    document.getElementById('namep0').innerText = 'Player 1';
    document.getElementById('namep1').innerText = 'Player 2';
    diceNumber.innerText = '0';
    gamePlaying = true;
}

rollDiceButton.addEventListener('click', function() { 
    if(gamePlaying) { //We want all the below code inside this if statement to run ONLY if the game is playing. Think logically. Corresponds to line 22.
        let dice = Math.floor(Math.random() * 6) + 1;
        diceNumber.innerText = dice;

        if(dice !== 1) {
            roundScore += dice; //roundScore holds the total points from the dice IN NUMBER...
            document.getElementById('currentp' + activePlayer).innerText = roundScore; //...which then gets displayed on whoever the active player is.
        } else {
            nextPlayer();
        }
    }
});

holdButton.addEventListener('click', function() {
    if(gamePlaying) {
        scores[activePlayer] += roundScore; //Add current score to total score
        document.getElementById('totalp' + activePlayer).innerText = scores[activePlayer]; //Update the UI
        if(scores[activePlayer] >= 100) {
            document.getElementById('namep' + activePlayer).innerText = 'Winner!!!!!!!'
            gamePlaying = false; //After a winner has been found, stop the game by turning gamePlaying to false.
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() { //This whole function used to be in both eventListeners. But to adhere to DRY principles, we store it in a function.
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //This is the logic for changing players
    roundScore = 0; //When it is a new player's turn, obviously want the roundScore to be 0 again. Otherwise the roundScore from previous player will be added.
    currentp0.innerText = '0';//The rule of the game says if the player rolls a 1, then the current score has to reset to 0. Same below.
    currentp1.innerText = '0';
}

newGameButton.addEventListener('click', init); //Notice I am not calling the init function, just passing it as a callback function.

//General tips:
//When creating anything, check console a lot - very helpful
//When doing things, make sure to update in the UI to be reflected. Most likely the change does happen but I forget to reflect it in the UI