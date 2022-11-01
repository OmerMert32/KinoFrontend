

export function addNewTask (){


  const newTask = {}
  newTask.taskName = document.getElementById("input-taskName")

    const options = {}
    options.method = "POST"
    options.headers = { "Content-type": "application/json" }
    options.body = JSON.stringify(newTask)


}
