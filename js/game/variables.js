' use strict ';


const field_container = document.querySelector(".field-container");
const main_container = document.querySelector(".main-container");
const menu_burger = document.querySelector(".menu-burger");
const counter_block = document.querySelector(".counter__block");

const loading_block = document.querySelector(".loading__block");
const starting_block = document.querySelector(".starting__block");

const welcome_window = document.querySelector(".welcome__window");
const game_rules_window = document.querySelector(".game-rules__window");
const game_example = game_rules_window.querySelector(".game-example");
const settings_window = document.querySelector(".settings__window");
const win_window = document.querySelector(".win__window");
const homeBtn = document.querySelector(".navBtn");
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
const rightSide = document.querySelector(".right-side");
const backgroundList = [
	"linear-gradient(122.11deg, #ED8D6F, #F3D463)",
	"linear-gradient(252.63deg, rgba(237, 111, 111, 0.82), rgba(100, 114, 244, 0.54))",
	"linear-gradient(110.47deg, #83FED2 0.76%, #7E6BCA 100%)",
	"linear-gradient(91.5deg, #FAE086, #DC90E3)"
];

let mainMelody = new Audio("audio/mainMelody.mp3");
