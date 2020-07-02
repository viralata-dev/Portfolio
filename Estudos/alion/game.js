// Variables

const buttonColors = ["orange", "blue", "green", "pink"];
let randomNumber;
let randomChosenColor;
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;

//  Functions

//* Disable buttons before game starts

if (!started) {
    $(".btn").addClass("no-clicks");
}

//* START THE GAME

$(document).keypress(function (event) {

    if (!started) {
        if (event.which == 32) {

            startGame();

        }
    }
})

//* RUN AND PLAY THE NEXT SEQUENCE

function nextSequence() {
    console.log("userPattern: " + userPattern.length);

    userPattern = [];
    level++;

    $("#level-title").text("Level " + (level));

    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    playSequence();

}

//* Add a timer between loop iterations so the sequence can be fully played.back

function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

async function playSequence() {

    for (let i = 0; i < gamePattern.length; i++) {

        const button = gamePattern[i];

        blink(button);
        playSound(button);

        await timer(1000);
    }
}



//* WATCH PLAYER INPUT

$('.btn').click(function (event) {
    const pressedBtn = event.target;
    const pressedColor = pressedBtn.classList[1];

    userPattern.push(pressedColor);

    playSound(pressedColor);
    blink(pressedColor);

    checkAnswer(userPattern.length - 1);
})


//* CHECK ANSWER

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        console.log("Yes!");

        if (userPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {

        console.log("NOOO!");
        destroyGame();

    }
}


function blink(btn) {

    const pressedBtn = $("." + btn);
    const pressedClass = btn + "-pressed";
    pressedBtn.addClass(pressedClass);
    pressedBtn.on("animationend", function () {
        pressedBtn.removeClass(pressedClass);
    })
}

function playSound(btn) {

    const sound = new Audio("/Estudos/alion/sounds/" + btn + (".mp3"))
    sound.play();
    console.log("BLINNNK")

}

function destroyGame() {

    const title = $("#level-title");

    title.text("GAME OVER");
    title.addClass("game-over");

    $(".btn").addClass("destroyed");
    $(".btn").on("transitionend", function () {
        $(".btn").css("display", "none");
        $("h2").addClass("restart");
    })
    started = false;
    userPattern = [];


}

function restartGame() {

    $(".btn").css("display", "inline-block");
    $(".btn").removeClass("destroyed");
    $(".btn").removeClass("no-clicks");
    $("h2").removeClass("restart");
    $("#level-title").removeClass("game-over");

    userPattern.length = 0;
    gamePattern.length = 0;
    level = 0;


}


function startGame() {

    restartGame();
    started = true;
    $("#level-title").text("Level " + (level + 1));

    setTimeout(function () {
        nextSequence();
    }, 500);
}