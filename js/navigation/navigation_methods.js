let isProgressStarted = false;

start();

function start() {
	startProgress();
}

function hideLoadingWindow() {
	$(loading_block).hide();
	$(starting_block).show();
	$(welcome_window).show();
	$(menu_container).show();
}

function showFieldAndStartGame(sizeField, difficult) {
	$(settings_window).hide();
	$(main_container).hide();
	$(field_container).show();

	let settings = new Settings(sizeField, difficult);
	let game = new Game(settings);
	game.init();
	game.run();
}

function showGameRules(){
	$(welcome_window).hide();
	$(game_rules_window).show();
}

function showSettings() {
	$(game_rules_window).hide();
	$(welcome_window).hide();
	$(win_window).hide();
	$(settings_window).show();
}

function showWinWindow(){
	$(field_container).hide();
	$(main_container).show();
	$(win_window).show();
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
		}
		let id = setInterval(frame, 10);
	}
}