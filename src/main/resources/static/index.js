const guestView = document.getElementById('guestView');
const userView = document.getElementById('userView');
const userAvatar = document.getElementById('userAvatar');
const welcomeGreeting = document.getElementById('welcomeGreeting');

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

//für dish
const cookingBoardBt = document.getElementById('cookingBoardBt');
const dishNameDialog = document.getElementById('dishNameDialog');
const dishNameInput = document.getElementById('dishNameInput');
const dishNameCancelBt = document.getElementById('dishNameCancelBt');
const dishNameConfirmBt = document.getElementById('dishNameConfirmBt');


//logout
const logoutBt = document.getElementById('logoutBt');
const inspirationCard = document.getElementById('inspirationCard');

document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
});

function checkAuthStatus() {
    fetch('/api/users/auth/status', { method: 'GET' })
    .then(response => {
        if (!response.ok) throw new Error('Not logged in');
        return response.json();
    })
    .then(data => {
        welcomeGreeting.innerText = `Welcome, ${data.username}!`
        // Erfolgreich eingeloggt!
        loadUserAvatar()
        showUserDashboard();
    })
    .catch(() => {
        // Nicht eingeloggt -> Zeige Gast-Ansicht
        showGuestView();
    });
}


// UI umschalten für Gäste
function showGuestView() {
    guestView.style.display = 'block';
    userView.style.display = 'none';
    userAvatar.style.display = 'none';
}

// UI umschalten für eingeloggte User
function showUserDashboard() {
    guestView.style.display = 'none';
    userView.style.display = 'block';


    // Inspiration aus TheMealDB über euer Backend laden
    fetchInspirationDish();
}

//TheMealDB mit Backend holen
function fetchInspirationDish() {
    // INFO: Passt den Pfad an euren tatsächlichen Backend-Endpunkt an!
    fetch('/api/random-recipe', { method: 'GET' })
    .then(response => {
        if (!response.ok) throw new Error('Could not load inspiration');
        return response.json();
    })
    .then(meal => {
        inspirationCard.innerHTML = `
            <div class="meal-inspiration">
                <img src="${meal.recipeThumbnail}" alt="${meal.recipeName}" class="inspiration-img">
                <h4>${meal.recipeName}</h4>
                <a href="${meal.recipeLink}" target="_blank" rel="noopener">View Full Recipe ➔</a>
            </div>
        `;
    })
    .catch(error => {
        console.error('Inspiration Error:', error);
        inspirationCard.innerHTML = '<p>Could not load inspiration right now.</p>';
    });
}

function loadUserAvatar() {
    fetch('/api/users/avatar', { method: 'GET' })
    .then(response => {
        if (!response.ok) throw new Error('Failed to load avatar');
        return response.json();
    })
    .then(data => {
        if (data && data.avatar && userAvatar) {
            userAvatar.src = data.avatar;
            userAvatar.style.display = "block"; // Sichtbar machen, wenn erfolgreich
        }
    })
    .catch(error => {
        console.error("Couldn't load Gravatars:", error);
    });
}

// Wenn der  Button geklickt wird -> Dialog als Modal (Pop-up) öffnen
//Log in!
authBt.addEventListener('click', () => {loginDialog.showModal();});
// Wenn der "Cancel" Button geklickt wird -> Dialog wieder schließen
//login
cancelLogin.addEventListener('click', () => {
    loginDialog.close();
});


registerBt.addEventListener('click', () => {registerDialog.showModal();});
//register
cancelRegister.addEventListener('click', () => {
    if (typeof log === 'function') log("Register canceled"); // Sicherer Aufruf der logger.js Funktion
        else console.log("Register canceled");
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
            //window.location.href = '/main-page.html';
            loginDialog.close();
            checkAuthStatus();
        } else {
            alert('Login fehlgeschlagen!');
        }
    })
    .catch(error => console.error('Login failed:', error));
});

registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das normale Neuladen der Seite

    //Die Eingabewerte aus dem HTML-Formular holen    anmerk:werden die noch verwendet?
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

// "Let's start cooking!" - Modal öffnen
cookingBoardBt.addEventListener('click', () => {
    dishNameInput.value = "";
    dishNameDialog.showModal();
});
dishNameCancelBt.addEventListener('click', () => dishNameDialog.close());

// Dish im Backend erstellen und mit ID weiterleiten!
dishNameConfirmBt.addEventListener('click', () => {
    const name = dishNameInput.value.trim();
    if (!name) {
        alert("Please enter a name!");
        return;
    }
    fetch('/api/dish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name })
        })
        .then(response => {
            if (!response.ok) throw new Error("Dish could not be created!");
            return response.json();
        })
        .then(dish => {
            dishNameDialog.close();
            // weiterleitung an maincooking.html mit URL-Parameter, zum weitergeben von id
            window.location.href = `/maincooking.html?dishId=${dish.id}`;
        })
        .catch(error => {
            console.error("Failed to create dish: ", error);
            alert("Failed to create dish!");
        });
    });

// Logout
logoutBt.addEventListener('click', () => {
    fetch('/logout', { method: 'GET' })
    .then(() => {
        showGuestView();
    })
    .catch(error => {
        console.error('Issues logging out:', error);
        showGuestView();
    });
});
