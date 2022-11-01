export async function initEmployeeSchedule () {
    document.getElementById("box-content").innerHTML = ""
    var workdays = await getWorkdays();

    console.log(workdays)
    workdays.map(workday => {
     let content = document.createElement("p");
     content.style.fontSize = '20px'
        content.style.marginBottom = '2vh'
    content.innerText =
     "[ "
     + workday.employee.role
    + " ] "
    + workday.employee.firstName
    + " -  "
    + workday.workTasks[0].startTime
    + " - "
    + workday.workTasks[0].endTime
            document.getElementById("box-content").appendChild(content)
    }
    )
    setupClickEvents();
}

function setupClickEvents () {
    document.getElementById("movie-header").onclick=function (){
        window.open("https://www.imdb.com/title/tt0241527/?ref_=nv_sr_srsg_1")
    }

    document.getElementById("show-more").onclick = showInformation;


    function showInformation () {

        document.getElementById("movie-further-information").style.cssText = `
        display: block;
        `
        
        document.getElementById("show-more").style.display = "none";

    }

 

}





async function getWorkdays () {
    return await fetch("http://localhost:8080/api/v1/workdays").then(r => r.json());
}