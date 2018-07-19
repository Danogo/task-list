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

// Getting tasks from local storage
function getTasks() {
  let tasks;
  // if local storage is empty
  if (localStorage.getItem('tasks') === null) {
    //create new array
    tasks = []
  } else {
    // otherwise grab existing array(as a string) and convert it to object usable for js
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach( task => {
    // create li element
    const li = document.createElement('li');
    // add class to new li
    li.className = 'collection-item';
    // create text node and append it to li
    li.appendChild(document.createTextNode(task));

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
  });

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

  // create li element
  const li = document.createElement('li');
  // add class to new li
  li.className = 'collection-item';
  // create text node and append it to li
  li.appendChild(document.createTextNode(taskInput.value));

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

  // store new task in local storage and clear input
  storeTasksInLS(taskInput.value);
  taskInput.value = '';
}

// Removing task from the list
function removeTask(event) {
  let trashIcon = event.target;
  if (trashIcon.parentNode.classList.contains('delete-item')) {
    trashIcon.parentNode.parentNode.remove();
    removeFromLS(trashIcon.parentNode.parentNode)
  }
}

//Removing task from local storage
function removeFromLS(taskTrash) {
  let tasks;
  // if local storage is empty
  if (localStorage.getItem('tasks') === null) {
    //create new array
    tasks = []
  } else {
    // otherwise grab existing array(as a string) and convert it to object usable for js
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  /*tasks.forEach((taskLS, index) => {
    if (taskLS === taskTrash.textContent) {
      tasks.splice(index, 1);
    }
  })*/
  tasks = tasks.filter(taskLS => taskLS !== taskTrash.textContent);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Removing all tasks from the list
function clearTasks() {
  /*while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }*/
  // faster
  taskList.innerHTML = '';
  clearTasksFromLS();
}

// Filtering the tasks
function filterTasks(event) {
  // cache text from filter input
  const text = event.target.value.toLowerCase();
  // cache all list items/tasks
  const allTasks = document.querySelectorAll('.collection-item');
  
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

// Storing tasks in local storage
function storeTasksInLS(task) {
  let tasks;
  // if local storage is empty
  if (localStorage.getItem('tasks') === null) {
    //create new array
    tasks = []
  } else {
    // otherwise grab existing array(as a string) and convert it to object usable for js
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // add new task to tasks array
  tasks.push(task);
  // save new task into local storage as a string
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Removing all tasks from local storage
function clearTasksFromLS() {
  // removing all data from local storage
  /* localStorage.clear();*/
  // removing "tasks" from local storage
  localStorage.removeItem('tasks');
}