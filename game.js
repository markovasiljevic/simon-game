var computerPickArray=[];
var computerLevel=-1;
var humanLevel=0;
var start=false,onlyOnce=true,nothingHappend=true,restart=false;

function computerPick() {
  var number=Math.round(Math.random()*3);
  var color;
  switch(number) {
    case 0:color ="green";
    break;
    case 1:color ="yellow";
    break;
    case 2:color ="blue";
    break;
    case 3:color ="red";
    break;
    default:
  }
  animationAndSound(color);
  computerPickArray.push(color);
  computerLevel++;
  $("h1").text("Level "+(computerLevel+1));
}

function animationAndSound(color) {
  $("#"+color).fadeOut().fadeIn();
  var audio = new Audio("./sounds/"+color+".mp3");
  audio.play();
}

function gameOver() {
 animationAndSound("wrong");
 $("h1").text("Game Over, Press Any Key to Restart");
 restart=true;
 $("body").addClass("game-over");
setTimeout(function () {
  $("body").removeClass("game-over");
}, 500);

}

//executing part

$(document).on("keydown",function() {
  if(restart) {
    computerPickArray=[]
    start=false,onlyOnce=true,nothingHappend=true;
    computerLevel=-1;
    humanLevel=0;
  }
  if(onlyOnce) {
    computerPick();
    onlyOnce=false;
    nothingHappend=false;
    restart=false;
  }
});


$(".btn").on("click",function() {

  if(restart) {
    return;
  }
    var color=$(this).attr("id");
    if(color==computerPickArray[humanLevel]) {
     animationAndSound(color);
     humanLevel++;
    }
    else {
     gameOver();
     return;
    }
    if(humanLevel>computerLevel) {
       setTimeout(computerPick,700);
       humanLevel=0;
    }
  }
);


