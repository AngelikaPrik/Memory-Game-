let field_container = document.querySelector(".field-container");
let main_container = document.querySelector(".main-container");

let loading_block = document.querySelector(".loading__block");
let starting_block = document.querySelector(".starting__block");

let welcome_window = document.querySelector(".welcome__window");
let game_rules_window = document.querySelector(".game-rules__window");
let settings_window = document.querySelector(".settings__window");
let win_window = document.querySelector(".win__window");

function start() {
	startProgress();
}

function hideLoadingWindow() {
	$(loading_block).hide();
	$(starting_block).show();
	$(welcome_window).show();
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


let btn1 = document.querySelector("#btn1");

btn1.addEventListener("click", showGameRules);


let btn2 = document.querySelector("#btn2");

btn2.addEventListener("click", showSettings);



function showGameRules(){
	$(welcome_window).hide();
	$(game_rules_window).show();
}

let btn3 = document.querySelector("#btn3");
btn3.addEventListener("click", showSettings);

function showSettings() {
	$(game_rules_window).hide();
	$(welcome_window).hide();
	$(win_window).hide();
	$(settings_window).show();
}

let setting_size = 4;
let setting_difficult = 1;
let btn4 = document.querySelector("#btn4");
btn4.addEventListener("click", function(){
	
	showFieldAndStartGame(setting_size, setting_difficult);
	});

let btnSize_4 = document.querySelector(".size-4");

btnSize_4.addEventListener("click", function(){
	setting_size = 4;
	if (!$(this).hasClass("selected")) {
		$(this).toggleClass("selected");
		$(btnSize_6).toggleClass("selected");
	}
});

let btnSize_6 = document.querySelector(".size-6");
btnSize_6.addEventListener("click", function(){
	setting_size = 6;
	console.log("22")
	if (!$(this).hasClass("selected")) {
		$(this).toggleClass("selected");
		$(btnSize_4).toggleClass("selected");
	}
});

let btnEasy = document.querySelector(".easy-game");

btnEasy.addEventListener("click", function(){
	setting_difficult = 1;
	if (!$(this).hasClass("selected")) {
		$(this).toggleClass("selected");
		$(btnHard).toggleClass("selected");
	}
});

let btnHard = document.querySelector(".hard-game");
btnHard.addEventListener("click", function(){
	setting_difficult = 2;
	console.log("22")
	if (!$(this).hasClass("selected")) {
		$(this).toggleClass("selected");
		$(btnEasy).toggleClass("selected");
	}
});
// progressBar

function showWinWindow(){
	$(field_container).hide();
	$(main_container).show();
	$(win_window).show();
}

let btn5 = document.querySelector("#btn5");
btn5.addEventListener("click", showSettings);

let menuBtn = document.querySelector(".menu");
let menuItems = document.querySelector(".menu__items");
menuBtn.addEventListener("click", function(){
	$(menuBtn).toggleClass("active");
	$(menuItems).toggleClass("active");
});


let i = 0;

function startProgress() {
	if (i == 0) {
		i = 1;
		let elem = document.querySelector("#myBar");
		let width = 1;

		let frame = function () {
			if (width >= 100) {
				clearInterval(id);
				i = 0;
				hideLoadingWindow();
			} else {
				width++;
				elem.style.width = width + "%";
			}
		}
		let id = setInterval(frame, 10);
	}

}

start();