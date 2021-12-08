class Game {
	constructor() {
		this.field = [[],[],[],[]];
	}
	init() {
		this.field = this.getShuffledField();
		console.log(this.field);
		this.initField();
	}
	initField() {
		let cards = document.querySelectorAll(".card");
		console.log(cards);
		let index = 0;
		for (let i = 0; i < 4; i++){
			for (let j = 0; j < 4; j++){
				cards[index].innerText = this.field[i][j];
				index++;
			}
		}
	}
	getShuffledField() {
		let items = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
		for (let i = items.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[items[i], items[j]] = [items[j], items[i]];
		}
		let items2D = [[],[],[],[]];
		let index = 0;
		for (let i = 0; i < 4; i++){
			for(let j = 0; j < 4; j++){
				items2D[i][j] = items[index];
				index++;
			}
		}
		return items2D;
	}
}

let game = new Game;

game.init();