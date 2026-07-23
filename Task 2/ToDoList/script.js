const priority = document.getElementById("priority");
const allBtn = document.getElementById("allBtn");
const completedBtn = document.getElementById("completedBtn");
const pendingBtn = document.getElementById("pendingBtn");
const searchInput = document.getElementById("searchInput");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

let tasks = [];

addBtn.addEventListener("click", function () {
    addTask();
});

taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});

searchInput.addEventListener("keyup", function () {

    let value = searchInput.value.toLowerCase();

    let tasks = taskList.getElementsByTagName("li");

    for (let i = 0; i < tasks.length; i++) {

        let text = tasks[i].querySelector(".taskText").textContent.toLowerCase();

        if (text.includes(value)) {
            tasks[i].style.display = "flex";
        } else {
            tasks[i].style.display = "none";
        }

    }

});

function addTask(task = null) {

    let taskText = task || taskInput.value.trim();
    let priorityValue = priority.value;

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    const currentDate = new Date();

    const date = currentDate.toLocaleDateString();

    const time = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
});

li.innerHTML = `
    <input type="checkbox" class="checkTask">
    <div class="taskInfo">
        <span class="taskText">${taskText}</span>
        <small class="taskDate">
            📅 ${date} &nbsp;&nbsp; 🕒 ${time}
        </small>

        <span class="priority ${priorityValue.toLowerCase()}">
            ${priorityValue}
        </span>
    </div>

    <button class="editBtn">Edit</button>

    <button class="deleteBtn">Delete</button>
`;

    const editBtn = li.querySelector(".editBtn");

    const deleteBtn = li.querySelector(".deleteBtn");

    deleteBtn.addEventListener("click", function () {
        li.remove();
        updateCounter();
        checkEmpty();
    });

    editBtn.addEventListener("click", function () {

    const taskSpan = li.querySelector(".taskText");

    let newTask = prompt("Edit your task:", taskSpan.textContent);

    if (newTask !== null && newTask.trim() !== "") {
    taskSpan.textContent = newTask;
    updateCounter();
}

});

    const checkTask = li.querySelector(".checkTask");

    checkTask.addEventListener("change", function () {
    if (checkTask.checked) {
        li.classList.add("completed");
} 
    else {
        li.classList.remove("completed");
}
    updateCounter();

});

    taskList.appendChild(li);
    checkEmpty();


    if (!task) {
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
   
    taskInput.value = "";
    updateCounter();
}
function updateCounter() {

    let totalTasks = taskList.children.length;

    let completedTasks = document.querySelectorAll(".checkTask:checked").length;

    completedCount.textContent = completedTasks;

    pendingCount.textContent = totalTasks - completedTasks;

}

function checkEmpty() {

    const emptyMessage = document.getElementById("emptyMessage");

    if (taskList.children.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

}

updateCounter();
allBtn.addEventListener("click", function () {

    let tasks = taskList.getElementsByTagName("li");

    for (let task of tasks) {
        task.style.display = "flex";
    }

});

completedBtn.addEventListener("click", function () {

    let tasks = taskList.getElementsByTagName("li");

    for (let task of tasks) {

        let check = task.querySelector(".checkTask");

        if (check.checked) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }

    }

});

pendingBtn.addEventListener("click", function () {

    let tasks = taskList.getElementsByTagName("li");

    for (let task of tasks) {

        let check = task.querySelector(".checkTask");

        if (!check.checked) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }

    }

});
updateCounter();

let savedTasks = JSON.parse(localStorage.getItem("tasks"));

if (savedTasks) {

    tasks = savedTasks;

    tasks.forEach(function(task) {

        addTask(task);

    });

}
clearBtn.addEventListener("click", function () {

    if (confirm("Are you sure you want to delete all tasks?")) {

        taskList.innerHTML = "";
        tasks = [];
        localStorage.removeItem("tasks");
        updateCounter();
        checkEmpty();

    }

});

checkEmpty();