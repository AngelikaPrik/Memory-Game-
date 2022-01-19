' use strict ';


let isProgressStarted = false;

start();

function start() {
	startProgress();
}

function hideLoadingWindow() {
	$(loading_block).hide();
	$(homeBtn).show();
	$(starting_block).show();
	$(welcome_window).show();
	$(menu_burger).show();
	$(socials).show(500);

	mainMelody.play();
	mainMelody.volume = 0.2;

	mainMelody.addEventListener("ended", function () {
		this.currentTime = 0;
		this.play();
	}, false);

}

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



function showWinWindow(settings) {
	$(field_container).hide();
	$(main_container).show();
	$(win_window).show();
	$(socials).show(500);

	let prevTimeString = getPrevTimeString(settings);
	let bestTimeString = getBestTimeString(settings);

	score.innerHTML = `
	<p>Твоё время:</p><span>${(convertTime(xCounter))}</span>`;
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

// tooltips

let tooltipElem;

document.addEventListener("mouseover", (event) => {
	let target = event.target;

	// если у нас есть подсказка...
	let tooltipHtml = target.dataset.tooltip;
	if (!tooltipHtml) return;

	// ...создадим элемент для подсказки

	tooltipElem = document.createElement('div');
	tooltipElem.className = 'tooltip';
	tooltipElem.innerHTML = tooltipHtml;
	document.body.append(tooltipElem);

	// спозиционируем его сверху от аннотируемого элемента (top-center)
	let coords = target.getBoundingClientRect();

	let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
	if (left < 0) left = 0; // не заезжать за левый край окна

	let top = coords.top + tooltipElem.offsetHeight + 20;

	tooltipElem.style.left = left + 'px';
	tooltipElem.style.top = top + 'px';
});

document.addEventListener("mouseout", () => {
	if (tooltipElem) {
		tooltipElem.remove();
		tooltipElem = null;
	}
});

let exampleCard1 = document.querySelector("#example_card_1");
let exampleCard2 = document.querySelector("#example_card_2");

function startAnimationForExampleCard() {
	animateExampleCard();
	setInterval(animateExampleCard, 5000);
}

function animateExampleCard() {
	$(exampleCard1).toggleClass("flipped");
	setTimeout(function () {
		$(exampleCard2).toggleClass("flipped");
	}, 1000);
	setTimeout(function () {
		$(exampleCard1).toggleClass("flipped");
		$(exampleCard2).toggleClass("flipped");
	}, 3000);
}