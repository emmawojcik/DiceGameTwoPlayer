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

let currentPlayer = "playerOne";
let currentScore = 0;
let playerOneHoldScore = 0;
let playerTwoHoldScore = 0;

function rollDice(){
  return Math.ceil(Math.random() * 6);
}

function changeCurrentPlayer() {
  if(currentPlayer == "playerOne"){
    currentPlayer = "playerTwo";
  } else {
    currentPlayer = "playerOne";
  }
}

function playerRoll(diceRollTurn) {
  if(currentPlayer == "playerOne"){
    if(diceRollTurn == 1 && playerOneHoldScore == 0){
      currentScore = 0;
      playerOneCurrentLabel.textContent = `Current: ${currentScore}`;
      changeCurrentPlayer();
    } else {
      currentScore += diceRollTurn;
      playerOneCurrentLabel.textContent = `Current: ${currentScore}`;
    }
  } else {
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

function playerHold(){
  if(currentPlayer == "playerOne"){
    playerOneHoldScore += currentScore;
    playerOneHoldScoreLabel.textContent = playerOneHoldScore;
    if(playerOneHoldScore >= 20){
      playerOneMainLabel.textContent = "Winner!";
      playerOneHoldScore = 0;
    } 
    currentScore = 0;
    playerOneCurrentLabel.textContent = `Current: ${currentScore}`;

  } else {
    playerTwoHoldScore += currentScore;
    playerTwoHoldScoreLabel.textContent = playerTwoHoldScore;
    if(playerTwoHoldScore >= 20){
      playerTwoMainLabel.textContent = "Winner!";
      playerTwoHoldScore = 0;
    }
    currentScore = 0;
    playerTwoCurrentLabel.textContent = `Current: ${currentScore}`;
  }
}

newGameBtn.addEventListener('click', () => {
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