.waving {
    filter: custom(url('wave.vs'), 20 20, phase 0, amplitude 50);
    transition-property: filter;
    transition-duration: 0.2s;
}

.waving:hover {
    filter: custom(url('wave.vs'), 20 20, phase 90, amplitude 20);
}