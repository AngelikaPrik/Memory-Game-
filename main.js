class Game {
	constructor(settings) {
		this.field = [
			[],
			[],
			[],
			[]
		];
		this.history = [];
		this.settings = settings;
	}
	init() {
		this.field = this.getShuffledField();
		console.log(this.field);
	}
	getShuffledField() {
		let items = [0, 1, 2, 3, 4, 3, 4, 5, 0, 1, 2, 6, 7, 5, 6, 7, ];
		for (let i = items.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[items[i], items[j]] = [items[j], items[i]];
		}
		let items2D = [
			[],
			[],
			[],
			[]
		];

		let index = 0;
		for (let x = 0; x < 4; x++) {
			for (let y = 0; y < 4; y++) {
				items2D[x][y] = items[index];
				index++;
			}
		}
		return items2D;
	}
	run() {

		//объект с настройками
		let settings = this.settings;

		//поле со значениями уже перемешанное
		let field = this.field;
		//история ходов
		let history = this.history;
		//последний ход
		let lastMove = new Move();
		//счетчик ходов (чтобы сбрасывать после второго)
		let moveCounter = 0;
		//счетчик выигранных ходов для выхода
		let successCounter = 0;
		//выигрышные ли последние два хода
		let isSuccessfulMove = false;

		//ожидание закрытия карточки
		let isWaiting = false;

		let isStarted = false;

		let cards = document.querySelectorAll(".card");

		//ждем 2 сек до отображения
		setTimeout(function () {
			cards.forEach(element => {
				let x = element.getAttribute("x");
				let y = element.getAttribute("y");
				let cardValue = field[x][y];
				//todo
				element.querySelector(".back").innerHTML = `<img src="/img/cards/${cardValue}.svg" alt="">`;
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
		}, 5000);

		//вся игра на клике.....
		cards.forEach(card => {
			card.addEventListener("click", function () {
				//условие для того чтобы нажатие засчиталось
				if (!isWaiting && card != lastMove.card && isStarted) {
					let x = card.getAttribute("x");
					let y = card.getAttribute("y");
					let cardValue = field[x][y];

					console.log(cardValue);

					let move = new Move(x, y, cardValue, card);

					console.log(move.card + "  " + move.backCardElement);

					move.backCardElement.innerHTML = `<img src="/img/cards/${move.value}.svg" alt="">`;

					console.log(move.card + "  " + move.backCardElement.innerHTML);
					$(this).toggleClass('flipped');

					//пушим ходы в историю
					history.push(new Move(x, y, cardValue, card));

					console.log("lastMove:" + JSON.stringify(lastMove) + "  currentMove:" + JSON.stringify(move));
					
					//условие для выигранного хода
					if (lastMove.value == move.value &&
						moveCounter == 1) {
							console.log("sdadsa");
						isSuccessfulMove = true;
						successCounter++;
					}

					lastMove = move;
					moveCounter++;

					//закрывающий второй ход
					if (moveCounter == 2) {
						isWaiting = true;
						setTimeout(function () {
							if (!isSuccessfulMove) {
								$(move.card).toggleClass('flipped');
								$(history[history.length-2].card).toggleClass('flipped');
							}
							moveCounter = 0;
							isSuccessfulMove = false;
							cards.forEach(element => {
								element.disabled = false;
							});
							isWaiting = false;
						}, settings.timeout);


					}
					//условие проигрыша
					if (history.length == settings.moveCountToFail) {
						alert("YOU LOSE");
					}
					//выход из игры (победа)
					if (successCounter == 8) {
						alert("WIN");
					}
				} else {
					console.log("нельзя");
				}
			});
		});

	}
}
class Move {
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

class Settings {
	constructor() {
		this.timeout = 1000;
		this.moveCountToFail = 100;
	}
}


let settings = new Settings();
let game = new Game(settings);

game.init();
game.run();