var buttonColours = ["red", "blue", "green", "yellow"]; //creation of array buttonColours

var gamePattern = []; // creation of empty array
var userClickedPattern = [];// creation of empty array

var started = false; //initalizating 
var level = 0;// initalizing

const startButton = document.querySelector('#startButton');

startButton.addEventListener('click', function() {
  if (!started) { //Since initalization of started was false we would when we check that the the value of started is false or not, the querry condition will be true hence we would go inside the loop
    $("#level-title").text("Level " + level);// document search for id level-title that is our h1. By using the method .text changing its text to the text "level" + value of level
    nextSequence(); // calling the function nextSequence
    started = true; //started= true therefore we would come out of loop
  }
});


    $(document).keypress(function() {//searching the whole document using jQerry ($) for any keypress event incase of detection calling the annonymus function
        if (!started) { //Since initalization of started was false we would when we check that the the value of started is false or not, the querry condition will be true hence we would go inside the loop
          $("#level-title").text("Level " + level);// document search for id level-title that is our h1. By using the method .text changing its text to the text "level" + value of level
          nextSequence(); // calling the function nextSequence
          started = true; //started= true therefore we would come out of loop
        }
      });



$(".btn").click(function() {//searching the buttons using jQuery($) for any .click event incase of detection calling the annonyms function

  var userChosenColour = $(this).attr("id");//creating a new variable userChosenColour assgining the value of id of the button the user has clicked. (we are doing this by using this which attaches the method .attr to the button that initated the event and gives the value of their ID )
  userClickedPattern.push(userChosenColour);// .push() adds the value of userChoosenColour at the end of the array named userClickedPattern

  playSound(userChosenColour); //playSound function will play default sound on the userChoosenColour it does by taking userChoosenColour as input.
  animatePress(userChosenColour); //animatePress function will animate the default type on the userChoosenColour it does by taking userChoosenColour as input.

  checkAnswer(userClickedPattern.length-1);//(userclickedPattern array-1)'s value is passed as a inout for the function checkAnswer
});

function checkAnswer(currentLevel) {//currentLevel is the name of the place holder which will take the input in this function

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {// here we check whether that the currentlevel from gamePattern is equal to userClickedPattern
      if (userClickedPattern.length === gamePattern.length){// now if the user successfully does the pattern equal to game pattern we proceed
        setTimeout(function () {// to lag for a while
          nextSequence();//calling next sequence 
        }, 1000);//time of 1 second=1000 milisecond
      }
    } else {
      playSound("wrong");// userpattern was not equal to the game generated pattern
      $("body").addClass("game-over");//we search the document for body then using .addClass we add already styled game-over class to the body
      $("#level-title").text("Game Over, Press Any Key to Restart");// we search the document for our h1 and change the text to gameover

      setTimeout(function () {//setting the timeout function to remove the added game-over class 
        $("body").removeClass("game-over");
      }, 200);// removal after 0.2 sec

      startOver();// calling the function startover
    }
}


function nextSequence() {
  userClickedPattern = [];//initalising userclicked pattern 
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);// creating a random number between 0-1 multiplying it by 4 to have number between 1-4 and rounding off to get rid of the decimal degits 
  var randomChosenColour = buttonColours[randomNumber];// creating a var with value of random number colour button
  gamePattern.push(randomChosenColour); // adding that random colour into the game pattern array to match the user clicked array

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);// to show which button the user have to click next
  playSound(randomChosenColour);//playing the sound on the button chosen by the user
}

function animatePress(currentColor) {//adding and removing the animate class on the button with timeout function of 0.1 seconds
  $("#" + currentColor).addClass("pressed");//adding the class
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");//removing the class
  }, 100);
}

function playSound(name) {
  var audio = new Audio( name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}