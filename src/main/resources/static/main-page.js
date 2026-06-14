// Elemente aus der html datei hole
const cookingBoardBt = document.getElementById('cookingBoardBt');

const logoutBt = document.getElementById('logoutBt');
const universalBackBt = document.getElementById('universalBackBt');
let screenHistory = []; // Damit er weiß wohin zurück
//Modal Elemente
const amountDialog = document.getElementById('amountDialog');
const modalIngredientName = document.getElementById('modalIngredientName');
const modalGramInput = document.getElementById('modalGramInput');
const modalCancelBt = document.getElementById('modalCancelBt');
const modalConfirmBt = document.getElementById('modalConfirmBt');
let selectedIngredient = null;
//Virtual pot Elemente
const potIngredientsContainer = document.getElementById('pot-ingredients-container');
const potAddMoreBt = document.getElementById('potAddMoreBt');
const virtualPot = [];

// Wir holen das h1-Element direkt aus dem Header, da es keine ID hat
const pageTitle = document.querySelector('header h1');
const ingredientsListDiv = document.getElementById('ingredients-list')


//alle screens in einer liste speichern
const screens = {
    start: document.getElementById('screen-start'),
    groups: document.getElementById('screen-groups'),
    cooking: document.getElementById('screen-cooking'),
    pot: document.getElementById('screen-pot')
};

//Zentrale Funktion zum wechseln der Screens
function showScreen(screenKey, titleText, isBackAction = false) {
    // Bevor wir wechseln, Verlauf merken
    const currentActiveScreen = Object.keys(screens).find(key => screens[key] && screens[key].classList.contains('active'));
    if (!isBackAction && currentActiveScreen && currentActiveScreen !== screenKey && screenKey !== 'start') {
    screenHistory.push(currentActiveScreen);
    } else if (screenKey === 'start') {
    screenHistory = []; // Verlauf löschen, wenn wir ganz am Anfang sind
    }

    //Zuerst bei allen Screens die active-Klassen entfernen
    Object.values(screens).forEach(screen => {
        if(screen) screen.classList.remove('active');
    });

    //dem gewünschtem screen die active-Klasse geben
    if (screens[screenKey]) {
        screens[screenKey].classList.add('active');
    }

    //den Header Titel anpassen
    if (pageTitle) {
        pageTitle.innerText = titleText;
    }

    // Back Button auf Startseite ausblenden
        if (universalBackBt) {
            universalBackBt.style.display = screenHistory.length > 0 ? "block" : "none";
        }
}

//Funktion zum Zeichnen der Zutaten im Virtual Pot
function updatePotUI() {
    if(virtualPot.length == 0) {
    potIngredientsContainer.innerHTML = "<p style='text-align: center; color: #777;>Your pot is empty. Add some ingredients!</p>";
    return;
    }

    const ul = document.createElement('ul');
    ul.className = "pot-list";

    virtualPot.forEach(item => {
        const li = document.createElement('li');
        li.className = "pot-item";
        li.innerHTML = `<span class="pot-item-name">${item.name}</span>
                        <span class="pot-item-amount">${item.amount}g</span>`;
        ul.appendChild(li);
    });

    potIngredientsContainer.innerHTML = "";
    potIngredientsContainer.appendChild(ul);
}

//Zutaten für eine bestimmte group laden
function fetchIngredients(groupId, groupName) {
    //Anzeige, falls das laden von den daten bissi braucht
    ingredientsListDiv.innerHTML = "<p>loading ingredients</p>";

    //Der GET request
    fetch(`/api/foodgroups/${groupId}/ingredients`, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('failed to load ingredients');
        }
        return response.json(); // Antwort als JSON interpretieren
    })
    .then(ingredients => {
         // Liste leeren
         ingredientsListDiv.innerHTML = "";

         // Wenn keine Zutaten in der DB sind:
         if (ingredients.length === 0) {
             ingredientsListDiv.innerHTML = "<p>no ingredients found in this group</p>";
             return;
         }

         // Container für die Buttons statt der Liste
         const container = document.createElement('div');
         container.className = "ingredients-buttons-grid";

         ingredients.forEach(ingredient => {
             // Jede Zutat wird zum Button
             const button = document.createElement('button');
             button.className = "ingredient-card-bt";
             button.innerText = ingredient.ingrName;

             // Klick auf den Button -> Merken und Popup öffnen
             button.addEventListener('click', () => {
                 selectedIngredient = ingredient; // Zutat im Speicher sichern
                 modalIngredientName.innerText = ingredient.ingrName; // Name im Popup ändern
                 modalGramInput.value = ""; // Input-Feld im Popup leeren
                 amountDialog.showModal(); // Das HTML-Popup öffnen
             });

             container.appendChild(button);
         });
         ingredientsListDiv.appendChild(container);
    })
    .catch(error => {
         console.error("API-Fehler:", error);
         ingredientsListDiv.innerHTML = `<p style="color: red;">Unable to load data. Empty database?</p>`;
    });
}

