let bubbles = document.getElementById('bubbles');
let loading = document.getElementById('loading');
$('#container').hide();

// Plankton laugh audio
var audio = new Audio('sounds/loss.mp3');
audio.volume = 0.4;
audio.play();

// Loading transition
let time1 = 4.5;
let time = time1 * 1000;

function next() {
    bubbles.style.visibility = 'hidden';
    loading.style.visibility = 'hidden';
    $('#container').toggle("hide");
}
setTimeout("next()", time);



// Get and sort scores array
let scores = JSON.parse(localStorage.getItem('scores'));
let recentScore = localStorage.getItem('recentScore');
$('#span-score').text(recentScore);
// console.log(scores);

function compare(a, b){
    const scoreA = a.score;
    const scoreB = b.score;
    let result = 0;
    if(scoreA >= scoreB){
        result = 1;
    } else {
        result = -1;
    }
    return result;
}

let sortedScores = scores.sort(compare);
sortedScores = sortedScores.reverse();


// Generate Table
$('#tableLocation').append('<table></table>');
var table = $('#tableLocation').children();
table.append( "<tr style='text-align:center;'><td style='text-align:center;'>Player &#128377;&#65039;</td> <td style='text-align:center;'>Days &#128197; </td></tr>" );
sortedScores.forEach(score => {
    table.append( '<tr><td>	&#11088;' + score.name + '</td> <td>' + score.score + '</td></tr>' );
});