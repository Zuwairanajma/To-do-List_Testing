import './index.css';

import { renderTaskList, addNewTask } from './modules/todoFunctions.js';

document.addEventListener('DOMContentLoaded', () => {
  renderTaskList();

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
    renderTaskList();
  });
});
