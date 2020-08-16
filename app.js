// -- Needed funcs
// Play Sound   --  DONE
// Animate button -- DONE
// Next Sequence -- DONE
// Start over
// Check Answer
var scores = JSON.parse(localStorage.getItem('scores'));
if(!Array.isArray(scores)){
    var scores = [];
}
let names = ['spongebob', 'patrick', 'sandy', 'plankton'];
let userPattern = [];
let gamePattern = [];
let level = 0;
let started = false;

var userScore = {
    name: '',
    score: 0
};

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
    userScore.score++;
    console.log(userScore);

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
        // console.log("Mistake - you lose");
        // Save to local storage
        scores.push(userScore);
        localStorage.setItem('recentScore', JSON.stringify(level));
        localStorage.setItem('scores', JSON.stringify(scores));
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
        let playerName = prompt("Please enter a name to save your score, or by default you will be ~Mystery~");
        if(playerName === '' || playerName === null){
            playerName = "Mystery";
        }
        userScore.name = playerName;
        // console.log(userScore);
         setTimeout(()=> {
            $('#level-title').text('Day: ' + level);
            next();
            started = true;
         }, 500);
     }
});