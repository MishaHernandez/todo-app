// elements
const input = document.querySelector('.todo__input');
const list = document.querySelector('.todo__list');
const taskNumber = document.getElementById('taskNumber');
// buttons
const btnAll = document.getElementById('btnAll');
const btnActive = document.getElementById('btnActive');
const btnComplete = document.getElementById('btnComplete');
const btnClearCompleted = document.getElementById('btnClearCompleted');
// objects
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
    const button = document.createElement('button');
    const number = todo.length + 1;

    todo.push({id: number, state: true, desc: input.value});

    // Render task
    task.classList.add('todo__list-item');
    task.dataset.id = number;
    task.textContent = todo[number - 1].desc;
    list.appendChild(task);

    checkbox.id = `checkbox${number}`;
    checkbox.classList.add('checkbox');
    checkbox.setAttribute("type", "checkbox");
    task.appendChild(checkbox);

    button.id = `btn${number}`;
    button.classList.add('button--delete');
    task.appendChild(button);

    taskNumber.textContent = todo.length;
}

function viewAll() {
    todo.forEach((el, i) => {
        const id = i + 1;
        const task = document.createElement('li');
        const checkbox = document.createElement('input');
        const button = document.createElement('button');

        // Render task
        task.classList.add('todo__list-item');
        task.dataset.id = id;
        task.textContent = el.desc;
        list.appendChild(task);

        checkbox.id = `checkbox${id}`;
        checkbox.classList.add('checkbox');
        checkbox.setAttribute("type", "checkbox");
        if (el.state === false) checkbox.setAttribute("checked", "");
        task.appendChild(checkbox);

        button.id = `btn${id}`;
        button.classList.add('button--delete');
        task.appendChild(button);

        taskNumber.textContent = todo.length;
    });
}

document.addEventListener('DOMContentLoaded', viewAll);

// Checked task
list.addEventListener('change', e => {
    const checkbox = e.target;
    let found = false;

    if (checkbox.checked) {
        for (let i = 0; i < todo.length && found === false; i++) {
            // console.log('found');
            if (todo[i].id === parseInt(checkbox.id)) {
                todo[i].state = false;
                found = true;
            }
        }
    }
    else {
        for (let i = 0; i < todo.length && found === false; i++) {
            // console.log('found');
            if (todo[i].id === parseInt(checkbox.id)) {
                todo[i].state = true;
                found = true;
            }
        }
    }
});

// Deleted task
list.addEventListener('click', e => {
    const button = e.target;
    
    if (button.matches('.button--delete')) {
        console.log(button.parentElement);
        button.parentElement.remove();
    }
})

btnAll.addEventListener('click', ()=> {
    const tasks = document.querySelectorAll('li');
    tasks.forEach(el => el.style.display = "list-item");
});

// let todoActive = todo.filter(el => el.state === true);
btnActive.addEventListener('click', ()=> {
    todo.forEach(el => {
        if (el.state === false) {
            let taskActive = document.querySelector(`li[data-id="${el.id}"]`);
            taskActive.style.display = "none";
            // aqui genera un error si los tareas completadas ya se limpiaron
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
            // aqui genera un error si los tareas completadas ya se limpiaron
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
});