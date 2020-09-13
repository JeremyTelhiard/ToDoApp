"use strict";

const listContainer = document.querySelector('[data-lists]');
const listForm = document.querySelector('[data-new-list]')
const listInput = document.querySelector('[data-list-input]')
const deleteList = document.querySelector('[data-delete-list]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitle = document.querySelector('[data-list-title]')
const listCount = document.querySelector('[data-list-count]')
const newTask = document.querySelector('[data-new-task]')
const newTaskInput = document.querySelector('[data-task-input]')
const clearTasks = document.querySelector('[data-delete-tasks]')
const displayTasks = document.querySelector('[data-tasks]')


const LOCAL_STORAGE_LIST_KEY = 'tasks.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.listId';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let listId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

listContainer.addEventListener('click', e => {
  if(e.target.tagName.toLowerCase() === 'li'){
    listId = e.target.dataset.listId;
    saveAll();
  }
})

deleteList.addEventListener('click', e => {
  lists = lists.filter(list => list.id !== listId);
  listId = null;
  saveAll();
})

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
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, listId);
}


function render() {
  clear(listContainer);
  lists.forEach(list => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.innerText = list.name;
    if(list.id === listId){
      listElement.classList.add('active-list');
    }
    listContainer.appendChild(listElement);
  })
}


function clear(element) {
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
}



render();