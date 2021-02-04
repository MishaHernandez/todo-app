// elements
const input = document.querySelector('.todo__input');
const list = document.querySelector('.todo__list');
// buttons
const btnAll = document.getElementById('btnAll');
const btnActive = document.getElementById('btnActive');
const btnComplete = document.getElementById('btnComplete');
const btnClearCompleted = document.getElementById('btnClearCompleted');
// objects
let todo = [{
        id: 1,
        state: false,
        desc: 'Complete online JavaScript course'
    },
    {
        id: 2,
        state: true,
        desc: 'Jog around the park 3x'
    },
    {
        id: 3,
        state: true,
        desc: '10 minutes meditation'
    },
    {
        id: 4,
        state: true,
        desc: 'Read for 1 hour'
    },
    {
        id: 5,
        state: true,
        desc: 'Pick up groceries'
    },
    {
        id: 6,
        state: true,
        desc: 'Complete Todo App on Frontend Mentor'
    }];

function currentNumberTask() {
    const items = document.querySelectorAll('.todo__list-item');
    const numberTasks = document.getElementById('numberTasks');
    
    numberTasks.textContent = items.length;
}

function addTodo() {
    const task = document.createElement('li');
    const label = document.createElement('label');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    const checkbox = document.createElement('input');
    const button = document.createElement('button');
    const img = document.createElement('img');
    const number = todo.length + 1;

    todo.push({id: number, state: true, desc: input.value});

    // Render task
    task.classList.add('todo__list-item');
    task.dataset.id = number;
    list.appendChild(task);

    label.classList.add('todo__list-label');
    label.setAttribute("for", `checkbox${number}`);
    task.appendChild(label);

    checkbox.id = `checkbox${number}`;
    checkbox.classList.add('checkbox');
    checkbox.setAttribute("type", "checkbox");
    label.appendChild(checkbox);

    span1.classList.add('checkbox-fake');
    label.appendChild(span1);

    span2.classList.add('description');
    span2.textContent = todo[number - 1].desc;
    label.appendChild(span2);

    button.id = `btn${number}`;
    button.classList.add('button-delete');
    task.appendChild(button);

    img.setAttribute("src", "images/icon-cross.svg");
    button.appendChild(img);

    currentNumberTask();
}

function viewAll() {
    todo.forEach((el, i) => {
        const task = document.createElement('li');
        const label = document.createElement('label');
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        const checkbox = document.createElement('input');
        const button = document.createElement('button');
        const img = document.createElement('img');
        const id = i + 1;
        // Render task
        task.classList.add('todo__list-item');
        task.dataset.id = id;
        list.appendChild(task);

        label.classList.add('todo__list-label');
        label.setAttribute("for", `checkbox${id}`);
        task.appendChild(label);

        checkbox.id = `checkbox${id}`;
        checkbox.classList.add('checkbox');
        checkbox.setAttribute("type", "checkbox");
        if (el.state === false) checkbox.setAttribute("checked", "");
        label.appendChild(checkbox);

        span1.classList.add('checkbox-fake');
        label.appendChild(span1);

        span2.classList.add('description');
        span2.textContent = el.desc;
        label.appendChild(span2);

        button.id = `btn${id}`;
        button.classList.add('button-delete');
        task.appendChild(button);

        img.setAttribute("src", "images/icon-cross.svg");
        button.appendChild(img);
    });
    currentNumberTask();
}

document.addEventListener('DOMContentLoaded', viewAll);

// Modify task state
list.addEventListener('change', e => {
    const checkbox = e.target;
    const elemId = checkbox.parentElement.parentElement.dataset.id - 1;

    if (checkbox.matches('.checkbox') && checkbox.checked) {
        todo[elemId].state = false;
    } else {
        todo[elemId].state = true;
    }
});

// Deleted task
list.addEventListener('click', e => {
    const button = e.target;
    
    if (button.matches('.button-delete')) {
        button.parentElement.remove();
    }
    currentNumberTask();
})

btnAll.addEventListener('click', ()=> {
    const tasks = document.querySelectorAll('li');
    tasks.forEach(el => el.style.display = "list-item");
    currentNumberTask();
});

// let todoActive = todo.filter(el => el.state === true);
btnActive.addEventListener('click', ()=> {
    todo.forEach(el => {
        if (el.state === false) {
            // aqui genera un error si los tareas completadas ya se limpiaron
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
            // aqui genera un error si los tareas completadas ya se limpiaron
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
    currentNumberTask();
});

input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        addTodo();
    }
});