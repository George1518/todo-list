document.addEventListener("DOMContentLoaded", () => {
const btn = document.getElementById("btn");
const list = document.getElementById("list");
const input = document.getElementById("input-box");
const alert = document.getElementById("alert");
const clearCompleted = document.getElementById("clear-completed");
clearCompleted.classList.add('none')

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const ul = document.createElement("ul");
ul.setAttribute("id", "uList");
list.appendChild(ul);

// Show tasks on load
tasks.forEach(taskObj => addTaskToUI(taskObj));

// Handle Add button click
btn.addEventListener("click", () => {
let taskText = input.value.trim();
if (!taskText) {
alert.innerText = "ENTER A TASK";
} else {
alert.innerText = "";
const newTask = {
text: taskText,
checked: false,
createdAt: new Date().toLocaleString()
};
tasks.push(newTask);
localStorage.setItem("tasks", JSON.stringify(tasks));
addTaskToUI(newTask);
input.value = "";
}
});

// Add Task to UI
function addTaskToUI(taskObj) {
const li = document.createElement("li");
const del = document.createElement("button");
const div = document.createElement("div");
const check = document.createElement("input");

check.setAttribute('type', 'checkbox');
check.classList.add('check');
check.checked = taskObj.checked;

li.classList.add("list-items");
li.innerText = taskObj.text;

if (taskObj.checked) {
li.style.opacity = "0.6";

}

del.setAttribute("id", "del-btn");
del.className = "delete-btn";
del.textContent = "❌";

li.appendChild(div);
div.appendChild(del);
div.appendChild(check);
ul.appendChild(li);
div.classList.add('opts');
list.classList.add("class-list");
clearCompleted.classList.remove('none')
clearCompleted.classList.add("clear-completed");


// Update when checkbox toggled
check.addEventListener('change', () => {
taskObj.checked = check.checked;
if (check.checked) {
li.style.opacity = "0.6";
} else {
li.style.textDecoration = "none";
li.style.opacity = "1";
}
localStorage.setItem("tasks", JSON.stringify(tasks));
});

// Delete task
del.addEventListener("click", () => {
ul.removeChild(li);
tasks = tasks.filter(t => t.text !== taskObj.text);
localStorage.setItem("tasks", JSON.stringify(tasks));

if (ul.childElementCount === 0) {
list.classList.remove("class-list");
}
});
}

// Clear all completed tasks
clearCompleted.addEventListener("click", () => {
const remaining = tasks.filter(t => !t.checked);
tasks = remaining;
localStorage.setItem("tasks", JSON.stringify(remaining));
ul.innerHTML = "";
tasks.forEach(taskObj => addTaskToUI(taskObj));
if (tasks.length === 0) {

    list.classList.remove("class-list");
    clearCompleted.classList.add('none');
} ;
});
});