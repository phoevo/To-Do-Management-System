//Import functions to load data from storage.
import {saveTasks, loadTasks} from "./storage"

let taskDisplay = document.querySelector("#taskDisplay");

const tasks = () => {

    //Initialize emppty Task list or load from storage if available.
    const TaskList = [];
    const loadedTasks = loadTasks();

    //For each loaded task
    loadedTasks.forEach(task => {
        //convert deadline string into Date object.
        task.deadline = new Date(task.deadline);
        TaskList.push(task);
        });

    //Constructor for creating task object.   
    function Task (title, description, priority, deadline) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.deadline = new Date(deadline);
    }

    //Function for retrieving values from the form and creating new Task
    function addToTaskList(){
        let title = document.querySelector("#title").value;
        let description = document.querySelector("#description").value;
        let priority = document.querySelector("#priority").value;
        let deadline = document.querySelector("#deadline").value;
        let newTask = new Task(title, description, priority, deadline);
        TaskList.push(newTask);//pushing new task to TaskList array.
        console.log(TaskList);
        saveTasks(TaskList);
        displayTask();//Renders saved tasks onto screen.
        

    }
    //Button for handling task submission.
    let addTaskBtn = document.querySelector("form"); 
    addTaskBtn.addEventListener("submit", function(){
        event.preventDefault()//Prevents default behaviour of submit button which reloads the page.
        console.log("works");
        addToTaskList();
    })

   
    //Function for displaying tasks onto page.  
    function displayTask() {
        taskDisplay.innerHTML = "";

        //sorts priority and dates.
        TaskList.sort ((a, b) => a.priority - b.priority);
        TaskList.sort ((a, b) => a.deadline - b.deadline);

        //small message displayed when there are no tasks onscreen.
        if(TaskList.length === 0){
            const noTasksMessage = document.createElement('p');
            noTasksMessage.setAttribute('id', 'noTasksMessage');
            noTasksMessage.textContent = "No tasks";
            taskDisplay.appendChild(noTasksMessage);
        }

        //Loops that goes through TaskList array and creates HTML for each 
        //task
        for (let i = 0; i <TaskList.length; i++){
            let task = TaskList[i];
            let taskView = document.createElement("div");
            taskView.setAttribute("class", "taskCard");
            taskView.innerHTML = 

            `
            <div class="taskItem">
                <label for="cardTitle">Title</label>
                <span id="cardTitle">${task.title}</span> 
            </div>

            <div class="taskItem">
                <label for="cardDescription">Description</label>
                <span id="cardDescription">${task.description} </span>
            </div>

            <div class="taskItem">
                <label for ="cardPriority">Priority</label>
                <span id="cardPriority">${task.priority}</span>
            </div>

            <div class="taskItem">
                <label for="cardDeadline">Deadline</label>
                <span id="cardDeadline">${task.deadline.toLocaleDateString()}</span>
            </div>

            `;

            //Button for changing the status of the task(Pending or Completed)
            let statusBtn = document.createElement("button");
            statusBtn.innerHTML = "Pending";
            statusBtn.classList.add("statusBtn");
            statusBtn.style.backgroundColor = "orange";
            statusBtn.addEventListener("click", function(){
                statusBtn.innerHTML = "Completed";
                statusBtn.style.backgroundColor = "lightgreen";
            })
            taskView.appendChild(statusBtn);
            taskDisplay.appendChild(taskView);

            //Button for removing task from the array.
            let removeBtn = document.createElement("button");
            removeBtn.innerHTML = "Remove";
            removeBtn.style.backgroundColor = "crimson";
            removeBtn.classList.add("removeBtn");
            removeBtn.addEventListener("click", function(){
                removeTask(i);//remove function called here.
            })
            taskView.appendChild(removeBtn);
            taskDisplay.appendChild(taskView);


        }
    }
    //Logic for removing a task from the TaskList array
    function removeTask(index){
        TaskList.splice(index, 1);
        saveTasks(TaskList);//Saved tasks to localStorage.
        displayTask();//Re-renders tasks again to display changes.
    }

   

    displayTask();//Renders tasks 

}

export default tasks//exports "tasks" function to be imported to Load.js.