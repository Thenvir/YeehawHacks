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
    let nameSound = name + '.mp3';
    var audio = new Audio('sounds/' + nameSound);
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
    $('#level-title').text('Level: ' + level);
}

// Event listeners
$('.btn').click(function (e) {
    name = e.target.id;
    playSound(name);
    userPattern.push(name);
    animatePress(name);

    // Check User Answer
    
});

$(document).keydown(function () {
     if(!started){
         $('#level-title').text('Level: ' + level);
         next();
         started = true;
     }
});