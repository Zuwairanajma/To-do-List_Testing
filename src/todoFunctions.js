const taskList = document.getElementById('todo-task-list');
let editTaskDescription;
let deleteTask;

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const createTaskLists = (task) => {
  const deleteButton = document.createElement('button');
  const listItemElement = document.createElement('li');
  const iconElement = document.createElement('i');
  const descriptionElement = document.createElement('span');

  const checkboxElement = document.createElement('input');
  checkboxElement.type = 'checkbox';
  checkboxElement.checked = task.completed;

  descriptionElement.textContent = task.description;

  descriptionElement.addEventListener('click', () => {
    editTaskDescription(task);
  });

  listItemElement.appendChild(checkboxElement);
  listItemElement.appendChild(descriptionElement);

  iconElement.classList.add('fa', 'fa-ellipsis-v');
  iconElement.addEventListener('click', () => {
    editTaskDescription(task);
    deleteButton.style.display = 'block';
    deleteButton.style.height = '15px';
    iconElement.style.display = 'none';
    listItemElement.style.backgroundColor = '#f5f5a3';
  });
  listItemElement.appendChild(iconElement);

  deleteButton.innerHTML = '<i class="fa fa-trash-o"></i>';
  deleteButton.classList.add('delete-button');
  deleteButton.style.display = 'none';

  deleteButton.addEventListener('click', () => {
    deleteTask(task.index);
  });

  listItemElement.appendChild(deleteButton);

  return listItemElement;
};

function addNewTask(description) {
  const taskIndex = tasks.length + 1;

  const task = { description, completed: false, index: taskIndex };
  tasks.push(task);
  saveTasks();
  const listItemElement = createTaskLists(task);
  taskList.appendChild(listItemElement);
}

const updateTaskIndexes = () => {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
};

const renderTaskList = () => {
  taskList.innerHTML = '';

  tasks
    .sort((task1, task2) => task1.index - task2.index)
    .forEach((task) => {
      const listItemElement = createTaskLists(task);
      taskList.appendChild(listItemElement);
    });
};

deleteTask = (index) => {
  tasks = tasks.filter((task) => task.index !== index);
  updateTaskIndexes();
  saveTasks();
  renderTaskList();
};

editTaskDescription = (task) => {
  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.value = task.description;
  inputElement.classList.add('edit-input');

  inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      task.description = inputElement.value.trim();
      saveTasks();
      renderTaskList();
    } else if (event.key === 'Escape') {
      renderTaskList();
    }
  });

  const listItemElement = taskList.children[task.index -= 1];
  listItemElement.replaceChild(inputElement, listItemElement.children[1]);
  inputElement.select();
  task.index += 1;
};

export {
  saveTasks, createTaskLists, renderTaskList, addNewTask,
  updateTaskIndexes,
};