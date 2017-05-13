$(document).ready(function () {

	//Function to start game
	function setupGame() {
		$('.timeLeft').hide();
		$('.question').hide();
		$('.options').hide();
		$('.result').hide();
	}
	//Establish start button behavior
	$('.start').on('click', function(startGame) {
		$('.timeLeft').show();
		$('.question').show();
		$('.options').show();
		$('.result').show();
		startTimer();
	})
    // Variables that I need
    var correctAnswer;
    	wrongAnswer;
    	restart;
    	start;
    var universal = {
		correct : 0,
		wrong : 0,
		noanswer : 0,
		question : 0,
		timer : 25,
	}
    //Establish timer for each question
    function startTimer(){
		universal.timer = 25;
		$('.timeLeft').html('Time Remaining: ' + universal.timer + ' seconds');
		counter = setInterval(runTimer, 1000);
    }
    // run the timer
    function runTimer(){
    	
    	// remove a second
		universal.timer--

		// display timer
		$('.timeLeft').html('Time Remaining: ' + universal.timer + ' seconds');
		
		// you ran out of time
		if (universal.timer === 0){

			// stop the counter from going negative
			stopTimer();

			// show answer and mark no answer
			showAnswer(0);
		}
    }
    // stop counting down
    function stopTimer(){
		clearInterval(counter);
    }
	// Restart
	function restart() {
		stopTimer();
		universal.correct = 0;
		universal.wrong = 0;
		universal.noanswer = 0;
		universal.question = 0;
		universal.timer = 25;
		startTrivia();
	}


});