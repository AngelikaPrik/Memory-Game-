class Settings {
	constructor(sizeField, difficult) {
		this.timeout = 1000;
		this.failedMoveCountToHelp = 10;
		this.rowCount = sizeField;
		this.difficult = difficult;
	}
}