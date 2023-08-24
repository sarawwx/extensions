document.addEventListener("DOMContentLoaded", function () {
  var taskList = document.getElementById("taskList");
  var taskInput = document.getElementById("taskInput");
  var addButton = document.getElementById("addButton");
  var clearButton = document.getElementById("clearButton");

  loadTasks();

  addButton.addEventListener("click", function () {
    var taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      taskInput.value = "";
    }
  });

  clearButton.addEventListener("click", function () {
    clearTasks();
  });

  taskInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      addButton.click();
    }
  });

  taskList.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      if (event.target.classList.contains("complete-button")) {
        toggleTaskCompletion(event.target.parentElement);
      } else if (event.target.classList.contains("delete-button")) {
        deleteTask(event.target.parentElement);
      }
    }
  });

  function addTask(text) {
    var taskItem = document.createElement("li");
    var taskText = document.createElement("span");
    var completeButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    completeButton.textContent = "feito";
    deleteButton.textContent = "X";
    completeButton.classList.add("complete-button");
    deleteButton.classList.add("delete-button");
    taskText.textContent = text;

    taskItem.appendChild(taskText);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
    saveTasks();
  }

  function toggleTaskCompletion(taskItem) {
    taskItem.classList.toggle("completed");
    reorderTasks(); // Chamada para reordenar as tarefas
    saveTasks();
  }

  function deleteTask(taskItem) {
    taskList.removeChild(taskItem);
    saveTasks();
  }

  function clearTasks() {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    saveTasks();
  }

  function saveTasks() {
    var tasks = Array.from(taskList.getElementsByTagName("li")).map((task) => {
      return {
        text: task.querySelector("span").textContent,
        completed: task.classList.contains("completed"),
      };
    });
    chrome.storage.sync.set({ tasks: tasks });
  }

  function loadTasks() {
    chrome.storage.sync.get(["tasks"], function (result) {
      if (result.tasks) {
        result.tasks.forEach(function (task) {
          addTask(task.text);
          if (task.completed) {
            var lastTask = taskList.lastChild;
            toggleTaskCompletion(lastTask);
          }
        });
        reorderTasks(); // Chamada para reordenar as tarefas no início
      }
    });
  }

  function reorderTasks() {
    var completedTasks = [];
    var incompleteTasks = [];

    Array.from(taskList.getElementsByTagName("li")).forEach(function (task) {
      if (task.classList.contains("completed")) {
        completedTasks.push(task);
      } else {
        incompleteTasks.push(task);
      }
    });

    taskList.innerHTML = "";

    incompleteTasks.forEach(function (task) {
      taskList.appendChild(task);
    });

    completedTasks.forEach(function (task) {
      taskList.appendChild(task);
    });
  }
});
