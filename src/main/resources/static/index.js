// Elemente aus dem HTML anhand ihrer ID heraussuchen
//für login
const authBt = document.getElementById('authBt');
const loginDialog = document.getElementById('loginDialog');
const cancelLogin = document.getElementById('cancelLogin');
const loginForm = document.getElementById('loginForm');

//für register
const registerBt = document.getElementById('registerBt');
const registerDialog = document.getElementById('registerDialog');
const cancelRegister = document.getElementById('cancelRegister');
const registerForm = document.getElementById('registerForm');

// Wenn der  Button geklickt wird -> Dialog als Modal (Pop-up) öffnen
//Log in!
authBt.addEventListener('click', () => {
    loginDialog.showModal();
});

registerBt.addEventListener('click', () => {
    registerDialog.showModal();
});

// Wenn der "Cancel" Button geklickt wird -> Dialog wieder schließen
//login
cancelLogin.addEventListener('click', () => {
    loginDialog.close();
});

//register
cancelRegister.addEventListener('click', () => {
    log("Register canceled");
    registerDialog.close();
});

// Das Formular abfangen
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das normale Neuladen der Seite

    // 1. Die Eingabewerte aus dem HTML-Formular holen
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    //searchParams erstellen für Springboot
    const params = new URLSearchParams();
    params.append('username', usernameInput);
    params.append('password', passwordInput);


    // Login-Anfrage an die API senden
    fetch('/api/login', {
        method: 'POST',
        body: params
    })
    .then(response => {
        if (response.ok) {
            // Weiterleitung --> Wenn der Login erfolgreich war, schicken wir den User zur main-page.html
            window.location.href = '/main-page.html';
        } else {
            alert('Login fehlgeschlagen!');
        }
    })
    .catch(error => console.error('Login failed:', error));
});

registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das normale Neuladen der Seite

    // 1. Die Eingabewerte aus dem HTML-Formular holen
    const regNameInput = document.getElementById('regName').value;
    const regEmailInput = document.getElementById('regEmail').value;
    const regPasswordInput = document.getElementById('regPassword').value;

    const formData = new FormData(this);
    const formObject = Object.fromEntries(formData.entries());

    //Register anfrage an die Api schicken
    fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  //sagt dem BE, dass json kommt
        },
        body: JSON.stringify(formObject) //wandelt objekt um in JSON String
    })
    .then(response =>{
        if(response.ok) {
        alert("You're registered successfully! Now you can log in!");
        registerDialog.close(); //schließt loginDialog
        this.reset(); //leert die formularfelder
        loginDialog.showModal(); //öffnet gleich den login Dialog, angenehmer für user
        } else {
            alert("Failed to sign up! Maybe already existing email!");
        }
    })
    .catch(error => console.error('Sign up failed:', error));
})