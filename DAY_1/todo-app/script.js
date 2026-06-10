const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");
const taskCount = document.getElementById("taskCount");
const filterButtons = document.querySelectorAll("[data-filter]");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let currentFilter = "all";


// SAVE TO LOCAL STORAGE
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}


// UPDATE ACTIVE TASK COUNT
function updateCount() {
  const activeTasks = todos.filter(todo => !todo.completed).length;
  taskCount.textContent = `${activeTasks} tasks left`;
}


// RENDER TODOS
function renderTodos() {

  list.innerHTML = "";

  let filteredTodos = todos;

  if (currentFilter === "active") {
    filteredTodos = todos.filter(todo => !todo.completed);
  }

  if (currentFilter === "completed") {
    filteredTodos = todos.filter(todo => todo.completed);
  }

  filteredTodos.forEach((todo, index) => {

    const li = document.createElement("li");

    if (todo.completed) {
      li.classList.add("completed");
    }


    // CHECKBOX
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;

      saveTodos();
      renderTodos();
    });


    // TASK TEXT
    const span = document.createElement("span");
    span.textContent = todo.text;


    // EDIT BUTTON
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", () => {

      const newText = prompt("Edit task", todo.text);

      if (newText === null) return;

      const trimmed = newText.trim();

      if (trimmed === "") return;

      todo.text = trimmed;

      saveTodos();
      renderTodos();
    });


    // DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {

      todos = todos.filter(t => t !== todo);

      saveTodos();
      renderTodos();
    });


    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);

  });

  updateCount();
}


// ADD TASK
addBtn.addEventListener("click", () => {

  const text = input.value.trim();

  // PREVENT EMPTY INPUT
  if (text === "") return;


  // OPTIONAL DUPLICATE CHECK
  const duplicate = todos.some(
    todo => todo.text.toLowerCase() === text.toLowerCase()
  );

  if (duplicate) {
    alert("Task already exists");
    return;
  }


  todos.push({
    text: text,
    completed: false
  });

  saveTodos();

  renderTodos();

  input.value = "";
});


// FILTER BUTTONS
filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    currentFilter = button.dataset.filter;

    renderTodos();
  });

});


// INITIAL RENDER
renderTodos();