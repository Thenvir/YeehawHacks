// -- Needed funcs
// Play Sound   --  DONE
// Animate button -- DONE
// Next Sequence -- DONE
// Start over
// Check Answer
let names = ['spongebob', 'patrick', 'sandy', 'plankton'];
let userPattern = [];
let gamePattern = [];
let level = 0;
let started = false;

function playSound(name){
    let number = Math.floor(Math.random() * 4) + 1 + '';
    let nameSound = name + number + '.mp3';
    var audio = new Audio('sounds/' + nameSound);
    audio.volume = 0.4;
    audio.play();
}

function animatePress(name){
    $('#' + name).addClass('pressed');
    setTimeout(function(){
        $('#' + name).removeClass('pressed');
    }, 150);

    $('#' + name).fadeOut(150).fadeIn(150);
}

function next(){
    let number = Math.floor(Math.random() * 4);
    let name = names[number];
    gamePattern.push(name);
    level ++;

    animatePress(name);
    playSound(name);
    $('#level-title').text('Day: ' + level);
}

function check(end){
    if(gamePattern[end] === userPattern[end]){
        console.log('success');
        if(gamePattern.length === userPattern.length){
            setTimeout(function(){
                next();
                userPattern = [];
            }, 1500);
        }
    }
    else {
        console.log("Mistake - you lose");
        location.href = 'loss.html';
    }
}

// Event listeners
$('.btn').click(function (e) {
    name = e.target.id;
    playSound(name);
    userPattern.push(name);
    animatePress(name);

    // Check User Answer
    check(userPattern.length-1);
});

$(document).keydown(function () {
     if(!started){
         $('#level-title').text('Day: ' + level);
         next();
         started = true;
     }
});