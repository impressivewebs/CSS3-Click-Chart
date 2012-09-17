.object {
    -webkit-perspective: 300;
    -webkit-transform-style: preserve-3d;
    -moz-perspective: 300;
    -moz-transform-style: preserve-3d;
    -ms-perspective: 300;
    -ms-transform-style: preserve-3d;
    perspective: 300;
    transform-style: preserve-3d;
}

    .card {
        -webkit-transition: -webkit-transform 1s linear;
        -moz-transition: -moz-transform 1s linear;
        -ms-transition: -ms-transform 1s linear;
        -o-transition: -o-transform 1s linear;
        transition: transform 1s linear;
    }
			
    .cfront {
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden;
    }
            
    .flipped {
        -webkit-transform: rotateY(180deg);
        -moz-transform: rotateY(180deg);
        -ms-transform: rotateY(180deg);
        -o-transform: rotateY(180deg);
        transform: rotateY(180deg);
    }