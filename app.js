// DOM caching
const form      = document.querySelector('#task-form'),
      taskInput = document.querySelector('#task'),
      filter    = document.querySelector('#filter'),
      taskList  = document.querySelector('.collection'),
      clearBtn  = document.querySelector('.clear-tasks');

// load all event listeners
loadEventListeners();

// function for loading all event listeners
function loadEventListeners() {
  // add task
  form.addEventListener('submit', addTask);
}

// callback function for adding new task to the list
function addTask(event) {
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

  // add link to li, add li to ul and clear input
  li.appendChild(link);
  taskList.appendChild(li);
  taskInput.value = '';

  // prevent submitting the form and reloading the page
  event.preventDefault();
}

