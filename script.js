let input = document.getElementById("todo-input");
let btn = document.getElementById("btn");
let todos = document.getElementById("todos");
let countOfTodo = document.getElementById("num");
let countOfCompleted = document.getElementById("completed");
let arrayOfTasks = [];

if (localStorage.getItem("todos")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("todos"));
  getCountTodo();
  getCountOfCompleted();
}
getDataFromLocalStorage();

btn.onclick = () => {
  if (input.value.trim() != "") {
    addToArray(input.value);
    getCountTodo();
    input.value = "";
  }
};
todos.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteItem(e.target.parentElement.dataset.id);
    e.target.parentElement.remove();
    getCountTodo();
    getCountOfCompleted();
  }
  if (e.target.classList.contains("checked")) {
    completeItem(e.target.parentElement.dataset.id);
    e.target.parentElement.children[1].classList.toggle("done");
    getCountOfCompleted();
  }
});

function addToArray(task) {
  let todo = {
    id: Date.now(),
    title: task,
    completed: false,
  };
  arrayOfTasks.push(todo);
  createTodoItem(arrayOfTasks);
  setDataToLocalStorage(arrayOfTasks);
}

function createTodoItem(arrayOfTasks) {
  todos.innerHTML = "";
  arrayOfTasks.forEach((el) => {
    let div = document.createElement("div");
    div.classList = "todo-item";
    div.setAttribute("data-id", el.id);
    let check = document.createElement("input");
    check.type = "checkbox";
    check.className = "checked";
    let h3 = document.createElement("h3");
    h3.textContent = el.title;
    let del = document.createElement("span");
    del.className = "del";
    if (el.completed) {
      check.click();
      h3.classList = "done";
    }
    div.append(check, h3, del);
    todos.appendChild(div);
  });
}

function setDataToLocalStorage(arrayOfTasks) {
  localStorage.setItem("todos", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  if (localStorage.getItem("todos")) {
    createTodoItem(JSON.parse(localStorage.getItem("todos")));
  }
}

function deleteItem(itemId) {
  arrayOfTasks = arrayOfTasks.filter((el) => el.id != itemId);
  setDataToLocalStorage(arrayOfTasks);
}

function completeItem(itemId) {
  arrayOfTasks.map((el) => {
    if (itemId == el.id) {
      el.completed == false ? (el.completed = true) : (el.completed = false);
    }
  });

  setDataToLocalStorage(arrayOfTasks);
}

function getCountTodo() {
  countOfTodo.textContent = JSON.parse(localStorage.getItem("todos")).length;
}

function getCountOfCompleted() {
  countOfCompleted.textContent = JSON.parse(
    localStorage.getItem("todos")
  ).filter((el) => el.completed == true).length;
}
