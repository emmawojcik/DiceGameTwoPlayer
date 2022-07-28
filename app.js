const newGameBtn = document.getElementById('newGameBtn');
const diceImage = document.getElementById('diceImage');
const playBtns = document.getElementById('playBtns');
const rollBtn = document.getElementById('rollBtn');
const holdBtn = document.getElementById('holdBtn');
const playerOneCurrentLabel = document.getElementById('playerOneCurrentLabel');
const playerTwoCurrentLabel = document.getElementById('playerTwoCurrentLabel');
const playerOneScoreLabel = document.getElementById('playerOneScoreLabel');
const playerTwoScoreLabel = document.getElementById('playerTwoScoreLabel');
const playerOneMainLabel = document.getElementById('playerOneMainLabel');
const playerTwoMainLabel = document.getElementById('playerTwoMainLabel');


let currentPlayer = "playerOne";
let currentScore = 0;
let holdScore = 0;

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

newGameBtn.addEventListener('click', () => {
  playBtns.style.visibility = 'visible';
})

rollBtn.addEventListener('click', () => {
  let diceRollTurn = rollDice();
  diceImage.src = `images/dice${diceRollTurn}.png`;
  diceImage.style.visibility = 'visible';

  if(diceRollTurn == 1 && holdScore == 0){
    currentScore = 0;
    changeCurrentPlayer();
  } else {
    currentScore += diceRollTurn;
    if(currentPlayer == "playerOne"){
      playerOneCurrentLabel.textContent = currentScore;
    } else {
      playerTwoCurrentLabel.textContent = currentScore;
    }
  }

})

holdBtn.addEventListener('click', () => {
  holdScore += currentScore;
  if(holdScore >= 20){
    if(currentPlayer == "playerOne"){
      playerOneMainLabel.textContent = "Winner!";
    } else {
      playerTwoMainLabel. textContent = "Winner!";
    }
  }
  if(currentPlayer == "playerOne"){
    playerOneScoreLabel.textContent = holdScore;
  } else {
    playerTwoScoreLabel.textContent = holdScore;
  }
  currentScore = 0;
  changeCurrentPlayer();
})