' use strict ';

const field_container = document.querySelector(".field-container"),
	fieldBlock = document.querySelector(".field"),
	main_container = document.querySelector(".main-container"),
	menu_burger = document.querySelector(".menu-burger"),
	counter_block = document.querySelector(".counter__block");

const loading_block = document.querySelector(".loading__block"),
	starting_block = document.querySelector(".starting__block");

const welcome_window = document.querySelector(".welcome__window"),
	game_rules_window = document.querySelector(".game-rules__window"),
	game_example = game_rules_window.querySelector(".game-example"),
	settings_window = document.querySelector(".settings__window"),
	win_window = document.querySelector(".win__window"),
	homeBtn = document.querySelector(".navBtn"),
	score = document.querySelector(".score"),
	socials = document.querySelector(".socials");

	
// navigation buttons
const btn1 = document.querySelector("#btn1"),
	btn2 = document.querySelector("#btn2"),
	btn3 = document.querySelector("#btn3"),
	btn4 = document.querySelector("#btn4"),
	btn5 = document.querySelector("#btn5");

// settings buttons
const btnSize_4 = document.querySelector(".size-4"),
	btnSize_6 = document.querySelector(".size-6"),
	btnEasy = document.querySelector(".easy-game"),
	btnHard = document.querySelector(".hard-game");

// dropdown elements
const menuBtn = document.querySelector(".menu"),
	menuItems = document.querySelector(".menu__items"),
	musicBtn = document.querySelector(".music"),
	soundBtn = document.querySelector(".sound"),
	volumeArea = document.querySelector(".volume"),
	backgroundBtnChange = document.querySelector(".bg"),
	backgroundList = [
		"linear-gradient(122.11deg, #ED8D6F, #F3D463)",
		"linear-gradient(252.63deg, rgba(237, 111, 111, 0.82), rgba(100, 114, 244, 0.54))",
		"linear-gradient(110.47deg, #83FED2 0.76%, #7E6BCA 100%)",
		"linear-gradient(91.5deg, #FAE086, #DC90E3)"
	];

const rightSide = document.querySelector(".right-side"),
	helpBtn = document.querySelector(".help");

let mainMelody = new Audio("audio/mainMelody.mp3");