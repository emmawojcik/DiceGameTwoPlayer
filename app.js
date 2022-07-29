const newGameBtn = document.getElementById('newGameBtn');
const diceImage = document.getElementById('diceImage');
const playBtns = document.getElementById('playBtns');
const rollBtn = document.getElementById('rollBtn');
const holdBtn = document.getElementById('holdBtn');
const playerOneCurrentLabel = document.getElementById('playerOneCurrentLabel');
const playerTwoCurrentLabel = document.getElementById('playerTwoCurrentLabel');
const playerOneHoldScoreLabel = document.getElementById('playerOneScoreLabel');
const playerTwoHoldScoreLabel = document.getElementById('playerTwoScoreLabel');
const playerOneMainLabel = document.getElementById('playerOneMainLabel');
const playerTwoMainLabel = document.getElementById('playerTwoMainLabel');
const playerWindow = document.getElementsByClassName('playerWindow');
const diceRolledText = document.getElementById('diceRollText');

let currentPlayer = "playerOne";
let currentScore = 0;
let playerOneHoldScore = 0;
let playerTwoHoldScore = 0;

function rollDice(){
  return Math.ceil(Math.random() * 6);
}

// Change the current player and apply the relevant screen styling
function changeCurrentPlayer() {
  if(currentPlayer == "playerOne"){
    currentPlayer = "playerTwo";
    if(playerOneMainLabel.textContent != "Winner!"){
      playerWindow[1].style.backgroundColor = 'rgba(45, 172, 174, 0.93)';
      playerWindow[1].style.boxShadow = '5px -5px 5px 5px rgba(0, 0, 0, 0.5)';
      playerWindow[0].style.backgroundColor = 'rgba(232, 244, 245, 0.93)';
      playerWindow[0].style.boxShadow = 'none';
    }
    
  } else {
    currentPlayer = "playerOne";
    if(playerTwoMainLabel.textContent != "Winner!"){
      playerWindow[0].style.backgroundColor = 'rgba(45, 172, 174, 0.93)';
      playerWindow[0].style.boxShadow = '-5px -5px 5px 5px rgba(0, 0, 0, 0.5)';
      playerWindow[1].style.backgroundColor = 'rgba(232, 244, 245, 0.93)';
      playerWindow[1].style.boxShadow = 'none';     
    }
  }
}

// Functionality for when a particular player rolls the dice
function playerRoll(diceRollTurn) {
  // If player 1 rolls
  if(currentPlayer == "playerOne"){
    diceRolledText.textContent = `Player 1 rolled a ${diceRollTurn}`;
    diceRolledText.style.visibility = 'visible';
    if(diceRollTurn == 1 && playerOneHoldScore == 0){
      currentScore = 0;
      playerOneCurrentLabel.textContent = `Current: ${currentScore}`;
      changeCurrentPlayer();
    } else {
      currentScore += diceRollTurn;
      playerOneCurrentLabel.textContent = `Current: ${currentScore}`;
    }
    // If player 2 rolls
  } else {
    diceRolledText.textContent = `Player 2 rolled a ${diceRollTurn}`;
    diceRolledText.style.visibility = 'visible';
      if(diceRollTurn == 1 && playerTwoHoldScore == 0){
        currentScore = 0;
        playerTwoCurrentLabel.textContent = `Current: ${currentScore}`;
        changeCurrentPlayer();
      } else {
        currentScore += diceRollTurn;
        playerTwoCurrentLabel.textContent = `Current: ${currentScore}`;
      }
  }
}

// Change labels and screen styling to how it should appear at the start of a game
function resetGame(){
  currentScore = 0;
  playerOneHoldScore = 0;
  playerTwoHoldScore = 0;
  playerOneMainLabel.textContent = "Player 1"
  playerTwoMainLabel.textContent = "Player 2"
  playerOneHoldScoreLabel.textContent = "0";
  playerTwoHoldScoreLabel.textContent = "0";
  playerOneCurrentLabel.textContent = "Current: 0";
  playerTwoCurrentLabel.textContent = "Current: 0";
  diceImage.style.visibility = "hidden";
  diceRolledText.style.visibility = 'hidden';
  playerWindow[0].style.backgroundColor = 'rgba(45, 172, 174, 0.93)';
  playerWindow[0].style.boxShadow = '-5px -5px 5px 5px rgba(0, 0, 0, 0.5)';
  playerWindow[1].style.backgroundColor = 'rgba(232, 244, 245, 0.93)';
  playerWindow[1].style.boxShadow = 'none';
}

// Functionality for when a particular player presses the hold button. If their score reaches/exceeds 20, they win
function playerHold(){
  // If player 1 holds
  if(currentPlayer == "playerOne"){
    playerOneHoldScore += currentScore;
    playerOneHoldScoreLabel.textContent = playerOneHoldScore;
    if(playerOneHoldScore >= 20){
      playerOneMainLabel.textContent = "Winner!";
      diceRolledText.textContent = "Player 1 wins";
      playBtns.style.visibility = "hidden";
      playerOneHoldScore = 0;
    } 
    currentScore = 0;
    playerOneCurrentLabel.textContent = `Current: ${currentScore}`;

    // If player 2 holds
  } else {
    playerTwoHoldScore += currentScore;
    playerTwoHoldScoreLabel.textContent = playerTwoHoldScore;
    if(playerTwoHoldScore >= 20){
      playerTwoMainLabel.textContent = "Winner!";
      diceRolledText.textContent = "Player 2 wins";
      playBtns.style.visibility = "hidden";
      playerTwoHoldScore = 0;
    }
    currentScore = 0;
    playerTwoCurrentLabel.textContent = `Current: ${currentScore}`;
  }
}

newGameBtn.addEventListener('click', () => {
  resetGame();
  playBtns.style.visibility = 'visible';
  currentPlayer = "playerOne";
})

rollBtn.addEventListener('click', () => {
  let diceRollTurn = rollDice();
  diceImage.src = `images/dice${diceRollTurn}.png`;
  diceImage.style.visibility = 'visible';
  playerRoll(diceRollTurn);
})

holdBtn.addEventListener('click', () => {
  playerHold();
  currentScore = 0;
  changeCurrentPlayer();
})