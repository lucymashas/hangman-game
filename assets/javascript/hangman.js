
  //Global Variables
    var hangmanWords = ["YANKEES","DODGERS","METS","CUBS","WHITE SOX","ORIOLES","NATIONALS","GIANTS","REDSOX","RANGERS","PHILLIES","MARLINS","ASTROS","BRAVES","MARINERS","TWINS","PADRES"];
    var letterArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y"];
    var wins = 0;
    var loses = 0;
    var hanged = 0;
    var match = false;
    var guess = [];


//audio files
var audioElementCheer = document.createElement("audio");
      audioElementCheer.setAttribute("src", "./assets/sounds/Ball+Hit+Cheer.mp3");
   
var audioElementLoses = document.createElement("audio");
      audioElementLoses.setAttribute("src", "./assets/sounds/strike.mp3");

//Star the game, select word
function startGame()
    {

      currentWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
      for (var s = 0; s < currentWord.length; s++) 
      {
        guess[s] = "_ ";
         var idWord = document.getElementById("word");
         idWord.innerHTML += guess[s];   
      }               
    } 

//Set the outs opacity
function outsRemaining(outs){
      if (outs == 1) {
        document.getElementById("out6").className = "outop";
      } 
      if (outs == 2) {
        document.getElementById("out5").className = "outop";
      } 
       if (outs == 3) {
        document.getElementById("out4").className = "outop";
      } 
       if (outs == 4) {
        document.getElementById("out3").className = "outop";
      } 
       if (outs == 5) {
        document.getElementById("out2").className = "outop";
      } 
       if (outs == 6) {
        document.getElementById("out1").className = "outop";
      } 
} 

//Checks Letter WITH THE CURRENT HANGMAN WORD IF FOUND IT WRITES TO THE GUESSES
//IF NOT FOUND IT PLACES THE FIRST HANG 
  function checkLetter(x)
    {
      var i;
      match = false;
      var newHead =document.createElement("h2");
      var checkLetterDiv = document.getElementById("currentword");
      for (i=0; i<currentWord.length; i++) 
        {
          if (currentWord.charAt(i) == x)
          { 
            guess[i] = x;
            document.getElementById("word").innerHTML = guess.join(" ");
            match = true;
          }
        }
        if (match === false)
          {
            document.getElementById("letters").innerHTML += x; 
            return hanged++;
          }
    }

//CREATE AN ARRAY OF LETTERS TO COMPARE AND REMOVE LETTER FROM THE LIST TO AVOID DUPLICATE ENTRIES
    function removeLetter(let) 
    {
      var found =false;
      for(var i = 0; i < letterArr.length; i++)
      {
        if(letterArr[i].indexOf(let) != -1)
        {
            letterArr.splice(i, 1);
            // console.log(letterArr);
            found = true;
        }
      }
      if(found  === true)
      {
        checkLetter(let);
      }
    }
//Winner Circle
function checkWinLoose()
  {
    if (match === true && hanged < 6 )  //CHECKS FOR WIN/LOSE
          {
            var string =guess.join("");
            if (string == currentWord)
              {
                wins = wins + 1;
                var addWins = document.getElementById("wins");
                addWins.textContent = "WINS " + wins;
                document.getElementById("tagline").innerHTML = "YOU WON";
                audioElementCheer.play();
              }
          }
        else if (hanged == 6)
          {
              // loses++; 
              loses = loses +1;
              var addLose = document.getElementById("loses");
              addLose.textContent = "LOSSES " + loses;
              document.getElementById("tagline").innerHTML = "YOU LOST";
              audioElementLoses.play();

          }
  }


  window.onload = function()
  {
    startGame();
  }

  document.onkeyup = function()
  {
    var userGuess = String.fromCharCode(event.keyCode);
    removeLetter(userGuess);   //CHECKS LETTER
    outsRemaining(hanged);
    checkWinLoose();
    // document.getElementById("button").enabled = true; 
    //When Play Again Button is clicked//
    
    document.getElementById('reset').onclick = function() 
      {
        // var guess = [];
        guess = [];
        // var hanged = 0;
        hanged = 0;
        // var match = false;
        match = false;
        document.getElementById("letters").innerHTML = "";
        document.getElementById("word").innerHTML = "";
        document.getElementById("tagline").innerHTML = "OUTS REMAINING";
        letterArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y"];
        //reset the outs, outopr is css opacity = 1.0
        for (var j=1; j<7; j++){
          document.getElementById("out" + j).className = "row categoryimg outopr";
        }
        startGame();
      }
       
  }
