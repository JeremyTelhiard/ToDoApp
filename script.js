"use strict";

const listContainer = document.querySelector('[data-lists]')
const listForm = document.querySelector('[data-new-list]')
const listInput = document.querySelector('[data-list-input]')
const deleteList = document.querySelector('[data-delete-list]')
const listDisplay = document.querySelector('[data-list-display]')
const listTitle = document.querySelector('[data-list-title]')
const listCount = document.querySelector('[data-list-count]')
const newTask = document.querySelector('[data-new-task]')
const newTaskInput = document.querySelector('[data-task-input]')
const clearTasks = document.querySelector('[data-delete-tasks]')
const displayTasks = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')


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

displayTasks.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'input') {
      const selectedList = lists.find(list => list.id === listId)
      const selectedTask = selectedList.tasks.find(task => task.id === e.target.id);
      selectedTask.complete = e.target.checked;
      save();
      renderCount(selectedList);
    }
})


clearTasks.addEventListener('click', e => {
  const selectedList = lists.find(list => list.id === listId);
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete);
    saveAll();
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

newTask.addEventListener('submit', e => {
   e.preventDefault()
   const taskName = newTaskInput.value;
   if (taskName == null || taskName === '') {
      return
    }
   const task = createTask(taskName);
   newTaskInput.value = null;
   const selectedList = lists.find(list => list.id === listId);
   selectedList.tasks.push(task);
   saveAll();
})

function createTask(name) {
  return {
    id: Date.now().toString(),
    name: name,
    complete: false
    }
}

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
  listRender();

  const selectedList = lists.find(list => list.id === listId)
  if(listId == null) {
    listDisplay.style.display = 'none';
  } else {
    listDisplay.style.display = '';
    listTitle.innerText = selectedList.name;
    renderCount(selectedList);
    clear(displayTasks);
    taskRender(selectedList);
  }
}


function renderCount(selectedList) {
  const incompleteCount = selectedList.tasks.filter(task => !task.complete).length
  const taskString = incompleteCount === 1 ? "task" : "tasks"
  listCount.innerText = `${incompleteCount} ${taskString} remaining`
}


function taskRender(selectedList) {
  selectedList.tasks.forEach(task => {
      const taskElement = document.importNode(taskTemplate.content, true)
      const checkbox = taskElement.querySelector('input')
      checkbox.id = task.id
      checkbox.checked = task.complete
      const label = taskElement.querySelector('label')
      label.htmlFor = task.id
      label.append(task.name)
      displayTasks.appendChild(taskElement)
    })
}

function listRender(){
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