
  //Global Variables
    var hangmanWords = ["YANKEES","DODGERS","METS","CUBS","WHITE SOX","ORIOLES","NATIONALS","GIANTS","RED SOX","RANGERS","PHILLIES","MARLINS","ASTROS","BRAVES","MARINERS","TWINS","PADRES"];
    var letterArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y"];
    var wins = 0;
    var loses = 0;
    var hanged = 0;
    var guess = [];
    var match = false;


//audio files
var audioElementCheer = document.createElement("audio");
      audioElementCheer.setAttribute("src", "./assets/sounds/Ball+Hit+Cheer.mp3");
   
var audioElementLoses = document.createElement("audio");
      audioElementLoses.setAttribute("src", "./assets/sounds/strike.mp3");

function startGame()
    {
      console.log("start game is called");
      //Initialize Start of Game variables
      var s;
      currentWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
      for (s = 0; s < currentWord.length; s++) 
      {
        guess[s] = "__ ";
        // if(document.getElementById("word") != null){
        //   var idWord=document.getElementById("word").innerHTML;
        // }
         var idWord = document.getElementById("word");
         idWord.innerHTML += guess[s];   
      }               
    } 


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
            // document.getElementById("out1").className = "outop"; 
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
                wins++
                // alert("You Got It!!");
                // document.getElementById("wins").innerHTML = wins;
                var addWins = document.getElementById("wins");
                addWins.textContent += wins;
                document.getElementById("tagline").innerHTML = "YOU WON";
                audioElementCheer.play();
              }
          }
        else if (hanged == 6)
          {
              loses++;
              // console.log(hanged);
              // document.getElementById("letters").innerHTML += "You Lost";
              var addLose = document.getElementById("loses");
              addLose.textContent += loses;
              document.getElementById("tagline").innerHTML = "YOU LOST";
              audioElementLoses.play();

          }
  }
//Play Again
//  document.getElementById('reset').onclick = function() {
//     // var hanged = 0;
//     // var guess = [];

// //reset word and letters
//     word.parentNode.removeChild(word);
//     letters.parentNode.removeChild(letters);
//     startGame();
//   }
window.onload = function(){

  console.log("test ");

    startGame();

    document.getElementById('reset').onclick = function() {

    console.log("test 2");
    // var hanged = 0;
    // var guess = [];

    //reset word and letters
    // word.parentNode.removeChild(word);
    // letters.parentNode.removeChild(letters);
    word.innerText = "";
    letters.innerText = "";
    startGame();
    }


  //Gets start key event
    // window.onload = startGame();
    //startGame();
      
}



document.onkeyup = function()
{ 

  var userGuess = String.fromCharCode(event.keyCode);
  removeLetter(userGuess);   //CHECKS LETTER
  outsRemaining(hanged);
  checkWinLoose(); 
    
}  

