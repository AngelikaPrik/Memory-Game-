function start(){
	move();
	setTimeout(hideStartingWindow, 5000);
}

function hideStartingWindow(){
	let div = document.querySelector(".start_menu");
	$(div).hide();
}











// progressBar

let i = 0;

function move() {
	if (i == 0) {
		i = 1;
		let elem = document.querySelector("#myBar");
		let width = 1;

		let frame = function() {
			if (width >= 100) {
				clearInterval(id);
				i = 0;
			} else {
				width++;
				elem.style.width = width + "%";
			}
		}
		let id = setInterval(frame, 30);
	}
}

start();
