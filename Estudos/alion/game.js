const buttonColors = ["orange", "blue", "green", "pink"];
let randomNumber;
let randomChosenColor;
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;

//* Disable buttons before game starts

if (!started) {
    $(".btn").addClass("no-clicks");
}

//* Press Space to Start

$(document).keypress(function (event) {

    if (!started) {
        if (event.which == 32) {

            nextSequence();
        }
    }
})


//! Cria uma nova sequencia
function nextSequence() {

    started = true;
    userPattern = [];

    // cria um número de 1 a 4 e adiciona ao array gamePattern
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    level++; // sobe o level

    $("#level-title").text("Level " + (level)); // atualiza o level no título


    // diminui em x por partida o delay entre as animações

    var delay = 700;
    var difficulty = 30;

    delay = delay - ((gamePattern.length - 1) * difficulty);
    animTime = (delay / 1000) + "s";
    $(".btn").css("transitionDuration", animTime);

    // Toca a sequencia com intervalo definido por time

    var counter = 0;

    var timer = setInterval(() => {

        if (gamePattern.length > counter) {
            //acertou

            var pressedBtn = ("." + gamePattern[counter]);
            var color = (gamePattern[counter]);

            newblink(pressedBtn, color);

            counter++;

        } else {
            // errou

            clearInterval(timer);
        }

    }, delay);
}


//! Adiciona o input do usuário ao array e dispara a função blink quando o usuário clica

$(".btn").click((event) => {
    var pressedBtn = event.target; // define o div que foi clickado
    var pressedColor = $(pressedBtn).attr("id"); // seleciona a cor pelo id do div

    userPattern.push(pressedColor); // adiciona ao array userPattern

    newblink(pressedBtn, pressedColor); // dispara a animação e som

    //* checar entrada do jogador

    //  se o valor do index do array do jogador bate com o do jogo

    if (gamePattern[userPattern.length - 1] === userPattern[userPattern.length - 1]) {
        console.log("acertou");

        // ate os dois terem o mesmo tamanho
        if (userPattern.length === gamePattern.length) {

            setTimeout(function () {
                console.log("próximo level");


                nextSequence();

            }, 500);
        }

    } else {

        console.log("Errou");

        sound = new Audio("/estudos/alion/sounds/wrong.wav")
        sound.play();

        const title = $("#level-title");

        title.text("GAME OVER");
        title.addClass("game-over");

        $(".btn").addClass("destroyed");
        $(".btn").on("transitionend", function () {

            $(".btn").css("display", "none");
            $("h2").addClass("restart");
        })


        $(document).keypress((event) => {

            if (started) {
                if (event.which == 32) {
                    console.log("Restart Game")

                    $(".btn").css("display", "inline-block");
                    $(".btn").removeClass("destroyed");
                    $(".btn").removeClass("no-clicks");
                    $("h2").removeClass("restart");
                    $("#level-title").removeClass("game-over");

                    console.log("Novo jogo.")

                    started = false;
                    level = 0;
                    gamePattern = [];

                    nextSequence();
                }
            }
        })
    }


})

function newblink(pressedBtn, pressedColor) {

    //* Tocar o Audio
    var sound = new Audio("/estudos/alion/sounds/" + pressedColor + ".wav"); // cria o nome do arquivo de audio
    sound.play(); // toca o audio selecionado

    //* Disparar a animação
    var pressedClass = `${pressedColor}-pressed`;
    $(pressedBtn).addClass(pressedClass); // adiciona a classe cor-pressed

    //* Aguarda o fim da animação e remove a classe
    $(pressedBtn).on("animationend", () => {
        $(pressedBtn).removeClass(pressedClass);
    })

}