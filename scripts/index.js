var animationBg = lottie.loadAnimation({
    container: document.getElementById('wiggle-anim'), // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'bodymovin/Noodles.json' // the path to the animation json
});


var animationBg2 = lottie.loadAnimation({
    container: document.getElementById('bg-photo'), // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'bodymovin/HERO BM.json' // the path to the animation json
});



// function checkScreen() {


//     var checkMobile = window.matchMedia('screen and (max-width: 425px)');
//     var checkTablet = window.matchMedia('screen and (min-width: 425px) and (max-width: 768px)');
//     var checkDesktop = window.matchMedia('screen and (min-width: 1440px)');
//     var x = 100;

//     checkMobile.addListener(function (e) {

//         if (e.matches) {
//             x = 300;
//             // alert('MOBILE');
//         }
//     });

//     checkTablet.addListener(function (e) {

//         if (e.matches) {

//             x = 150;
//             // alert('TABLET');
//         }
//     });

//     checkDesktop.addListener(function (e) {

//         if (e.matches) {

//             x = 100;
//             // alert('DESKTOP');
//         }
//     });

//     scrollBG();

//     function scrollBG() {
//         window.addEventListener("scroll", function () {

//             var scrolled = window.pageYOffset;

//             var background = document.querySelector(".portfolio-titulo");

//             background.style.backgroundSize = x + (scrolled / 50) + "%";
//             background.style.bac
//         });
//     }



// }

// checkScreen();

