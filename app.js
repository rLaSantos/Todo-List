// *Select DOM
const todoInput    = document.querySelector(".todo-input");
const todoButton   = document.querySelector(".todo-button");
const todoList     = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// *Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

// *Repetitive block of codes
// //Create list
function createList(todoDiv, todo) {

  const newTodo     = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value   = "";
}

// //Append Complete Button
function completeButton(todoDiv) {

  const completedButton     = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
}

// //Append Trash Button
function trashButton(todoDiv) {

  const trashButton     = document.createElement('button');
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);
}

// //Store to localstorage
function saveLocalTodos(todo) {

  let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// //Remove Item from local storage
function removeLocalTodos(todo) {

  let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}


// !Function for getting all todos
function getTodos() {

  let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

  todos.forEach(function (todo) {

    // //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // //Create list
    createList(todoDiv, todo);

    // //Create Completed Button
    completeButton(todoDiv);

    // //Create trash button
    trashButton(todoDiv);


    // //attach final Todo
    todoList.appendChild(todoDiv);
  });

}

// !Function for creating a todo
function addTodo(e) {

  // //Prevent natural behavior
  e.preventDefault();

  // //Create a todo div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // //Create list
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;

  // //Save to Local
  saveLocalTodos(todoInput.value);

  // //Add a task to the list
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  todoInput.value = "";

  // //Create the completed button
  completeButton(todoDiv);

  // //Create the trash button
  trashButton(todoDiv);

  // //Attach the final todo
  todoList.appendChild(todoDiv);
}


// !Function for deleting a todo
function deleteTodo(e) {

  const item = e.target;

  if (item.classList[0] === "trash-btn") {

    // e.target.parentElement.remove();
    const todo = item.parentElement;
    todo.classList.add("fall");

    //at the end
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", e => {
      
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {

    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
}


// !Function for Filter of todos
function filterTodo(e) {

  const todos = todoList.childNodes;

  todos.forEach(todo => {

    switch (e.target.value) {

      case "all":

        todo.style.display = "flex";
        break;

      case "completed":

        if (todo.classList.contains("completed")) {

          todo.style.display = "flex";
        } else {

          todo.style.display = "none";
        }
        break;

      case "uncompleted":

        if (!todo.classList.contains("completed")) {

          todo.style.display = "flex";
        } else {

          todo.style.display = "none";
        }
    }
  });
}