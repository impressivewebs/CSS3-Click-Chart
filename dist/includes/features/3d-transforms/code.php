.container {
  perspective: 400;
}

.object {
  transform-style: preserve-3d; /* auto, flat */
}

.card {
  position: absolute;
  transition: transform 1s linear;
  backface-visibility: hidden;
}

.cfront {
  background: #993102;
  z-index: 2;
}

.cback {
  background: purple;
  transform: rotateY(180deg) translate3d(0, 0, 0);
}

.flipped {
  transform: rotateY(180deg);
}