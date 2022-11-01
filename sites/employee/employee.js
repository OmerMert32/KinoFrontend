import { makeNewUpdate } from "./editEmployee.js";
import { getCurrentWorkDays, getEmployees, getTaskNames } from "./employeeRepository.js";

export function initTimetable() {
    
    renderTimetable();
    getEditTaskData();
    setupClickEventHandlers();
}

export async function renderTimetable() {
    var timetable = new Timetable();
    timetable.setScope(8,0);
    let workDays = await getCurrentWorkDays();
    console.log(workDays);
    workDays.map(workDay => {
        timetable.addLocations([{"id": workDay.employee.id, "name": workDay.employee.firstName + " " + workDay.employee.lastName}]);
        workDay.workTasks.map(task => {
            timetable.addEvent(task.description, workDay.employee.id, getTaskDateTime(workDay.workDate, task.startTime), getTaskDateTime(workDay.workDate, task.endTime), {class: task.name.taskName, onClick: function(event) {
                    showEditTask(workDay, task);
                }})
        });
    })

    var renderer = new Timetable.Renderer(timetable);
    renderer.draw('.timetable');
    addDescription();
}

function getTaskDateTime(workDate, taskTime) {
    let date = new Date(workDate + " 00:00:00");

    let dateParts = taskTime.split(':');

    date.setTime(date.getTime() + dateParts[0] * 60 * 60 * 1000);
    date.setTime(date.getTime() + dateParts[1] * 60 * 1000);
    date.setTime(date.getTime() + dateParts[2] * 1000);

    return date;
}

function addDescription(){
    var allSpans = document.getElementsByTagName('span');
    for (var i = 0; i < allSpans.length; i++) {
       if(allSpans[i].className.includes('time-entry')){
           let event = document.getElementsByClassName(allSpans[i].className)[0];
           let text = document.createElement('strong');
           text.innerHTML=(allSpans[i].className.replaceAll('time-entry ',''));
           event.insertBefore(text,event.children[0]);
       }
    }
}

async function getEditTaskData() {
    let employees = await getEmployees()
    let tasks = await getTaskNames();

    // Remove all children
    document.getElementById("employee").replaceChildren();
    document.getElementById("worktask").replaceChildren();

    employees.map(employee => {
        let employeeOption = document.createElement("option");
        employeeOption.innerHTML = employee.firstName + " " + employee.lastName;
        employeeOption.setAttribute("value", employee.firstName + " " + employee.lastName);
        
        document.getElementById("employee").appendChild(employeeOption);
    });

    tasks.map(task => {
        let taskOption = document.createElement("option");
        taskOption.innerHTML = task.taskName;
        taskOption.setAttribute("value", task.taskName);
        
        document.getElementById("worktask").appendChild(taskOption);
    });
}

function setupClickEventHandlers() {

    document.getElementById("update-btn").onclick = function() {
        makeNewUpdate();
    }

    document.getElementById("edit-banner").onclick = function() {
        hideEditTask();
    }
}

function showEditTask(workDay, task) {
    document.getElementById("extra-content").style = "display:block";

    document.getElementById("taskid").value = task.id;
    document.getElementById("bdate").value = workDay.workDate;
    document.getElementById("employee").value = workDay.employee.firstName + " " + workDay.employee.lastName;
    document.getElementById("starttime").value = task.startTime;
    document.getElementById("endtime").value = task.endTime;
    document.getElementById("worktask").value = task.name.taskName;
    document.getElementById("taskdescription").value = task.description;

}

function hideEditTask() {
    document.getElementById("extra-content").style = "display:none";
}

