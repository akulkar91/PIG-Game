/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

  var gamePlaying, scores, roundScore, activePlayer, dice , previousScore;

init();


  document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){



      //1.Get random number for Dice
       dice = Math.floor(Math.random() * 6) + 1;
       dice2 = Math.floor(Math.random() * 6 ) + 1;



           //2.display the result

           document.querySelector('.dice').style.display ='block';
           document.querySelector('.dice').src='dice-'+dice+'.png';

           document.querySelector('.dice2').style.display = 'block';
           document.querySelector('.dice2').src ='dice-'+dice2+'.png';
           //3.update the round score if the rolled number is not 14
           var totalDice = dice + dice2;
           console.log(dice ,dice2 , totalDice,activePlayer);
           if (dice === 1 || dice2 === 1) {
                // looses score and player changes
                //this is to check when its been two 6's in a row
                //console.log('previousScore: '+previousScore+' dice :'+dice+'  ' + activePlayer);
                roundScore=0;
                document.getElementById('current-'+activePlayer).textContent = '0';
                nextPlayer();
           }
              else if (totalDice > 2){
             roundScore += totalDice;
             document.getElementById('current-'+ activePlayer).textContent=roundScore;
           } else {
             nextPlayer();
              }
           }
           //intialize the variable previousScore which is set to dice after the if function so that we could use it
           //previousScore = dice;


  });


        document.querySelector('.btn-hold').addEventListener('click',function(){
          if (gamePlaying) {
            //Add current score to the global score
            scores[activePlayer] += roundScore;
            // Update the UI
            document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

            var input = document.querySelector('.target-score').value;
            var target;
            // undefined , null, 0 , "" , will be coerced to false
            //anything else will be coerced to true
            if (input) {
                target =input;
            } else {
              target = 20;
            }

            //Check if player Won the game
            if(scores[activePlayer] >= target){
              document.getElementById('name-'+activePlayer).textContent = 'Winner!';
              document.querySelector('.dice').style.display ='none';
              document.querySelector('.dice2').style.display ='none';
              document.querySelector('.player-'+activePlayer + '-panel').classList.add('winner');
              document.querySelector('.player-'+activePlayer + '-panel').classList.remove('active');
              gamePlaying = false;

            }else {
              nextPlayer();
            }

          }
      });






  function nextPlayer(){
    roundScore = 0; //to set the current total score to 0 as soon as the player's turn is done
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;//to know the status of active player

    //change the current score display to 0
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';

    //to not display dice on 1
    document.querySelector('.dice').style.display ='none';
    document.querySelector('.dice2').style.display ='none';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
  };





document.querySelector('.btn-new').addEventListener('click', function(){
  init();
});



function init(){
  scores =[0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  previousScore = 0;
  //document.querySelector('#current-' + activePlayer).textContent = dice; --- this is for reference
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

  document.getElementById('score-0').textContent='0';
  document.getElementById('score-1').textContent='0';
  document.getElementById('current-0').textContent='0';
  document.getElementById('current-1').textContent='0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.target-score').textContent='0';
};
