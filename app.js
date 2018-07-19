// DOM caching
const form      = document.querySelector('#task-form'),
      taskInput = document.querySelector('#task'),
      filter    = document.querySelector('#filter'),
      taskList  = document.querySelector('.collection'),
      clearBtn  = document.querySelector('.clear-tasks');

// Load all event listeners
loadEventListeners();

// Loading all event listeners
function loadEventListeners() {
  // "DOM loaded" event
  document.addEventListener('DOMContentLoaded', getTasks);
  // "add task" event
  form.addEventListener('submit', addTask);
  // "remove task" event
  taskList.addEventListener('click', removeTask);
  // "clear tasks" event
  clearBtn.addEventListener('click', clearTasks);
  // "filter tasks" event
  filter.addEventListener('keyup', filterTasks);
}

// Adding new task to the list
function addTask(event) {
  // prevent submitting the form and reloading the pagegit s
  event.preventDefault();
  // check if user typed something
  if (taskInput.value === '') {
    console.log('Cannot add empty task');
    return;
  }
  // create li and add to ul
  createLi(taskInput.value);
  // store new task in local storage and clear input
  storeTaskInLS(taskInput.value);
  taskInput.value = '';
}

// Removing task from the list
function removeTask(event) {
  let trashIcon = event.target;
  if (trashIcon.parentNode.classList.contains('delete-item')) {
    trashIcon.parentNode.parentNode.remove();
    removeTaskFromLS(trashIcon.parentNode.parentNode)
  }
}

// Removing all tasks from the list
function clearTasks() {
  /*while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }*/
  // faster
  taskList.innerHTML = '';
  clearTasksInLS();
}

// Filtering the tasks
function filterTasks(event) {
  // cache text from filter input
  const text = event.target.value.toLowerCase();
  // cache all list items/tasks
  const allTasks = document.querySelectorAll('.collection-item');
  // filter logic
  allTasks.forEach( task => {
    const item = task.firstChild.textContent;
    // check if current task includes text from filter input
    if (item.toLowerCase().indexOf(text) !== -1) {
      // if yes, display it as a block
      task.style.display = 'block';
    } else {
      // if not, hide it
      task.style.display = 'none';
    }
  });
}

// ==== Local Storage handlers ====

// Getting tasks from local storage
function getTasks() {
  // check local storage and create tasks array
  let tasks = checkLS();
  // for each string in tasks array
  tasks.forEach( task => {
    // create li and add to ul
    createLi(task);
  });
}

// Storing tasks in local storage
function storeTaskInLS(task) {
  // check local storage and create tasks array
  let tasks = checkLS();
  // add new task to tasks array
  tasks.push(task);
  // save new task into local storage as a string
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Removing task from local storage
function removeTaskFromLS(taskTrash) {
  // check local storage and create tasks array
  let tasks = checkLS();
  /*tasks.forEach((taskLS, index) => {
    if (taskLS === taskTrash.textContent) {
      tasks.splice(index, 1);
    }
  })*/
  tasks = tasks.filter(taskLS => taskLS !== taskTrash.textContent);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Removing all tasks from local storage
function clearTasksInLS() {
  // removing all data from local storage
  /* localStorage.clear();*/
  // removing "tasks" from local storage
  localStorage.removeItem('tasks');
}

// ==== Helper functions ==== 

// creating task item
function createLi(taskText) {
    // create li element
    const li = document.createElement('li');
    // add class to new li
    li.className = 'collection-item';
    // create text node and append it to li
    li.appendChild(document.createTextNode(taskText));

    // create link with delete icon
    const link = document.createElement('a');
    // add class to link
    link.className = 'delete-item secondary-content';
    // insert icon into link
    // "insertAdjacentHTML" is faster than "innerHTML"
    link.insertAdjacentHTML('beforeend', '<i class="fas fa-trash"></i>');

    // add link to li, add li to ul
    li.appendChild(link);
    taskList.appendChild(li);
}

// checking LS if there are some tasks saved and creating an array
function checkLS() {
  // if local storage is empty
  if (localStorage.getItem('tasks') === null) {
    //create new array
    return [];
  } else {
    // otherwise grab existing array(as a string) and convert it to object usable for js
    return JSON.parse(localStorage.getItem('tasks'));
  }
}