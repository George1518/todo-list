document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn");
  const list = document.getElementById("list");
  const input = document.getElementById("input-box");
  const alert = document.getElementById("alert");

  let taskList = JSON.parse(localStorage.getItem("taskList")) || [];

  const ul = document.createElement("ul");
  ul.setAttribute("id", "uList");
  list.appendChild(ul);

  taskList.forEach(task => addTaskToUI(task));

  btn.addEventListener("click", () => {
    let task = input.value.trim();
    if (!task) {
      alert.innerText = "ENTER A TASK";
    } else {
      alert.innerText = "";
      addTaskToUI(task);
      taskList.push(task);
      localStorage.setItem("taskList", JSON.stringify(taskList));
      input.value = "";
    }
  });

  function addTaskToUI(task) {
    const li = document.createElement("li");
    const del = document.createElement("button");

    li.classList.add("list-items");
    li.innerText = task;

    del.setAttribute("id", "del-btn");
    del.className = "delete-btn";
    del.textContent = "❌";

    li.appendChild(del);
    ul.appendChild(li);
    list.classList.add("class-list");

    del.addEventListener("click", () => {
      ul.removeChild(li);
      taskList = taskList.filter(t => t !== task); 
      localStorage.setItem("taskList", JSON.stringify(taskList));
      if (ul.childElementCount === 0) {
        list.classList.remove("class-list");
      }
    });
  }
});
