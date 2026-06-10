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