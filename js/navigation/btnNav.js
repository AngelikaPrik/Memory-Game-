' use strict ';

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