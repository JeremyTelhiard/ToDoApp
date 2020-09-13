"use strict";

const listContainer = document.querySelector('[data-lists]');
const listForm = document.querySelector('[data-new-list]')
const listInput = document.querySelector('[data-list-input]')


const LOCAL_STORAGE_LIST_KEY = 'tasks.lists';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

listForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = listInput.value;
  if(name == null || name === ''){
    return;
  }
  const list = createList(name);
  listInput.value = null;
  lists.push(list);
  saveAll();
})

function createList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: []
  }
}

function saveAll() {
  save();
  render();
}


function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
}


function render() {
  clear(listContainer);
  lists.forEach(list => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.innerText = list.name;
    listContainer.appendChild(listElement);
  })
}


function clear(element) {
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
}



render();