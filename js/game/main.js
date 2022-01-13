' use strict ';

let isStarted = false;

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

		//ожидание закрытия карточки
		let isWaiting = false;

		let isSuccessfulMove = 0;

		let cards = document.querySelectorAll(`.card`);

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

		//откладываем функцию на потом
		setTimeout(function () {
			cards.forEach(element => {
				$(element).toggleClass('flipped');
			});
			//todo перед начало игры
			isStarted = true;
			xCounter = 0;
			countdown();
		}, 5000);



		//на клике
		cards.forEach(card => {
			card.addEventListener("click", function () {
				//условие для того чтобы нажатие засчиталось
				if (!isWaiting && (card != lastStep.card) && isStarted && !card.className.includes("flipped")) {
					let x = card.getAttribute("x");
					let y = card.getAttribute("y");
					let cardValue = field[x][y];
					console.log(cardValue);

					if(needToPlay){
						new Audio("audio/clickCard.mp3").play();
					}
					
					let step = new Step(x, y, cardValue, card);

					$(this).toggleClass('flipped');

					//пушим ходы в историю
					statistic.history.push(new Step(x, y, cardValue, card));
					console.log(statistic.history);

					console.log("lastStep:" + JSON.stringify(lastStep) + "  currentStep:" + JSON.stringify(step));

					stepCounter++;

					//условие для выигранного хода
					if (lastStep.value == step.value &&
						stepCounter == 2) {
						if(needToPlay) {
							new Audio("audio/successStep.mp3").play();
						}
						isSuccessfulMove = true;
						statistic.successMoveCounter++;
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
								$(step.card).toggleClass('flipped');
								$(statistic.history[statistic.history.length - 2].card).toggleClass('flipped');
							}
							lastStep = new Step();
							stepCounter = 0;
							isWaiting = false;
							isSuccessfulMove = false;
						}, settings.timeout);
					}


					//закрывающий второй ход
					//условие проигрыша
					if (statistic.failedStepCounter == settings.failedMoveCountToHelp) {
						alert("YOU LOSE");
						statistic.failedStepCounter = 0;
						xCounter = 0;
						isStarted = false;
					}
					//выход из игры (победа)
					if (statistic.successMoveCounter == (settings.rowCount * settings.rowCount) / 2) {
						showWinWindow();
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

class Step {
	constructor(x, y, value, card) {
		//field
		this.x = x;
		this.y = y;
		this.value = value;

		//html
		this.card = card;
		if (this.card != undefined) {
			this.backCardElement = this.card.querySelector(".back");
		}

	}
}
class Move {
	constructor(firstStep, secondStep, isSuccessfulMove) {
		this.fisrtStep = firstStep;
		this.secondStep = secondStep;
		//выигрышный ли последний ход
		this.isSuccessfulMove = isSuccessfulMove;
	}
}

class Settings {
	constructor(sizeField, difficult) {
		this.timeout = 1000;
		this.failedMoveCountToHelp = 10;
		this.rowCount = sizeField;
		this.difficult = difficult;
	}
}

class Statistic {
	constructor() {
		//счетчик выигранных ходов для выхода
		this.successMoveCounter = 0;
		//счетчик неправильных шагов подряд
		this.failedStepCounter = 0;
		//история step
		this.history = [];
	}
}

// таймер времени
let counter;
let xCounter;

function countdown() {
	if (isStarted) {
		document.querySelector(".counter").innerHTML = xCounter;
		xCounter++;
		counter = setTimeout(countdown, 1000);
	}
}