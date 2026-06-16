let isDebugEnabled = false;

fetch('http://localhost:8080/api/config/debug-status')
    .then(response => response.json())
    .then(data => {
        isDebugEnabled = data.debugEnabled;
        log("System", `Frontend debug sync completed. Logging state: ${isDebugEnabled}`);
    })
    .catch(err => console.error("Failed to load global debug configuration:", err));

function log(message, data = "") {
    if (isDebugEnabled) {
        console.log(message, data);
    }
}