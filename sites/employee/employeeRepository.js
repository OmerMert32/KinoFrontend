export function getEmployees() {
    return fetch("http://localhost:8080/api/v1/employees").then(response => response.json())
}

export function getTaskNames() {
    return fetch("http://localhost:8080/api/v1/tasknames/taskname").then(response => response.json())
}

export function getCurrentWorkDays() {
    return fetch("http://localhost:8080/api/v1/workdays").then(response => response.json())
}