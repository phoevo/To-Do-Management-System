    //Function for stringifying array to be stored as a JSON string.
    function saveTasks(TaskList){
        localStorage.setItem("savedTasks", JSON.stringify(TaskList));
    }
    //Function for parsing JSON strings back into the array.
    //Otherwise returns empty array.
    function loadTasks(){
        return JSON.parse(localStorage.getItem("savedTasks")) || [];
    }

export {saveTasks, loadTasks}//exports functions to be called in tasks.js