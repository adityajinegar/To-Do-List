//Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addToDo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterToDo)

//Functions
function addToDo(event) {
    //Prevent form from submitting
    event.preventDefault();
    //Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newToDo = document.createElement('li');
    newToDo.innerText = todoInput.value
    newToDo.classList.add('todo-item');
    todoDiv.appendChild(newToDo);

    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value)

    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    
    //APPEND TO LIST
    todoList.appendChild(todoDiv);

    //Clear todo Input Value
    todoInput.value = ""
} 

function deleteCheck(e) {
    const item = e.target
    //DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement
        //Animation
        todo.classList.add('fall')
        removeLocalTodos()
        todo.addEventListener('transitionend', () => {
            todo.remove()
        })
    }

    //CHECK MARK
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

function filterToDo(e) {
    const todos = todoList.childNodes
    todos.forEach((todo) => {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = 'none';
                }
                break
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break
        }
    })
}

function saveLocalTodos(todo) {
    let todos

    //CHECK --- HEY Do I already have thing in there ?
    if (localStorage.getItem('todos') === null) {
        todos = []
    }
    else {
        todo = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
  
    //CHECK --- HEY Do I already have thing in there ?
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    }
    else {
        todo = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach((todo) => {
         //Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newToDo = document.createElement('li');
    newToDo.innerText = todo
    newToDo.classList.add('todo-item');
    todoDiv.appendChild(newToDo);

    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
        //CHECK --- HEY Do I already have thing in there ?
        let todos
        if (localStorage.getItem('todos') === null) {
            todos = []
        }
        else {
            todo = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}