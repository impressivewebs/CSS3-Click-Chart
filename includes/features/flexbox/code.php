.element {
	/*lines below are the old syntax */
	display: -webkit-box;
	-webkit-box-pack: justify;
	-webkit-box-align: center;
	display: -moz-box;
	-moz-box-pack: justify;
	-moz-box-align: center;
	display: -ms-box;
	-ms-box-pack: justify;
	-ms-box-align: center;

	/* lines below are the new syntax */
	display: flexbox;
	flex-pack: justify;
	flex-align: center;
}

	.child-boxes {
		-webkit-box-flex: 1;
		-moz-box-flex: 1;
		-ms-box-flex: 1;
		width: -webkit-flex(1);
		width: flex(1);
	}