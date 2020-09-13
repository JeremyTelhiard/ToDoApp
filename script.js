"use strict";

const listContainer = document.querySelector('[data-lists]');

let lists = [];

function render() {
  clear(listContainer);
  lists.forEach(list => {
    const listElement = document.createElement('li');
    listElement.innerText = list;
    listContainer.appendChild(listElement);
  })
}


function clear(element) {
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
}



render();