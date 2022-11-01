import { renderTimetable } from "./employee.js";

export function makeNewUpdate() {

    let taskId = document.getElementById("taskid").value;

    let url = "";
    if (taskId != "") {
        url = "http://localhost:8080/api/v1/workdays/tasks/" + taskId;
    }
    else {
        url = "http://localhost:8080/api/v1/workdays/tasks"
    }

    let requestObject = {
        workDayRequest: {
            workDate: document.getElementById("bdate").value,
            employeeFullName:document.getElementById("employee").value
        },
        startTime: document.getElementById("starttime").value,
        endTime: document.getElementById("endtime").value,
        description: document.getElementById("taskdescription").value,
        taskName: document.getElementById("worktask").value
    };

    const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(requestObject),
        headers: {"Content-type": "application/json"}
    });

    fetch(request).then((response) => {
        if (response.status == 200) {
            document.getElementById("extra-content").style = "display:none";
            renderTimetable();
        }
        else {
            window.alert("An error occurred!, check the log for more info");
        }
    });
}