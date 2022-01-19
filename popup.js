document.addEventListener('DOMContentLoaded', function () {
    let b = ""
    document.getElementById('button').addEventListener('click', function () {
        chrome.runtime.sendMessage({ message: "hi" }, (response) => {
            console.log(response.message);
        });
    });

    if (localStorage.getItem('en') == 'true') {
        document.getElementById('check').innerHTML = "Auto Update Counts: Enabled"
        document.getElementById('auto').innerHTML = "Disable"
        idkName()
        b = setInterval(idkName, 30000)
    } else {
        document.getElementById('check').innerHTML = "Auto Update Counts: Disabled"
        document.getElementById('auto').innerHTML = "Enable"
        clearInterval(b)
    }

    document.getElementById('auto').addEventListener('click', function () {
        if (localStorage.getItem('en') == 'true') {
            localStorage.setItem('en', 'false')
            document.getElementById('check').innerHTML = "Auto Update Counts: Disabled"
            document.getElementById('auto').innerHTML = "Enable"
            clearInterval(b)
        } else {
            localStorage.setItem('en', 'true')
            document.getElementById('check').innerHTML = "Auto Update Counts: Enabled"
            document.getElementById('auto').innerHTML = "Disable"
            idkName()
            b = setInterval(idkName, 30000)
        }
    });
});

function idkName() {
    chrome.runtime.sendMessage({ message: "start" }, (response) => {
        console.log(response.message);
    });
}