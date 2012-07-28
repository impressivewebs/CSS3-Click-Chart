.result-animations {
	-webkit-animation-name: bounceball;
	-webkit-animation-duration: 1s;
	-webkit-animation-iteration-count: infinite;
	-webkit-animation-direction: alternate;
	-webkit-animation-delay: 0;
	-webkit-animation-play-state: running;
	-webkit-animation-fill-mode: none;

	-moz-animation-name: bounceball;
	-moz-animation-duration: 1s;
	-moz-animation-iteration-count: infinite;
	-moz-animation-direction: alternate;
	-moz-animation-delay: 0;
	-moz-animation-play-state: running;
	-moz-animation-fill-mode: none;

	animation-name: bounceball;
	animation-duration: 1s;
	animation-iteration-count: infinite;
	animation-direction: alternate;
	animation-delay: 0;
	animation-play-state: running;
	animation-fill-mode: none;
}

@-webkit-keyframes bounceball {
	from {
		bottom: 0;
	}

	to {
		bottom: 60px;
	}

}

@-moz-keyframes bounceball {
	from {
		bottom: 0;
	}

	to {
		bottom: 60px;
	}

}

@keyframes bounceball {
	from {
		bottom: 0;
	}

	to {
		bottom: 60px;
	}

}