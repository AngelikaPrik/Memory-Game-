' use strict ';

let isProgressStarted = false;

start();

function start() {
	startProgress();
}

function hideLoadingWindow() {
	$(loading_block).hide();
	$(rightSide).show();
	$(socials).show();
	$(homeBtn).show();
	$(starting_block).show();
	$(welcome_window).show();
	$(menu_burger).show();
	mainMelody.volume = 1;

	mainMelody.addEventListener("ended", function () {
		this.currentTime = 0;
		this.play();
	}, false);
}

let isFirstClick = true;
$(document).click(function () {
	if (isFirstClick) {
		mainMelody.play();
		document.querySelector("#music").style.opacity = "1";
		musicBtn.setAttribute("data-tooltip", "выключить музыку");
		isFirstClick = false;
	}
});

function showGameRules() {
	playSound();
	$(welcome_window).hide();
	$(socials).hide(500);
	$(game_rules_window).show();
	startAnimationForExampleCard();

	counter_block.style.visibility = "hidden";
}

function showSettings() {
	playSound();
	$(game_rules_window).hide();
	$(welcome_window).hide();
	$(win_window).hide();
	$(settings_window).show();
	$(socials).hide(500);

	counter_block.style.visibility = "hidden";
}

function showFieldAndStartGame(sizeField, difficult) {
	playSound();
	$(settings_window).hide();
	$(main_container).hide();
	$(socials).hide(500);
	$(field_container).show();

	counter_block.style.visibility = "hidden";

	let settings = new Settings(sizeField, difficult);
	let game = new Game(settings);
	game.init();
	game.run();
}

// экран с результатами игры

function showWinWindow(time, settings) {
	$(field_container).hide();
	$(main_container).show();
	$(win_window).show();
	$(socials).show(500);

	let prevTimeString = getPrevTimeString(settings);
	let bestTimeString = getBestTimeString(settings);

	score.innerHTML = `
	<p>Твоё время:</p><span>${(convertTime(time))}</span>`;
	if (localStorage.getItem(prevTimeString) != null) {
		score.innerHTML += `
	 <p>Предыдущий результат:</p>
	  <span>${convertTime(parseInt(localStorage.getItem(prevTimeString)))}
	 </span>`;
	}
	if (localStorage.getItem(bestTimeString) != null) {
		score.innerHTML += `
	 <p>Лучший результат:</p>
	  <span>${convertTime(parseInt(localStorage.getItem(bestTimeString)))}
	 </span>`;
	}

	counter_block.style.visibility = "hidden";
}

function playSound() {
	if (needToPlay) {
		new Audio("audio/soundNav.mp3").play();
	}
}

// loading bar

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
		let id = setInterval(frame, 20);
	}
}

// ползунок громкости

$(volumeArea).slider({
	animate: "slow",
	range: "min",
	value: 100,
	change: setVolume
});

function setVolume() {
	mainMelody.volume = $(volumeArea).slider("value") / 100;
	if (mainMelody.paused) {
		mainMelody.play();
		document.querySelector("#music").style.opacity = "1";
		musicBtn.setAttribute("data-tooltip", "выключить музыку");
	}
}

// вкл/выкл основной мелодии
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

// вкл/выкл звуков интерфейса

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

// смена фона
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

// tooltips

let tooltipElem;

document.addEventListener("mouseover", function(event) {
	let target = event.target;

	let tooltipHtml = target.dataset.tooltip;
	if (!tooltipHtml) return;


	tooltipElem = document.createElement('div');
	tooltipElem.className = 'tooltip';
	tooltipElem.innerHTML = tooltipHtml;
	document.body.append(tooltipElem);

	let coords = target.getBoundingClientRect();

	let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
	if (left < 0) left = 0;

	let top = coords.top + tooltipElem.offsetHeight + 20;

	tooltipElem.style.left = left + 'px';
	tooltipElem.style.top = top + 'px';
});

document.addEventListener("mouseout", function() {
	if (tooltipElem) {
		tooltipElem.remove();
		tooltipElem = null;
	}
});

// анимация карточек в примере игры

let animationNotStarted = true;

function startAnimationForExampleCard() {
	if (animationNotStarted) {
		animateExampleCard();
		setInterval(animateExampleCard, 5000);
		animationNotStarted = false;
	}
}

function animateExampleCard() {
	$("#example_card_1").toggleClass("flipped");
	setTimeout(function () {
		$("#example_card_2").toggleClass("flipped");
	}, 1000);
	setTimeout(function () {
		$("#example_card_1").toggleClass("flipped");
		$("#example_card_2").toggleClass("flipped");
	}, 3000);
}

// помощь-подсказка

helpBtn.addEventListener("click", function() {
	if (!isWaiting) {
		isWaiting = true;
		$(helpBtn).hide(500);
		let cards = document.querySelector(".field").querySelectorAll(".card");
		cards.forEach(element => {
			if (!element.classList.contains("opened") && !element.classList.contains("flipped")) {
				$(element).toggleClass('flipped');
			}
		});

		if (needToPlay) {
			new Audio("audio/clickCard.mp3").play();
		}

		setTimeout(function () {
			cards.forEach(element => {
				if (!element.classList.contains("opened")) {
					$(element).toggleClass('flipped');
				}
			});
			isWaiting = false;
			if (needToPlay) {
				new Audio("audio/clickCard.mp3").play();
			}
		}, 2000);
	} else {
		if (needToPlay) {
			new Audio("audio/cancel.mp3").play();
		}
	}

});