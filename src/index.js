import './index.css';
import { renderTaskList, addNewTask } from './todoFunctions.js';

const newTask = document.getElementById('new-task-add');
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskDescription = newTask.value;
  if (taskDescription.trim() === '') {
    return;
  }

  addNewTask(taskDescription);
  newTask.value = '';
});

window.addEventListener('load', renderTaskList);