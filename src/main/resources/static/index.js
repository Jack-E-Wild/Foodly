// Elemente aus dem HTML anhand ihrer ID heraussuchen
const authBt = document.getElementById('authBt');
const loginDialog = document.getElementById('loginDialog');
const cancelLogin = document.getElementById('cancelLogin');

// Wenn der "Log in!" Button geklickt wird -> Dialog als Modal (Pop-up) öffnen
authBt.addEventListener('click', () => {
    console.log("Login clicked");
    loginDialog.showModal();
});

// Wenn der "Cancel" Button geklickt wird -> Dialog wieder schließen
cancelLogin.addEventListener('click', () => {
    console.log("Login canceled");
    loginDialog.close();
});

// Das Formular abfangen
document.getElementById('loginForm').addEventListener('submit', function(event) {
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
    .catch(error => console.error('Fehler:', error));
});