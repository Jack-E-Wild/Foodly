// Elemente aus dem HTML anhand ihrer ID heraussuchen
const authBt = document.getElementById('authBt');
const loginDialog = document.getElementById('loginDialog');
const cancelLogin = document.getElementById('cancelLogin');

// Wenn der "Log in!" Button geklickt wird -> Dialog als Modal (Pop-up) öffnen
authBt.addEventListener('click', () => {
    loginDialog.showModal();
});

// Wenn der "Cancel" Button geklickt wird -> Dialog wieder schließen
cancelLogin.addEventListener('click', () => {
    loginDialog.close();
});

// Das Formular abfangen
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das normale Neuladen der Seite

    const formData = new FormData(this);

    // Login-Anfrage an die API senden
    fetch('/api/login', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // HIER PASSIERT DIE WEITERLEITUNG:
            // Wenn der Login erfolgreich war, schicken wir den User zur main-page.html
            window.location.href = '/main-page.html';
        } else {
            alert('Login fehlgeschlagen!');
        }
    })
    .catch(error => console.error('Fehler:', error));
});