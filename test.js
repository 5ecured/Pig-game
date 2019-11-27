let scores, activePlayer, roundScore, gamePlaying;

init();
function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.getElementById('totalp0').innerText = 0;
    document.getElementById('totalp1').innerText = 0;
    document.getElementById('currentp0').innerText = 0;
    document.getElementById('currentp1').innerText = 0;
    document.getElementById('diceNumber').innerText = 0;
    document.getElementById('diceNumber').style.display = 'none';
    document.getElementById('p0').classList.add('active');
    document.getElementById('p1').classList.remove('active');
}

document.getElementById('rollDiceButton').addEventListener('click', function() {
    if(gamePlaying) {
        let dice = Math.floor(Math.random() * 6) + 1;
        document.getElementById('diceNumber').innerText = dice;
        document.getElementById('diceNumber').style.display = 'inline-block';
        document.getElementById('diceNumber').src = 'dice-' + dice + '.png';

        if(dice !== 1) {
            roundScore += dice;
            document.getElementById('currentp' + activePlayer).innerText = roundScore;
        } else {
            nextPlayer();
        }
    }
});

document.getElementById('holdButton').addEventListener('click', function() {
    if(gamePlaying) {
        scores[activePlayer] += roundScore;
        document.getElementById('totalp' + activePlayer).innerText = scores[activePlayer];
        document.getElementById('diceNumber').innerText = 0;
        document.getElementById('diceNumber').style.display = 'none';

        if(scores[activePlayer] >= 20) {
            alert(`Player ${activePlayer + 1} wins!`)
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
})

function nextPlayer() {
    document.getElementById('p' + activePlayer).classList.toggle('active');
    document.getElementById('currentp' + activePlayer).innerText = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.getElementById('p' + activePlayer).classList.toggle('active');
    roundScore = 0;
}

document.getElementById('newGameButton').addEventListener('click', init)