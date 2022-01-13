' use strict ';

let isProgressStarted = false;

start();



function start() {
	startProgress();
}

function hideLoadingWindow() {
	mainMelody.play();
	$(loading_block).hide();
	$(starting_block).show();
	$(welcome_window).show();
	$(menu_container).show();

	mainMelody.volume = 1;
	
	mainMelody.addEventListener("ended", function () {
		this.currentTime = 0;
		this.play();
	}, false);

}


function showFieldAndStartGame(sizeField, difficult) {
	playSound();
	$(settings_window).hide();
	$(main_container).hide();
	$(field_container).show();
	$(counter_block).show();

	let settings = new Settings(sizeField, difficult);
	let game = new Game(settings);
	game.init();
	game.run();
}

function showGameRules() {
	playSound();
	$(welcome_window).hide();
	$(game_rules_window).show();
	$(counter_block).hide();
}

function showSettings() {
	playSound();
	$(game_rules_window).hide();
	$(welcome_window).hide();
	$(win_window).hide();
	$(counter_block).hide();
	$(settings_window).show();
}

function showWinWindow() {
	$(field_container).hide();
	$(main_container).show();
	$(win_window).show();
	$(counter_block).hide();
	score.textContent = `Твоё время: ${xCounter - 1}`;
}

function playSound(){
	if (needToPlay) {
		new Audio("audio/soundNav.mp3").play();
	}
}

function startProgress() {
	if (!isProgressStarted) {
		isProgressStarted = true;
		let elem = document.querySelector("#myBar");
		let width = 1;

		let frame = function () {
			if (width >= 100) {
				clearInterval(id);
				isProgressStarted = false;
				hideLoadingWindow();
			} else {
				width++;
				elem.style.width = width + "%";
			}
		};
		let id = setInterval(frame, 10);
	}
}