/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,
    roundScore, 
    activePlayer, 
    gamePlayer, 
    finalScore, 
    default_value=50,
    dice1,
    dice2,
    desplayDice1 = document.querySelector('.dice1'),
    desplayDice2 = document.querySelector('.dice2'),
    score0 = document.getElementById('score-0'),
    score1 = document.getElementById('score-1'),
    current0 = document.getElementById('current-0'),
    current1 = document.getElementById('current-1'),
    Player1 = document.getElementById('name-0'),
    Player2 = document.getElementById('name-1'),
    player0Panel = document.querySelector('.player-0-panel'),
    player1Panel = document.querySelector('.player-1-panel');

ResetGame();

document.querySelector('.btn-roll').addEventListener('click',buttonRol);

document.querySelector('.btn-hold').addEventListener('click', buttonHold);

document.querySelector('.btn-new').addEventListener('click', ResetGame);


function buttonHold(){
    if(gamePlayer){ 
        scores[activePlayer] += roundScore;
        defaultFinalScore();
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        if (scores[activePlayer] >= finalScore){
            playerWinner()
        } else{
            nextPlayer();  
        }
    }
}

function defaultFinalScore(){
    finalScore = document.getElementById("finalScore").value;
    if (finalScore == '')
        finalScore = default_value;
}

function playerWinner(){
    document.querySelector('#name-' + activePlayer).textContent = 'winner!';
    desplayDice1.style.display = 'none';
    desplayDice2.style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlayer = false;
}

function getDiceElemnt(diceIndex) {
    var dice = Math.floor(Math.random() * 6 ) + 1;
    var diceDOM = document.querySelector('.dice'+ diceIndex);
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    return dice;
}

function buttonRol(){
    if(gamePlayer){ 

         dice1 = getDiceElemnt(1);
         dice2 = getDiceElemnt(2);
        if (dice1 !== 1 && dice2 !== 1 ) {
            if ( (dice1 + dice2) == 11) {
                resetScorePlayer();
                nextPlayer();
            }else{
                scoringUpdate();
            }
        }else {
             
            if ( (dice1 + dice2) == 11) {
                resetScorePlayer();
                nextPlayer();
            }else 
                nextPlayer();  
        }
    }

}


function scoringUpdate(){
    roundScore += dice1 + dice2;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
}


function resetScorePlayer(){
    scores[activePlayer] = 0;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    document.getElementById('current-'+ activePlayer).textContent = scores[activePlayer]; 
}


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    current0.textContent = '0';
    current1.textContent = '0';
    player0Panel.classList.toggle('active');
    player1Panel.classList.toggle('active');
}

function ResetGame(){
    scores= [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlayer = true;

    desplayDice1.style.display = 'none';
    desplayDice2.style.display = 'none';
    score0.textContent = '0';
    score1.textContent = '0';
    current0.textContent = '0';
    current1.textContent = '0';
    Player1.textContent = 'Player 1';
    Player2.textContent = 'Player 2';
    player0Panel.classList.remove('winner');
    player1Panel.classList.remove('winner');
    player0Panel.classList.remove('active');
    player1Panel.classList.remove('active');
    player0Panel.classList.add('active');
} 



