function parseCookies() {
    return document.cookie.split(';').reduce((cookies, cookie) => {
        const [name, value] = cookie.trim().split('=');
        cookies[name] = value;
        return cookies;
    }, {});
}

const currentUserID = parseCookies()['user_id'];

if (currentUserID) {
    fetch('/getTasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            currentUserID: currentUserID,
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP 오류! 상태: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.userTasks.forEach(task => {
                addTaskFromServer(task);
            });

        })
        .catch(error => {
            console.error('에러:', error);
        });
}

function addTaskFromServer(task) {
    var taskList = document.getElementById("taskList");

    var taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    var taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = task.body;

    var deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "DELETE";
    deleteButton.onclick = function () {
        fetch('/deleteTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentUserID: currentUserID,
                taskInput: task.body,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP 오류! 상태: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                taskList.removeChild(taskItem);
            })
            .catch(error => {
                console.error('에러:', error);
            });
    };

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    checkbox.addEventListener('change', function () {
        const isChecked = checkbox.checked;

        fetch('/updateCheckbox', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentUserID: currentUserID,
                taskInput: task.body,
                isChecked: isChecked,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP 오류! 상태: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('에러:', error);
            });
    });
}

if (currentUserID) {
    document.getElementById("welcome-message").innerHTML = currentUserID + "'s To Do List";
} else {
    document.getElementById("welcome-message").innerHTML = "ㅋㅋㅋ";
}

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        var taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        var taskText = document.createElement("span");
        taskText.classList.add("task-text");
        taskText.textContent = taskInput.value;

        var deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "DELETE";

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);

        taskInput.value = "";

        fetch('/todolist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentUserID: currentUserID,
                taskInput: taskText.textContent,
                checkbox: false
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP 오류! 상태: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('에러:', error);
            });

        checkbox.addEventListener('change', function () {
            const isChecked = checkbox.checked;

            fetch('/updateCheckbox', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentUserID: currentUserID,
                    taskInput: taskText.textContent,
                    isChecked: isChecked
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP 오류! 상태: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('에러:', error);
                });
        });
    }
    deleteButton.addEventListener('click', function (event) {
        const target = event.target;
        fetch('/deleteTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentUserID: currentUserID,
                taskInput: taskText.textContent
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP 오류! 상태: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                taskList.removeChild(target.parentNode);
            })
            .catch(error => {
                console.error('에러:', error);
            });
    });
}

const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', function () {
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP 오류! 상태: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            document.cookie.split(";").forEach(function (c) {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/;SameSite=None;Secure");
            });
            window.location.href = '/login';
        })
        .catch(error => {
            console.error('에러:', error);
        });
});

const mybutton = document.getElementById('my-button');

mybutton.addEventListener('click', function (){
    window.location.href = '/account';
})