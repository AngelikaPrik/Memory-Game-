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

// конвертер времени
function convertTime(xCounter) {
	xCounter--;
	let min = 0;

	if (xCounter >= 60) {
		min = Math.trunc(xCounter / 60);
	}
	
	let sec = xCounter - min * 60;

	if(min >= 1 && sec < 10) {
		return `${min}:0${sec}`;
	}
	return `${min}:${sec}`; 
	
}function getPrevTimeString(settings){
	let prevTimeString = "prevTime";
	if (settings.rowCount == 4) {
		prevTimeString += "4";
	} else {
		prevTimeString += "6";
	}
	if (settings.difficult == 1){
		prevTimeString += "easy";
	} else {
		prevTimeString += "hard";
	}
	return prevTimeString;
}

function getBestTimeString(settings){
	let bestTimeString = "bestTime";
	if (settings.rowCount == 4) {
		bestTimeString += "4";
	} else {
		bestTimeString += "6";
	}
	if (settings.difficult == 1){
		bestTimeString += "easy";
	} else {
		bestTimeString += "hard";
	}
	return bestTimeString;
}