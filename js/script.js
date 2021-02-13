// elements
const input = document.querySelector('.todo__input');
const list = document.querySelector('.todo__list');
// buttons
const btnTheme = document.getElementById('btnTheme');
const btnAll = document.getElementById('btnAll');
const btnActive = document.getElementById('btnActive');
const btnCompleted = document.getElementById('btnCompleted');
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
    }
];
// ===========================================================================
function currentNumberTask(filter) {
    const numberTasks = document.getElementById('numberTasks');

    if (filter === "active") {
        const items = document.querySelectorAll('li[data-state="true"]');
        numberTasks.textContent = items.length;

    } else if (filter === "completed") {
        const items = document.querySelectorAll('li[data-state="false"]');
        numberTasks.textContent = items.length;

    } else {
        const items = document.querySelectorAll('.todo__list-item');
        numberTasks.textContent = items.length;
    }
}
// =========================================================================== TASK ADD, DELETE, MODIFY
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
        if (el.state === false) {
            checkbox.setAttribute("checked", "");
            task.dataset.state = false;
        } else {
            task.dataset.state = true;
        }
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

function addTodo() {
    const task = document.createElement('li');
    const label = document.createElement('label');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    const checkbox = document.createElement('input');
    const button = document.createElement('button');
    const img = document.createElement('img');
    const number = todo.length + 1;

    todo.push({
        id: number,
        state: true,
        desc: input.value
    });

    // Render task
    task.classList.add('todo__list-item');
    task.dataset.id = number;
    task.dataset.state = true;
    list.appendChild(task);
    task.classList.add('js-add-item'); /* effect added after insert */

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

// Modify task state
list.addEventListener('change', e => {
    const checkbox = e.target;
    const task = checkbox.parentElement.parentElement;

    const taskIndex = todo.findIndex(elem => elem.id === parseInt(task.dataset.id))

    if (checkbox.matches('.checkbox') && checkbox.checked) {
        todo[taskIndex].state = false;
        task.dataset.state = false;
    } else {
        todo[taskIndex].state = true;
        task.dataset.state = true;
    }
});

// Deleted task
list.addEventListener('click', e => {
    const closeButton = e.target;
    let flag = false;

    if (closeButton.matches('.button-delete')) {
        closeButton.parentElement.classList.remove('js-add-item');
        closeButton.parentElement.classList.add('js-removed-item');
        setTimeout(() => {
            closeButton.parentElement.remove();
        }, 500);

        for (let i = 0; i < todo.length && flag === false; i++) {
            if (parseInt(closeButton.parentElement.dataset.id) === todo[i].id) {
                todo.splice(i, 1);
                flag = true;
            }
        }
    }
    currentNumberTask();
});
// =========================================================================== FILTERS
function filterPendingTask(btnIdSelected) {

    const tasks = document.querySelectorAll('li');

    if (btnIdSelected === "btnAll") {
        btnAll.classList.add('js-activeFilter');
        btnActive.classList.remove('js-activeFilter');
        btnCompleted.classList.remove('js-activeFilter');

        tasks.forEach(task => {
            task.classList.remove('js-hideTasks');
        });
        currentNumberTask("all");
    }
    else if (btnIdSelected === "btnActive") {
        btnActive.classList.add('js-activeFilter');
        btnAll.classList.remove('js-activeFilter');
        btnCompleted.classList.remove('js-activeFilter');

        tasks.forEach(task => {
            if (task.dataset.state === "true") { task.classList.remove('js-hideTasks'); } 
            else { task.classList.add('js-hideTasks'); }
        })
        currentNumberTask("active");
    } 
    else {
        btnCompleted.classList.add('js-activeFilter');
        btnAll.classList.remove('js-activeFilter');
        btnActive.classList.remove('js-activeFilter');

        tasks.forEach(task => {
            if (task.dataset.state === "true") { task.classList.add('js-hideTasks'); }
            else { task.classList.remove('js-hideTasks'); }
        })
        currentNumberTask("completed");
    }
}

const filterSection = document.querySelector(".todo-list__footer-filters");

filterSection.addEventListener("click", e => {
    if (e.target.matches("#btnAll")) filterPendingTask(e.target.id);
    else if (e.target.matches("#btnActive")) filterPendingTask(e.target.id);
    else filterPendingTask(e.target.id);
})
// =========================================================================== CHOOSE THEME
const imageTheme = document.querySelector('.button-theme img');

function themeChoose(buttonName, themeName) {
    document.documentElement.setAttribute('data-theme', `${themeName}-theme`);
    imageTheme.setAttribute('src', `images/icon-${buttonName}.svg`);
    imageTheme.dataset.img = buttonName;
}

btnTheme.addEventListener('click', () => {
    if (imageTheme.dataset.img === "moon") {
        themeChoose("sun", "dark");
    } else {
        themeChoose("moon", "light");
    }
});
// ===========================================================================
btnClearCompleted.addEventListener('click', () => {
    for (let i = todo.length - 1; i >= 0; i--) {
        if (todo[i].state === false) {
            document.querySelector(`li[data-id="${todo[i].id}"]`).remove();
            todo.splice(i, 1);
        }
    }
    currentNumberTask();
});

input.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        addTodo();
        input.value = "";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    viewAll();
    btnAll.click();
});