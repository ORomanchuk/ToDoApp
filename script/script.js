let topPanel = document.querySelector(".topPanel");
let time = document.querySelector(".time");
let signalImg = document.querySelector(".signalImg");
let wifilImg = document.querySelector(".wifilImg");
let batImg = document.querySelector(".batImg");
let appToDo = document.querySelector(".appToDo");
let uploadScreen = document.querySelector(".uploadScreen");
let screen = document.querySelector(".screen");
let toDoScreen = document.querySelector(".toDoScreen");
let taskNameInput = document.querySelector(".taskNameInput");
let addTaskButton = document.querySelector(".createBtn");
let pendingBtn = document.querySelector(".pendingBtn");
let allTasksBtn = document.querySelector(".allTasksBtn");
let completedBtn = document.querySelector(".completedBtn");
let ClearBtn = document.querySelector(".ClearBtn");
let startMessage = document.querySelector(".startMessage");
let taskList = document.querySelector(".listOfTasks");
let footer = document.querySelector(".footer");

let tasks = [];

addTaskButton.addEventListener("click", addTaskHandler);
pendingBtn.addEventListener("click", showPendingHandler);
allTasksBtn.addEventListener("click", showAllHandler);
completedBtn.addEventListener("click", showComplatedHandler);
ClearBtn.addEventListener("click", delateAllHandler);
appToDo.addEventListener("click", openApp);
footer.addEventListener("click", сloseApp);
taskNameInput.addEventListener("keydown", function (e) {
    if (e.code == "Enter") addTaskHandler();
})

// OPEN AND CLOSE THE APPLICATION
// OPEN AND CLOSE THE APPLICATION
// OPEN AND CLOSE THE APPLICATION

function openApp() {
    setTimeout(function () {
        uploadScreen.style.zIndex = "100";
        toDoScreen.style.zIndex = "200";
        screen.style.zIndex = "50";
        topPanel.style.backgroundColor = "#fff"
    }, 2000);
    toDoScreen.style.zIndex = "20";
    uploadScreen.style.zIndex = "200";
    screen.style.zIndex = "5";
    time.style.color = "#000";
    topPanel.style.backgroundColor = "#abcea1"
    signalImg.src = "./img/signal-black.png";
    wifilImg.src = "./img/wifi-black.png";
    batImg.src = "./img/battery-black.png";
}

function сloseApp() {
    uploadScreen.style.zIndex = "100";
    toDoScreen.style.zIndex = "150";
    screen.style.zIndex = "200";
    topPanel.style.backgroundColor = "transparent"
    signalImg.src = "./img/signal.png";
    wifilImg.src = "./img/wifi.png";
    batImg.src = "./img/battery.png";
    time.style.color = "#fff";
}

// CREATING THE TASK
// CREATING THE TASK
// CREATING THE TASK

function addTaskHandler() {
    if (taskNameInput.value) {
        if (!startMessage.hidden) startMessage.hidden = true;

        let newTask = new Task(taskNameInput.value);

        newTask.createIn(taskList);
        tasks.push(newTask);
        taskNameInput.value = "";
    } else {
        alert("введите имя задачи");
    }
}

class Task {
    constructor(text) {
        this.text = text;
        this.isDone = false;
        this.isDelated = false;
        this.div = null;
    }

    createIn(element) {
        this.div = document.createElement("div");
        this.div.classList.add("task");

        let input = document.createElement("input");
        input.addEventListener("click", () => this.changeState(this.div));
        input.type = "checkbox";

        let p = document.createElement("p");
        p.innerText = this.text;
        let textmemory = this.text;
        let newText;
        console.log(textmemory);

        let date = document.createElement("div");
        date.classList.add("date");
        let moment = new Date();
        date.innerHTML = moment.toLocaleDateString();

        let cardSet = document.createElement("div");
        cardSet.classList.add("cardSet");

        let cardEdit = document.createElement("div");
        cardEdit.classList.add("cardEdit");
        cardSet.append(cardEdit);

        let cardBin = document.createElement("div");
        cardBin.classList.add("cardBin");
        cardSet.append(cardBin);

        cardBin.addEventListener("click", () => this.delateState(this.div));

        this.div.append(input);
        this.div.append(p);
        this.div.append(date);
        this.div.append(cardSet);
        taskList.append(this.div);

        cardEdit.addEventListener("click", function () {
            p.remove();
            let editInput = document.createElement("input");
            editInput.classList = "editInput";
            editInput.type = "text";
            console.log(textmemory);
            editInput.placeholder = textmemory;
            input.after(editInput);
            editInput.addEventListener("keydown", function (e) {
                if (e.code == "Enter") chahgeText();
            })
            function chahgeText() {
                newText = editInput.value;
                editInput.remove();
                p.innerText = newText;
                textmemory = newText;
                input.after(p);
            }
        });
    }

    changeState(element) {
        this.isDone = !this.isDone;
        element.classList.toggle("completed");
        console.log(this.isDone);
    }

    delateState(element) {
        this.isDelated = !this.isDelated;
        element.classList.toggle("delated");
        console.log(this.isDelated);
        element.remove();
    }
}

// SET SYSTEM TIME
// SET SYSTEM TIME
// SET SYSTEM TIME

function getCurrentTimeString(dots) {
    var timeString = new Date().toTimeString().replace(/:[0-9]{2,2} .*/, '');
    return dots ? timeString : timeString.replace();
}

setInterval(
    function () {
        time.innerHTML = getCurrentTimeString(Math.round(Date.now() / 1000) % 2);
    }
);

// NAVIGATION HANDLERS
// NAVIGATION HANDLERS
// NAVIGATION HANDLERS

function showPendingHandler() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    tasks.forEach(task => {
        if (task.isDone == false && task.isDelated == false) {
            taskList.append(task.div);
        }
    });
}

function showAllHandler() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    tasks.forEach(task => {
        if (task.isDelated == false && task.isDelated == false) {
            taskList.appendChild(task.div);
        }
    });
}

function showComplatedHandler() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    tasks.forEach(task => {
        if (task.isDone == true && task.isDelated == false) {
            taskList.append(task.div);
        }
    });
}

function delateAllHandler() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    tasks = [];
}