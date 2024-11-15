let taskDisplay = document.querySelector("#taskDisplay");

const tasks = () => {

    const TaskList = []; //empty array of tasks.

    function Task (title, description, priority, deadline) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.deadline = deadline;
    }


    function addToTaskList(){
        let title = document.querySelector("#title").value;
        let description = document.querySelector("#description").value;
        let priority = document.querySelector("#priority").value;
        let deadline = document.querySelector("#deadline").value;
        let newTask = new Task(title, description, priority, deadline);
        TaskList.push(newTask);
        console.log(TaskList);
        displayTask();
        

    }

    let addTaskBtn = document.querySelector("#addTaskBtn"); 
    addTaskBtn.addEventListener("click", function(){
        event.preventDefault()
        console.log("works");
        addToTaskList();
    })

   
      
    function displayTask() {
        taskDisplay.innerHTML = "";
        for (let i = 0; i <TaskList.length; i++){
            let task = TaskList[i];
            taskDisplay.innerHTML = 
            `<div class="taskCard">
                <h2 class="title">Title: ${task.title}</h2>
                <h3 class="description"> Description: ${task.description} </h3>
                <p> Priority: ${task.priority}</p>
                <p class="deadline">Deadline: ${task.read}</p>
                <button class="removeBtn" onclick="removeTask(${i})">Remove</button>
            </div>`;

        }
    }

    function removeTask(index){
        TaskList.splice(index, 1);
        displayTask();
    }

}

export default tasks