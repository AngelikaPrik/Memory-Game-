let field_container = document.querySelector(".field-container");
let main_container = document.querySelector(".main-container");
let menu_container = document.querySelector(".menu-container");

let loading_block = document.querySelector(".loading__block");
let starting_block = document.querySelector(".starting__block");

let welcome_window = document.querySelector(".welcome__window");
let game_rules_window = document.querySelector(".game-rules__window");
let settings_window = document.querySelector(".settings__window");
let win_window = document.querySelector(".win__window");

// navigation buttons
let btn1 = document.querySelector("#btn1");
let btn2 = document.querySelector("#btn2");
let btn3 = document.querySelector("#btn3");
let btn4 = document.querySelector("#btn4");
let btn5 = document.querySelector("#btn5");

// settings buttons
let btnSize_4 = document.querySelector(".size-4");
let btnSize_6 = document.querySelector(".size-6");
let btnEasy = document.querySelector(".easy-game");
let btnHard = document.querySelector(".hard-game");

// dropdown elements
let menuBtn = document.querySelector(".menu");
let menuItems = document.querySelector(".menu__items");
let musicBtn = document.querySelector(".music");

// audio 
let mainMelody = new Audio("audio/mainMelody.mp3");
const moveSound = new Audio("audio/clickCard.mp3");
const successMoveSound = new Audio("audio/successStep.mp3");

btn1.addEventListener("click", showGameRules, moveSound.play);

btn2.addEventListener("click", showSettings);

btn3.addEventListener("click", showSettings);

btn4.addEventListener("click", function () {
	showFieldAndStartGame(setting_size, setting_difficult);
});

btn5.addEventListener("click", showSettings);

let setting_size = 4;
let setting_difficult = 1;

btnSize_4.addEventListener("click", function () {
	setting_size = 4;
	if (!$(this).hasClass("selected")) {
		$(this).toggleClass("selected");
		$(btnSize_6).toggleClass("selected");
	}
});

btnSize_6.addEventListener("click", function () {
	setting_size = 6;
	if (!$(this).hasClass("selected")) {
		$(this).toggleClass("selected");
		$(btnSize_4).toggleClass("selected");
	}
});

btnEasy.addEventListener("click", function () {
	setting_difficult = 1;
	if (!$(this).hasClass("selected")) {
		$(this).toggleClass("selected");
		$(btnHard).toggleClass("selected");
	}
});

btnHard.addEventListener("click", function () {
	setting_difficult = 2;
	if (!$(this).hasClass("selected")) {
		$(this).toggleClass("selected");
		$(btnEasy).toggleClass("selected");
	}
});



menuBtn.addEventListener("click", function () {
	$(menuBtn).toggleClass("active");
	$(menuItems).toggleClass("active");
});

musicBtn.addEventListener("click", function () {
	if (mainMelody.paused) {
		mainMelody.play();
	} else {
		mainMelody.pause();
	}
});

let volumeArea = document.querySelector(".volume");
let volumeControl = document.querySelector(".volume__control");

$(volumeArea).slider({
	animate: "slow",
	range: "min",    
	value: 50,
	change: setVolume
});


function setVolume() {
	mainMelody.volume = $(volumeArea).slider( "value" ) / 100;
}