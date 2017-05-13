$(document).ready(function () {
	// Variables that I need
    var correct = 0;
		wrong = 0;
		noanswer = 0;
		question = 0;
		timer = 25;
	//Function to start game
	function setupGame() {
		$('.timeLeft').empty();
		$('.question').empty();
		$('.options').empty();
		$('.result').empty();
	};
	//Establish start button behavior
	$('.start').on('click', function(startGame) {
		$('.timeLeft').show();
		$('.question').show();
		$('.options').show();
		$('.result').show();
		$('.start').hide();
		showQuestion();
	});
	//Showing the question
	function showQuestion(){

		$('.result').html('');
		startTimer();
		var count = question;
		var obj = questions[count];
		
		var qText = obj.q_text;
		$('.question').html(qText);
		
		var qAnswers = [obj.q_options_1, obj.q_options_2, obj.q_options_3, obj.q_options_4]
		$('.options').html('');
		for (var i = 0; i < qAnswers.length; i++) {
			var ans = qAnswers[i];
			var id = i + 1;
			var first = '<li id="'+id+'">'
			var last = '</li>'
			$('.options').append(first+ans+last);
		}

		for (var j = 1; j <= 4; j++) {
			$('#'+j).click(function(){
				showAnswer($(this).attr('id'));
			});
		}

	}
	//Shows the answer
	function showAnswer(num) {
		stopTimer();
		timer = 25;
		var count = question;
		var obj = questions[count];
		var objCorrect = obj.q_correct_option
		if (num == 0){
			noanswer++
			$('.result').html('Loser.');
		} else if (num == objCorrect) {
			correct++
			$('.result').html('Winning!');
		} else {
			wrong++
			$('.result').html('Wrong!');
			$('#'+num).addClass('wrong');
		}
		$('#'+objCorrect).addClass('correct');
		$('.result').append('<br> Correct: ' + correct + '<br>');
		$('.result').append('Wrong: ' + wrong + '<br>');
		$('.result').append('Missed: ' + noanswer);
		question++
		if (question < 4) {
			setTimeout(showQuestion, 3000);	
		} else {
			setTimeout(gameOver);
		}
		
	}
    //Establish timer for each question
    function startTimer(){
		timer = 25;
		$('.timeLeft').html('Time Remaining: ' + timer + ' seconds');
		counter = setInterval(runTimer, 1000);
    }
    // run the timer
    function runTimer(){
    	
    	// remove a second
		timer--

		// display timer
		$('.timeLeft').html('Time Remaining: ' + timer + ' seconds');
		
		// you ran out of time
		if (timer === 0){

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

    //Establishes a restart buttom
    $('.restart').on('click', restart);
	// Restart
	function restart() {
		stopTimer();
		$('.start').show();
		correct = 0;
		wrong = 0;
		noanswer = 0;
		question = 0;
		timer = 25;
		setupGame();
	}

	function gameOver() {
		
		$('.timeLeft').html('Hit Restart if you want to play again!');
		$('.question').html('');
		$('.result').html('<br> Correct: ' + correct + '<br>');
		$('.result').append('Wrong: ' + wrong + '<br>');
		$('.result').append('Missed: ' + noanswer);

		if (correct == 4) {
			$('.options').html('You are a winner!');
		} else if (correct > wrong) {
			$('.options').html('You almost got it, try again to see if you can win more.');
		} else if (noanswer == 4) {
			$('.options').html('Do you even care?');
		} else if (wrong > correct) {
			$('.options').html('Sad! Try again.');
		} else if (wrong == correct) {
			$('.options').html('We don\'t win anymore. Sad!');
		} else {
			$('.options').html('Thanks for trying...');
		}
		$('.restart').on('click', restart);
	}

});
	//Establish questions
	function question(number, text, opt1, opt2, opt3, opt4, ans) {
		this.id = number;
		this.q_text = text;
		this.q_options_1 = opt1;
		this.q_options_2 = opt2;
		this.q_options_3 = opt3;
		this.q_options_4 = opt4;
		this.q_correct_option = ans;
	};

	var question1 = new question (
		1,
		'Do we even win anymore?',
		'Yes!',
		'No!',
		'I know it.',
		'You know it.',
		1
	)

	var question2 = new question (
		2,
		'Do we even win anymore?',
		'Yes!',
		'No!',
		'I know it.',
		'You know it.',
		2
	)

	var question3 = new question (
		3,
		'Do we even win anymore?',
		'Yes!',
		'No!',
		'I know it.',
		'You know it.',
		3
	)

	var question4 = new question (
		4,
		'Do we even win anymore?',
		'Yes!',
		'No!',
		'I know it.',
		'You know it.',
		4
	)

	var questions = [question1, question2, question3, question4]