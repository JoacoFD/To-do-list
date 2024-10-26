document.addEventListener('DOMContentLoaded', loadTasks);

const addTaskButton = document.getElementById('add-task');
const taskInput = document.getElementById('new-task');
const prioritySelect = document.getElementById('priority');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', addTask);

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => createTaskElement(task.text, task.priority));
}

// Add new task
function addTask() {
  const taskText = taskInput.value.trim();
  const taskPriority = prioritySelect.value;
  
  if (taskText !== '') {
    createTaskElement(taskText, taskPriority);
    saveTask(taskText, taskPriority);
    taskInput.value = '';
  }
}

// Create a task element
function createTaskElement(taskText, priority) {
  const li = document.createElement('li');
  li.classList.add(priority); // Add class based on priority (low, medium, high)
  
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  
  const editButton = document.createElement('button');
  editButton.innerHTML = '✏️';
  editButton.classList.add('edit-btn');
  editButton.addEventListener('click', () => editTask(taskSpan, li));
  
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '🗑️';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', () => deleteTask(li, taskText));
  
  li.appendChild(taskSpan);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(taskText, taskPriority) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, priority: taskPriority });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Edit task
function editTask(taskSpan, taskElement) {
  const newTaskText = prompt('Edit your task:', taskSpan.textContent);
  if (newTaskText !== null && newTaskText.trim() !== '') {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex((task) => task.text === taskSpan.textContent);
    tasks[taskIndex].text = newTaskText.trim();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskSpan.textContent = newTaskText.trim();
  }
}

// Delete task
function deleteTask(taskElement, taskText) {
  taskElement.remove();
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
