let scores, activePlayer, roundScore, gamePlaying; //No assignment - just declaring these variables to look neat and for global scope(important)

init();

function init() { //This is the function that starts the game from the very beginning.
    scores = [0, 0]; //Use an array to keep track of the total scores. First index represents p1, second index p2
    activePlayer = 0; //This is needed to change players. For easy toggle between p1 and p2.
    roundScore = 0; //roundScore holds the total points from the dice, in NUMBER. not string. Makes it easier overall.
    gamePlaying = true;
    document.getElementById('namep0').innerHTML = '<strong>Player 1</strong>';
    document.getElementById('namep1').innerHTML = '<strong>Player 2</strong>';
    document.getElementById('totalp0').innerText = 0;
    document.getElementById('totalp1').innerText = 0;
    document.getElementById('currentp0').innerText = 0;
    document.getElementById('currentp1').innerText = 0;
    document.getElementById('p0').classList.add('active');
    document.getElementById('p1').classList.remove('active');
    document.getElementById('diceNumber').style.display = 'none'; 
}

document.getElementById('rollDiceButton').addEventListener('click', function() {
    if(gamePlaying) { //If gamePlaying is false then clicking this button does nothing
        let dice = Math.floor(Math.random() * 6) + 1;
        document.getElementById('diceNumber').innerText = dice;

        if(dice !== 1) {
            roundScore += dice; //roundScore holds the total points from the dice IN NUMBER...
            document.getElementById('diceNumber').src = 'dice-' + dice + '.png';
            document.getElementById('diceNumber').style.display = 'inline-block'; //the inline makes it so the picture appears in the middle. If only block, it will appear on the left
            document.getElementById('currentp' + activePlayer).innerText = roundScore; //...which then gets displayed on whoever the active player is.
        } else {
            document.getElementById('diceNumber').style.display = 'none';
            nextPlayer();
        }
    }
});

function nextPlayer() { //This whole function used to be in both eventListeners. But to adhere to DRY principles, we store it in a function.
    document.getElementById('currentp' + activePlayer).innerText = 0;
    document.getElementById('p' + activePlayer).classList.toggle('active'); //First, toggle off the activePlayer. Then next line, change the activePlayer.
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //This is the logic for changing players
    roundScore = 0; //When it is a new player's turn, obviously want the roundScore to be 0 again. Otherwise the roundScore from previous player will be added.
    document.getElementById('p' + activePlayer).classList.toggle('active'); //Now the new activePlayer, toggle on.
}

document.getElementById('holdButton').addEventListener('click', function() {
    if(gamePlaying) {
        document.getElementById('diceNumber').style.display = 'none'; 
        scores[activePlayer] += roundScore; //Add current score to total score. No string here, both Number
        document.getElementById('totalp' + activePlayer).innerText = scores[activePlayer]; //Update the UI
        document.getElementById('diceNumber').innerText = 0;
        if(scores[activePlayer] >= 20) {
            document.getElementById('namep' + activePlayer).innerHTML = '<strong>Winner!!!!!</strong>';
            gamePlaying = false; //After a winner has been found, stop the game by turning gamePlaying to false.
        } else {
            nextPlayer();
        }  
    }
});

document.getElementById('newGameButton').addEventListener('click', init); //Notice I am not calling the init function, just passing it as a callback function.

//General tips:
//When creating anything, check console a lot - very helpful
//When doing things, make sure to update in the UI to be reflected. Most likely the change does happen but I forget to reflect it in the UI