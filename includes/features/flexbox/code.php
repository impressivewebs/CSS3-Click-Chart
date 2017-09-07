.flexcontainer {
  display: flex;
  flex-direction: row-reverse;
}

.flexitem {
  flex-grow: 1;
}

.flexitem:first-child {
  order: 3;
  flex-grow: 2;
}