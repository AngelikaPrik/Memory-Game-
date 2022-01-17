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