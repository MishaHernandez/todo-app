const input = document.querySelector('.todo__input');
const list = document.querySelector('.todo__list');

function addTodo() {
    const task = document.createElement('li');
    task.classList.add('.todo__list-item');
    task.textContent = input.value;
    list.appendChild(task);
}

function viewAll() {}
function viewActive() {}
function viewCompleted() {}

input.addEventListener('keypress', (e) => {
    // añadir tarea
    if (e.keyCode === 13) {
        e.preventDefault();
        addTodo();
    }
})