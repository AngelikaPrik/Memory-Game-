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