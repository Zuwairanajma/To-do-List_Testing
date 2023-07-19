import './index.css';

const todoContainer = document.getElementById('task-list');
const tasks = [
  {
    description: 'Clean the house',
    completed: true,
    index: 1,
  },
  {
    description: 'Code for two hours',
    completed: false,
    index: 2,
  },
  {
    description: 'Complete to do list project',
    completed: true,
    index: 3,
  },
];

export default class DisplayTasks {
  static renderTasks() {
    tasks.sort((a, b) => a.index - b.index);
    todoContainer.innerHTML = '';
    tasks.forEach((task, index) => {
      todoContainer.innerHTML += `
        <li class="task" draggable="true" data-index="${index}">
          <div class="checkbox-container">
            <input type="checkbox" name="${task.description}" ${task.completed ? 'checked' : ''}>
            <input type="text" value="${task.description}" readonly>
          </div>
          <i class="fas fa-ellipsis-vertical" data-index="${index}"></i>
        </li>
      `;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  DisplayTasks.renderTasks();
});