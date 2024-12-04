const todoContainer = document.querySelector('.todo-container');
const button = document.querySelector('.add-new-todo');
let id = 0;

setIdValue = () => {
    //later with data storage we will check the latest id value on server
    id = id + 1;
    return id
};

function createTodo() {
    const newTodoItem = document.createElement('div');

    newTodoItem.setAttribute('class', 'todo-list-item');
    newTodoItem.setAttribute('id', String(setIdValue()));

    const newInput = document.createElement('input');
    newInput.setAttribute('class', 'todo-list-input');
    const newToggle = document.createElement('button');
    newToggle.setAttribute('class', 'todo-list-toggle');

    newToggle.setAttribute('class', 'empty');
    newToggle.onclick = () => {
        let status = newToggle.getAttribute('class');
        newToggle.setAttribute('class', status == 'empty'?'check':'empty');
    }

    newTodoItem.appendChild(newInput);
    newTodoItem.appendChild(newToggle);


    console.log(newTodoItem);

    todoContainer.appendChild(newTodoItem);

    return
}

button.addEventListener('click', () => {
    createTodo();

});