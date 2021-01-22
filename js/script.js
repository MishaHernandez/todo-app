const input = document.querySelector('.todo__input');
const list = document.querySelector('.todo__list');
let taskNumber = document.getElementById('taskNumber');
let todo = [{
        id: 1,
        state: true,
        desc: 'primera tarea'
    },
    {
        id: 2,
        state: false,
        desc: 'segunda tarea'
    },
    {
        id: 3,
        state: true,
        desc: 'tercera tarea'
    }];

function addTodo() {
    const task = document.createElement('li');
    const number = todo.length + 1;

    todo.push({id: number, state: true, desc: input.value});

    task.classList.add('todo__list-item');
    task.textContent = todo[number - 1].desc;
    list.appendChild(task);

    taskNumber.textContent = todo.length;
}

function viewAll() {
    todo.forEach(el => {
        const task = document.createElement('li');
        task.classList.add('todo__list-item');
        task.textContent = el.desc;
        list.appendChild(task);

        taskNumber.textContent = todo.length;
    });
}

document.addEventListener('DOMContentLoaded', viewAll);
function viewActive() {}
function viewCompleted() {}

input.addEventListener('keypress', (e) => {
    // añadir tarea
    if (e.keyCode === 13) {
        e.preventDefault();
        addTodo();
    }
})