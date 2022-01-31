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
}