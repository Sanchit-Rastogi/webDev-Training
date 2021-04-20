let todoInput = document.getElementById("todoInput");
let addBtn = document.getElementById("addTodo");
let todoContainer = document.getElementById("todoListContainer");

addBtn.addEventListener('click', () => {
    let todo = document.createElement('p');
    todo.innerText = todoInput.value;
    todoContainer.appendChild(todo);
    todoInput.value = "";
    todo.addEventListener('click', () => {
        todo.style.textDecoration = "line-through";
    });
    todo.addEventListener('dblclick', () => {
        todoContainer.removeChild(todo);
    });
});