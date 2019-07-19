var countDownValue = 15;
var onScreenQuestion = 0;
var wins = 0;
var losses = 0;
var timer;

function countDown(){
    countDownValue--;
    $('#timer').html("Count Down:" + countDownValue);
    if (countDownValue === 0){
        questionTimeOut()
    }
}
function questionTimeOut(){
    clearInterval(timer);
    losses++;
    loadNextQuestion()
}
function winLossDisplay(){
    var winText = '<p>You got ' + wins + ' correct answers</p>';
    var lossText = '<p>You got ' + losses + ' incorrect answers</p>';
    var thanksText = '<p>Thank you for playing</p>';
    var playAgainButton = '<button id="restartButton" class="btn-dark">Play again</button>';
    var imDoneButton = '<button id="imDone" class="btn-dark">Im done</button>'
    $('#timer').html('Score screen');
    $('#gameArea').html(winText + lossText + thanksText + playAgainButton + imDoneButton);
}
function loadNextQuestion(){
    var endOfQuestion = (triviaQuestions.length - 1) === onScreenQuestion;
    if(endOfQuestion){
        winLossDisplay();
    } else{
        onScreenQuestion++;
        showQuestions();
    }
}
function showChoices(avalibleChoices) {
    for (var currentChoice = 0; currentChoice < avalibleChoices.length; currentChoice++) {
        $('#gameArea').append('<p class="selectedAnswer" data-id="' + currentChoice + '">' + avalibleChoices[currentChoice] + '</p>');
    }
}
function showQuestions() {
    countDownValue = 15;
    timer =setInterval(countDown, 1000);
    var tempQuestion = triviaQuestions[onScreenQuestion].askedQuestion;
    var tempChoices = triviaQuestions[onScreenQuestion].avalibleChoices;
    $('#timer').html("Count Down:" + countDownValue);
    $('#gameArea').html('<h4>' + tempQuestion + '</h4>');
    showChoices(tempChoices);
}



$(document).on('click','.selectedAnswer',function(){
    clearInterval(timer);
    var chosenAnswerIndex = $(this).attr('data-id');
    var chosenAnswer = triviaQuestions[onScreenQuestion].avalibleChoices[chosenAnswerIndex];
    var rightAnswer = triviaQuestions[onScreenQuestion].correctAnswer;
    if (rightAnswer === chosenAnswer) {
        wins++;
        $('#correctWrong').html("<h1>Right Answer!</h1>");
    } else {
        $('#correctWrong').html("<h1>Wrong Answer!</h1>");
        losses++;
    }
    loadNextQuestion();
});
$(document).on('click','#restartButton',function(){
    onScreenQuestion = 0;
    wins = 0;
    losses = 0;
    showQuestions();
});
$(document).on('click','#imDone',function(){
    $('#timer').empty();
    $('#gameArea').empty();
    $('#correctWrong').empty()
});
function imgCountDown(){
    $('#gif').animate({bottom: '0'}, 'slow');
    $('#gif').delay( 1800 )
    $('#gif').animate({bottom: '-480px'}, 'slow');
    }
    
$(document).on('click','#start',function(){
    $('#start').hide()
    onScreenQuestion = 0;
    wins = 0;
    losses = 0;
    showQuestions();
    setInterval(imgCountDown, 10000)
    clearInterval();
});


 