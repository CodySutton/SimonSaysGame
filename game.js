
// Array holding all the colors.
var buttonColors = ["red", "blue", "green", "yellow"];
// This is where you log each random color from each turn in the game.
var gamePattern = [];
// This is where you log each users input.
var userClickedPattern = [];
// Tells the game that it has or hasnt started.
var inGame = false;
//Game level.
//var level = [0];


//This function starts the game.
$(document).keypress(function(){
  if (inGame === false){
    inGame = true;
    nextSequence();
    $("#level-title").html("Level 1")
  }
})


// This is logging the users click.
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


// This is selecting a random number, assigning a flash and sound to the relating button.
function nextSequence(){
userClickedPattern = [];
var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColor = buttonColors[randomNumber];
gamePattern.push(randomChosenColor);
$("#level-title").html("Level " + gamePattern.length.toString());
$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);
}


// This is where the sound for user and game turns are made, "name" is a placeholder for each input in their own functions.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


//This is adding a flash animation to the users input.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  },100);
}


// This checks if the answer is correct.
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

  if (gamePattern.length === userClickedPattern.length) {
    setTimeout(function() {
      nextSequence();
    },1000);
  }
  } else {
    endGame();
  }
}

// This is all carried out of the user plays a wrong move
function endGame() {
  $("#level-title").html("You lose! Press any key to Restart!");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  },200);
  var audio1 = new Audio("sounds/wrong.mp3");
  audio1.play();
  inGame = false;
  userClickedPattern = [];
  gamePattern = [];
  level = [];
}
