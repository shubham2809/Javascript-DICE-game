/*
@AUTHOR: SHUBHAMD
*/
var scores , roundScore , activePlayer;

//State variable which will decide if the game is running or not
var gamePlaying = true;

alert("The game has 2 players, playing in rounds \n - In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score\n - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn \n- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn \n - The first player to reach 100 points on GLOBAL score wins the game");

var minWinningPoint = prompt("Enter minimum points when a player should win the game");

gameInit();

function gameInit(){
	
	//GLobal Score
	scores = [0,0];
	//RoundScore
	roundScore  = 0;
	//ActivePlayer Indicator
	activePlayer = 0;
	//to change css
	document.querySelector('.dice').style.display = 'none';
	//Setting all visible scores to 0
	document.getElementById('score-0').textContent = "0";
	document.getElementById('score-1').textContent = "0";
	document.getElementById('current-0').textContent = "0";
	document.getElementById('current-1').textContent = "0";
	document.getElementById('name-0').textContent = "Player 1"
	document.getElementById('name-1').textContent = "Player 2"
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
};
//6 faces of dice
//dice = Math.floor(Math.random()*6) + 1;

//to change text
//document.querySelector('#current-'+activePlayer).textContent = dice; 

//to change text and html
//document.querySelector('#current-'+activePlayer).innerHTML = '<b>' + dice + '</b>';


//Function to move to next player
function nextPlayer (){
//next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	//reset the score
	roundScore = 0;
	document.getElementById('current-0').textContent = "0";
	document.getElementById('current-1').textContent = "0";

/*	//remove the active from active class
	document.querySelector('.active').classList.remove('active');
	//add to the class of active player
	document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
*/
//To do the same thing as above
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.dice').style.display = 'none';
}
/*
Events : Notification that are sent to notify the code 
		 that something happened oin the webpage
Event Listener: A function that performs an action based on a certain event.
 				It waits for a speficic event to happen
 */
//Event Handler - Roll Button
document.querySelector('.btn-roll').addEventListener('click',function(){
if(gamePlaying){
	//1. Random number //6 faces of dice
	var dice = Math.floor(Math.random()*6) + 1;
	//2. Display the result // As we have set the property to none before
	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = 'block';
	diceDOM.src = 'images/dice-' + dice + '.png';

	//3. Update the round score IF the rolled number was NOT a 1
	if(dice !== 1)/*No Type Coercion*/{
		//Add Score
		roundScore += dice;
		document.querySelector('#current-'+activePlayer).textContent = roundScore; 
	}
	else{

		nextPlayer();
	}
}	
});
//Hold Button
document.querySelector('.btn-hold').addEventListener('click',function(){
	if(gamePlaying){
		//Add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;
		//update UI
		document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];

		//Check if player has won
		if(scores[activePlayer] >= minWinningPoint){
			document.getElementById('name-'+activePlayer).textContent = "Winner"
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
			document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
			
			gamePlaying = false;
		}
		else{
			//NextPlayer
			nextPlayer();
		}
	}
});
//New Game
document.querySelector('.btn-new').addEventListener('click',gameInit);