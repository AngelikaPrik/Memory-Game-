' use strict ';

const field_container = document.querySelector(".field-container");
const main_container = document.querySelector(".main-container");
const menu_burger = document.querySelector(".menu-burger");
const counter_block = document.querySelector(".counter__block");

const loading_block = document.querySelector(".loading__block");
const starting_block = document.querySelector(".starting__block");

const welcome_window = document.querySelector(".welcome__window");
const game_rules_window = document.querySelector(".game-rules__window");
const settings_window = document.querySelector(".settings__window");
const win_window = document.querySelector(".win__window");
const homeBtn = document.querySelector(".home");
const score = document.querySelector(".score");
const socials = document.querySelector(".socials");

// navigation buttons
const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const btn3 = document.querySelector("#btn3");
const btn4 = document.querySelector("#btn4");
const btn5 = document.querySelector("#btn5");

// settings buttons
const btnSize_4 = document.querySelector(".size-4");
const btnSize_6 = document.querySelector(".size-6");
const btnEasy = document.querySelector(".easy-game");
const btnHard = document.querySelector(".hard-game");

// dropdown elements
const menuBtn = document.querySelector(".menu");
const menuItems = document.querySelector(".menu__items");
const musicBtn = document.querySelector(".music");
const soundBtn = document.querySelector(".sound");
const volumeArea = document.querySelector(".volume");
const backgroundBtnChange = document.querySelector(".bg");
const backgroundList = [
	"linear-gradient(122.11deg, #ED8D6F, #F3D463)",
	"linear-gradient(252.63deg, rgba(237, 111, 111, 0.82), rgba(100, 114, 244, 0.54))",
	"linear-gradient(110.47deg, #83FEA6 0.76%, #7E6BCA 100%)",
	"linear-gradient(91.5deg, #FAE086, #DC90E3)",

];

let mainMelody = new Audio("audio/mainMelody.mp3");

homeBtn.addEventListener("click", () => {
	isStarted = false;
	$(game_rules_window).hide();
	$(field_container).hide();
	$(settings_window).hide();
	counter_block.style.visibility = "hidden";
	$(helpBtn).hide(500);
	$(win_window).hide();
	$(starting_block).show();
	$(welcome_window).show();
	$(main_container).show();
	$(socials).show(500);
});

btn1.addEventListener("click", showGameRules);

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
	playSound();
});

btnSize_6.addEventListener("click", function () {
	setting_size = 6;
	if (!$(this).hasClass("selected")) {
		$(this).toggleClass("selected");
		$(btnSize_4).toggleClass("selected");
	}
	playSound();
});

btnEasy.addEventListener("click", function () {
	setting_difficult = 1;
	if (!$(this).hasClass("selected")) {
		$(this).toggleClass("selected");
		$(btnHard).toggleClass("selected");
	}
	playSound();
});

btnHard.addEventListener("click", function () {
	setting_difficult = 2;
	if (!$(this).hasClass("selected")) {
		$(this).toggleClass("selected");
		$(btnEasy).toggleClass("selected");
	}
	playSound();
});



menuBtn.addEventListener("click", function () {
	$(menuBtn).toggleClass("active");
	$(menuItems).toggleClass("active");
	playSound();
});

musicBtn.addEventListener("click", () => breakMelody(mainMelody));
soundBtn.addEventListener("click", switchSound);

// ползунок громкости

$(volumeArea).slider({
	animate: "slow",
	range: "min",
	value: 100,
	change: setVolume
});

function setVolume() {
	mainMelody.volume = $(volumeArea).slider("value") / 100;
	document.querySelector(".ui-slider-handle").setAttribute("data-tooltip", $(volumeArea).slider("value") + "%");
}

let needToPlay = true;

function breakMelody(item) {
	if (item.paused) {
		item.play();
		document.querySelector("#music").style.opacity = "1";
		musicBtn.setAttribute("data-tooltip", "выключить музыку");
	} else {
		item.pause();
		document.querySelector("#music").style.opacity = "0.3";
		
		musicBtn.setAttribute("data-tooltip", "включить музыку");
	}
	playSound();
}

function switchSound() {
	needToPlay = !needToPlay;
	if (needToPlay) {
		document.querySelector("#sound").style.opacity = "1";
		soundBtn.setAttribute("data-tooltip", "выключить звуки интерфейса");
	} else {
		document.querySelector("#sound").style.opacity = "0.3";
		soundBtn.setAttribute("data-tooltip", "включить звуки интерфейса");
	}
	playSound();
}

let index = 0;
backgroundBtnChange.addEventListener("click", function () {
	index++;
	if (index == backgroundList.length) {
		index = 0;
	}
	document.querySelector("body").style.setProperty("background", backgroundList[index]);
	document.querySelector("body").style.setProperty("background-size", "400% 400%");
	playSound();
});