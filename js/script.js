const input = document.querySelector('.todo__input');
const list = document.querySelector('.todo__list');
const taskNumber = document.getElementById('taskNumber');
const btnAll = document.getElementById('btnAll');
const btnActive = document.getElementById('btnActive');
const btnComplete = document.getElementById('btnComplete');
const btnClearCompleted = document.getElementById('btnClearCompleted');
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
    const checkbox = document.createElement('input');
    const number = todo.length + 1;

    todo.push({id: number, state: true, desc: input.value});

    // Render task
    task.classList.add('todo__list-item');
    task.dataset.id = number;
    task.textContent = todo[number - 1].desc;
    list.appendChild(task);

    checkbox.id = number;
    checkbox.setAttribute("type", "checkbox");
    task.appendChild(checkbox);

    taskNumber.textContent = todo.length;
}

function viewAll() {
    todo.forEach((el, i) => {
        const id = i + 1;
        const task = document.createElement('li');
        const checkbox = document.createElement('input');

        // Render task
        task.classList.add('todo__list-item');
        task.dataset.id = id;
        task.textContent = el.desc;
        list.appendChild(task);

        checkbox.id = id;
        checkbox.setAttribute("type", "checkbox");
        task.appendChild(checkbox);

        taskNumber.textContent = todo.length;
    });
}

document.addEventListener('DOMContentLoaded', viewAll);

btnAll.addEventListener('click', ()=> {
    const tasks = document.querySelectorAll('li');
    tasks.forEach(el => el.style.display = "list-item");
})

// let todoActive = todo.filter(el => el.state === true);
btnActive.addEventListener('click', ()=> {
    todo.forEach(el => {
        if (el.state === false) {
            let taskActive = document.querySelector(`li[data-id="${el.id}"]`);
            taskActive.style.display = "none";
        } else {
            let taskActive = document.querySelector(`li[data-id="${el.id}"]`);
            taskActive.style.display = "list-item";
        }
    });
});

// let todoCompleted = todo.filter(el => el.state === false);
btnCompleted.addEventListener('click', () => {
    todo.forEach(el => {
        if (el.state === true) {
            let taskActive = document.querySelector(`li[data-id="${el.id}"]`);
            taskActive.style.display = "none";
        } else {
            let taskActive = document.querySelector(`li[data-id="${el.id}"]`);
            taskActive.style.display = "list-item";
        }
    });
});

btnClearCompleted.addEventListener('click', ()=> {
    todo.forEach(el => {
        if (el.state === false) {
            let taskActive = document.querySelector(`li[data-id="${el.id}"]`);
            taskActive.remove();
        }
    });
});

input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        addTodo();
    }
})