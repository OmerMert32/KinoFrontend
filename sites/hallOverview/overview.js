
let shownDate = new Date();

export async function initTimetableHalls() {
    renderTimetable();
    setupClickEvents()
}


async function getAllHalls() {
    return await fetch("http://localhost:8080/api/v1/halls").then(r => r.json());
}

async function getMoviesByDate(date) {
    let URL = "http://localhost:8080/api/v1/movies/" + dateFormat(date);
    return await fetch(URL).then(r => r.json());
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

function dateFormat(date){
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // month er 0 indexed 
    const year = date.getFullYear();

    return year + "-" + month + "-" + day;
}

function setupClickEvents(){

    document.getElementById("next-day").onclick = function (){
        shownDate.setDate(shownDate.getDate() + 1);
        renderTimetable()
    }

    document.getElementById("previous-day").onclick = function () {
        shownDate.setDate(shownDate.getDate() - 1);
        renderTimetable();
    }

}

async function renderTimetable(){
    let timetable = new Timetable();
    timetable.setScope(8,0);
    let halls = await getAllHalls();
    let movies = await getMoviesByDate(shownDate);

    halls.map(hall => {
        timetable.addLocations([{"id": hall.hallNumber, "name": "Sal " + hall.hallNumber}]);
    })
/*
    movies.map(movie => {
        timetable.addEvent(" ", movie.hall.hallNumber, new Date(movie.advertisementStartTime), new Date(movie.movieStartTime), {class: "Re\nk\nla\nme"})
    });
*/
    movies.map(movie => {
        timetable.addEvent(movie.description, movie.hall.hallNumber, new Date(movie.advertisementStartTime), new Date(movie.movieEndTime), {class: movie.name})
    });
/*
    movies.map(movie => {
        timetable.addEvent(" ", movie.hall.hallNumber, new Date(movie.movieEndTime), new Date(movie.cleaning), {class: "Ren\ngø\nri\ning"})
    });
*/

    var renderer = new Timetable.Renderer(timetable);
    renderer.draw('.timetable');
    addDescription();
}