// Foodgroups aus dem backend laden und Buttons erstellen
function fetchFoodGroups() {
    const container = document.getElementById("groups-container");
    if (!container) return;

    fetch("/api/foodgroups")
    .then(response => {
            if (!response.ok) {
                throw new Error("Food Groups could not be loaded.");
            }
            return response.json();
    })
    .then(groups => {
        container.innerHTML = ""; // Ladetext löschen

        groups.forEach(group => {
            //Buttons erstellen
            const button = document.createElement("button");
            button.className = "group-card";
            button.textContent = group.fgName;

            //IDs und Namen kommen als Attribute rein
            button.setAttribute("data-id", group.id);
            button.setAttribute("data-group", group.fgName.toLowerCase());

            //Klick-Event-Listener an den neu erstellten Button hängen
            button.addEventListener('click', () => {
                // Screen wechseln
                showScreen('cooking', group.fgName.toUpperCase());
                // Ingredients mit ID laden
                fetchIngredients(group.id, group.fgName);
            });

            //fertigen Button ins leere Grid im HTML einfügen
            container.appendChild(button);
        });
    })
    .catch(error => {
        console.error("Error when calling for th Food Groups:", error);
        container.innerHTML = "<p style=' color: red;'>Error: Food Groups could not be loaded.</p>";
    });
}


//EventListener

//auf Let's cook Klicken -> wechselt zu den Foodgroups und lädt die Gruppen
if (cookingBoardBt) {
    cookingBoardBt.addEventListener('click', () => {
        showScreen('groups', 'Food Groups');
        fetchFoodGroups();
    });
}

////Klicken auf eine Foodgroup
//document.querySelectorAll('.group-card').forEach(button => {
//    button.addEventListener('click', (event) => {
//        const groupId = event.target.getAttribute('data-id');
//        const groupName = event.target.getAttribute('data-group');
//
//        // 1. Screen wechseln
//        showScreen('cooking', groupName.toUpperCase());
//
//        // 2. Daten live aus dem Backend holen
//        fetchIngredients(groupId, groupName);
//    });
//});

//Logout Button
if (logoutBt) {
logoutBt.addEventListener('click', () => {
// Logout per GET
fetch('/logout', {
method: 'GET'
})
.then(response => {
//Nutzer geht zurück zum Login-Bildschirm
window.location.href = '/';
})
.catch(error => {
console.error('Issues logging out:', error);
// Zurück zum Login erzwingen
window.location.href = '/';
});
});
}


//Back Button
if (universalBackBt) {
    universalBackBt.addEventListener('click', () => {
        if (screenHistory.length > 0) {
            const previousScreen = screenHistory.pop(); //Letzter Screen ausn Verlauf

            let prevTitle = 'Foodly';
            if (previousScreen === 'groups') prevTitle = 'Food Groups';

            showScreen(previousScreen, prevTitle, true);
        }
    });
}

// Wenn man im Popup auf Cancel klickt, schließt es sich einfach
if (modalCancelBt && amountDialog) {
    modalCancelBt.addEventListener('click', () => {
        amountDialog.close();
    });
}

// Wenn man im Popup auf Add klickt, prüfen wir die Grammzahl
if (modalConfirmBt && amountDialog) {
    modalConfirmBt.addEventListener('click', () => {
        const amount = modalGramInput.value;
        if (amount && amount > 0 && selectedIngredient) {
            //Zutaten als Objekt in das array pushen
            virtualPot.push({
                id: selectedIngredient.id,
                name: selectedIngredient.ingrName,
                amount: parseInt(amount, 10)
            });

            amountDialog.close(); //Schließt popup

            //virtual Pot view aktiúalisieren
            updatePotUI();

            //wechsel zum virtual pot
            showScreen('pot', 'Virtual Pot');
        } else {
        alert("Please put in a valid Number!");
        }
    });
}


if (potAddMoreBt) {
    potAddMoreBt.addEventListener('click', () => {
        showScreen('groups', 'Food Groups');
    });
}

showScreen('start', 'Foodly');