import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import {
    setActiveLink, adjustForMissingHash, renderTemplate, loadHtml, setTopbarHeader
} from "./utils.js"

import {initTaskName} from "./sites/taskName/taskName.js"
import { initTimetable } from "./sites/employee/employee.js";
import {initEmployeeSchedule} from "./sites/homePage/homePage.js";
import {initTimetableHalls} from "./sites/hallOverview/overview.js";

window.addEventListener("load", async () => {
    const templateHomePage = await loadHtml("./sites/homePage/homePage.html")
    const templateTaskName = await loadHtml("./sites/taskName/taskName.html")
    const templateEmployee = await loadHtml("./sites/employee/employee.html")
    const templateSchedule = await loadHtml("./sites/schedule/schedule.html")
    const templateOverview = await loadHtml("./sites/hallOverview/overview.html")
    const templateTicketAdministration = await loadHtml("./sites/ticketAdministration/ticket.html")
    const templateSales = await loadHtml("./sites/sales/sales.html")
    const templateAddTaskName = await loadHtml("./sites/taskName/addTaskName.html")

    adjustForMissingHash()

    const router = new Navigo("/", { hash: true });
    //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
    window.router = router

    router.hooks({
            before(done, match) {
                setActiveLink("menu", match.url)
                done()
            }
        })
        .on({
            //For very simple "templates", you can just insert your HTML directly like below
            "/": (match) => {
                renderTemplate(templateHomePage, "content")
                initEmployeeSchedule()
                setTopbarHeader('Forside')

            }
            ,
            "/tasks": (match) => {
                renderTemplate(templateTaskName, "content")
                initTaskName()
                setTopbarHeader('Arbejdsopgaver')


            },
            "/employee": (match) => {
                renderTemplate(templateEmployee, "content")
                initTimetable()
                setTopbarHeader('Medarbejdere')
            },
            "/schedule": (match) => {
                renderTemplate(templateSchedule, "content")
                setTopbarHeader('Vagtplan')
            },
            "/overview": (match) => {
                renderTemplate(templateOverview, "content")
                initTimetableHalls()
                setTopbarHeader('Spillesal Oversigt')
            },
            "/ticket": (match) => {
                renderTemplate(templateTicketAdministration, "content")
                setTopbarHeader('Billet Administration')
            },
            "/sales": (match) => {
                renderTemplate(templateSales, "content")
                setTopbarHeader('Salgsvarer')
            },
            "/addTaskName": (match) => {
                renderTemplate(templateAddTaskName, "content")
            }
        })
        .notFound(() => {
            renderTemplate(templateNotFound, "content")
        })
        .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
        + ' Column: ' + column + ' StackTrace: ' + errorObj);
}