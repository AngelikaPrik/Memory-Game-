' use strict ';

let isStarted = false;

//ожидание закрытия карточки
let isWaiting = false;

class Game {
	constructor(settings) {
		this.field = [];
		this.settings = settings;
	}
	init() {
		this.createField();
	}
	createField() {
		this.field = this.getShuffledField();

		let rowCount = this.settings.rowCount;

		let fieldBlock = document.querySelector(".field");
		fieldBlock.style.gridTemplateColumns = `repeat(${rowCount}, 1fr)`;

		$(function () {
			$(fieldBlock).resizable({
				maxHeight: 700,
				maxWidth: 600,
				minWidth: 430,
				minHeight: 500,
				aspectRatio: 86 / 100
			});
		});

		fieldBlock.innerHTML = "";

		let index = 0;
		for (let x = 0; x < rowCount; x++) {
			for (let y = 0; y < rowCount; y++) {
				fieldBlock.innerHTML += `
				<div class="card" x="${x}" y="${y}">
					<div class="front">
						<img src="img/shirts/${index}.svg" alt="">
					</div><div class="back"></div>
				</div>
				`;
				index++;
			}
		}
	}
	getShuffledField() {
		let rowCount = this.settings.rowCount;
		let items = [];

		for (let i = 0; i < (rowCount * rowCount) / 2; i++) {
			items.push(i);
			items.push(i);
		}

		for (let i = items.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[items[i], items[j]] = [items[j], items[i]];
		}

		let items2D = [];
		for (let i = 0; i < rowCount; i++) {
			items2D.push([]);
		}

		let index = 0;
		for (let x = 0; x < rowCount; x++) {
			for (let y = 0; y < rowCount; y++) {
				items2D[x][y] = items[index];
				index++;
			}
		}
		return items2D;
	}
	static getRandomGradient() {

		let hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];

		function populate(a) {
			for (let i = 0; i < 6; i++) {
				let x = Math.round(Math.random() * 14);
				let y = hexValues[x];
				a += y;
			}
			return a;
		}

		let newColor1 = populate('#');
		let newColor2 = populate('#');
		let angle = Math.round(Math.random() * 360);

		return "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + ")";
	}
	run() {

		//объект с настройками
		let settings = this.settings;

		let statistic = new Statistic();

		//поле со значениями уже перемешанное
		let field = this.field;

		//последний шаг
		let lastStep = new Step();

		//счетчик ходов (чтобы сбрасывать после второго)
		let stepCounter = 0;

		let isSuccessfulMove = 0;

		let cards = document.querySelector(".field").querySelectorAll(".card");

		//ждем 2 сек до отображения
		setTimeout(function () {
			cards.forEach(element => {
				let x = element.getAttribute("x");
				let y = element.getAttribute("y");
				let cardValue = field[x][y];
				//todo
				element.querySelector(".back").innerHTML = `<img src="img/cards/${cardValue}.svg" alt="">`;

				if (settings.difficult == 2) {
					element.querySelector(".back").style.background = Game.getRandomGradient();
				}
				$(element).toggleClass('flipped');
			});

		}, 2000);
		//после 5 секунд закрываем

		//откладываем функцию на потом, здесь карточки закрываются
		setTimeout(function () {
			cards.forEach(element => {
				$(element).toggleClass('flipped');
			});
			//todo перед начало игры
			isStarted = true;
			xCounter = 0;
			countdown();

			counter_block.style.visibility = "visible";

		}, 5000);

		function clickCard() {

		}
		//на клике
		cards.forEach(card => {
			card.addEventListener("click", function () {
				//условие для того чтобы нажатие засчиталось
				if (!isWaiting && (card != lastStep.card) && isStarted && !card.className.includes("flipped")) {
					let x = card.getAttribute("x");
					let y = card.getAttribute("y");
					let cardValue = field[x][y];
					console.log(cardValue);

					if (needToPlay) {
						new Audio("audio/clickCard.mp3").play();
					}

					let step = new Step(x, y, cardValue, card);

					$(this).toggleClass('flipped');
					$(this).toggleClass('opened');

					//пушим ходы в историю
					statistic.history.push(new Step(x, y, cardValue, card));
					console.log(statistic.history);

					console.log("lastStep:" + JSON.stringify(lastStep) + "  currentStep:" + JSON.stringify(step));

					stepCounter++;

					//условие для выигранного хода
					if (lastStep.value == step.value &&
						stepCounter == 2) {
						if (needToPlay) {
							new Audio("audio/successStep.mp3").play();
						}
						isSuccessfulMove = true;
						statistic.successMoveCounter++;
						step.card.classList.add("opened");
						lastStep.card.classList.add("opened");
						$(helpBtn).hide(500);
						statistic.failedStepCounter = 0;
					}
					lastStep = step;

					if (stepCounter == 2) {
						isWaiting = true;
						if (!isSuccessfulMove) {

						}
						setTimeout(function () {
							if (!isSuccessfulMove) {
								statistic.failedStepCounter++;
								$(step.card).toggleClass('flipped opened');
								$(statistic.history[statistic.history.length - 2].card).toggleClass('flipped opened');
							}
							lastStep = new Step();
							stepCounter = 0;
							isWaiting = false;
							isSuccessfulMove = false;
						}, settings.timeout);
					}
					// подсказка

					if (statistic.failedStepCounter == 4) {
						$(helpBtn).show(500);
						statistic.failedStepCounter = 0;
					}

					//выход из игры (победа)
					if (statistic.successMoveCounter == (settings.rowCount * settings.rowCount) / 2) {
						let prevTimeString = getPrevTimeString(settings);
						let bestTimeString = getBestTimeString(settings);

						if (localStorage.getItem(bestTimeString) == null) {
							localStorage.setItem(bestTimeString, xCounter);
						}
						if (parseInt(localStorage.getItem(bestTimeString)) > xCounter) {
							localStorage.setItem(bestTimeString, xCounter);
						}
						showWinWindow(settings);

						localStorage.setItem(prevTimeString, xCounter);

						xCounter = 0;
						isStarted = false;
					}
				} else {
					console.log("нельзя");
				}
			});
		});
	}
}

const helpBtn = document.querySelector(".help");

helpBtn.addEventListener("click", function () {
	isWaiting = true;
	let cards = document.querySelector(".field").querySelectorAll(".card");
	cards.forEach(element => {
		if (!element.classList.contains("opened")) {
			$(element).toggleClass('flipped');
		}
	});

	setTimeout(function () {
		cards.forEach(element => {
			if (!element.classList.contains("opened")) {
				$(element).toggleClass('flipped');
			}
		});
		isWaiting = false;
		$(helpBtn).hide(500);
	}, 2000);
});