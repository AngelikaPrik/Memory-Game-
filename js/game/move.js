class Move {
	constructor(firstStep, secondStep, isSuccessfulMove) {
		this.fisrtStep = firstStep;
		this.secondStep = secondStep;

		//выигрышный ли последний ход
		this.isSuccessfulMove = isSuccessfulMove;
	}
}