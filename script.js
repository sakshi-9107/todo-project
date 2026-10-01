const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todolist");
const todoButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deletebutton");

const API = "http://localhost:3000/todos";

document.addEventListener("DOMContentLoaded", function () {
    todoButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks();
});

async function displayTasks() {
    const res = await fetch(API);
    const todos = await res.json();

    todoList.innerHTML = "";
    const counter = document.querySelector(".counter-container p span");
    if (counter) counter.textContent = ` ${todos.length} `;

    todos.forEach((item) => {
        const p = document.createElement("p");
        p.innerHTML = `
            <div class="todo-container">
                <input type="checkbox" class="todo-checkbox"
                    id="input-${item.id}" ${item.disabled ? "checked" : ""}>
                <label for="input-${item.id}"
                    class="${item.disabled ? "disabled" : ""}">
                    ${item.text}
                </label>
            </div>
        `;
        const checkbox = p.querySelector(".todo-checkbox");
        checkbox.checked = item.disabled === 1;
        checkbox.addEventListener("change", function () {
            toggleTask(item.id, this.checked);
        });
        todoList.appendChild(p);
    });
}

async function addTask() {
    const newTask = todoInput.value.trim();
    if (newTask !== "") {
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: newTask })
        });
        setTimeout(() => {
            todoInput.value = "";
            todoInput.focus();
        }, 10);
        displayTasks();
    }
}

async function toggleTask(id, disabled) {
    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disabled: disabled })
    });
    displayTasks();
}

async function deleteAllTasks() {
    await fetch(API, { method: "DELETE" });
    displayTasks();
}