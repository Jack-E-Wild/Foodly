// Elemente aus der html datei hole
const cookingBoardBt = document.getElementById('cookingBoardBt');
const backToGroupsBt = document.getElementById('backToGroupsBt');
// Wir holen das h1-Element direkt aus dem Header, da es keine ID hat
const pageTitle = document.querySelector('header h1');
const ingredientsListDiv = document.getElementById('ingredients-list')

//allr screens in einer liste speichern
const screens = {
    start: document.getElementById('screen-start'),
    groups: document.getElementById('screen-groups'),
    cooking: document.getElementById('screen-cooking')
};

//Zrntrale Funktion zum wechseln der Screens
function showScreen(screenKey, titleText) {
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
}

//Zutaten für eine bestimmte group laden
function fetchIngredients(groupId, groupName) {
    //Anzeige, falls das laden von den daten bissi braucht
    ingredientsListDiv.innerHTML = "<p>Zutaten werden geladen...</p>";

    //Der GET request
    fetch(`/api/foodgroups/${groupId}/ingredients`, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Fehler beim Laden der Zutaten');
        }
        return response.json(); // Antwort als JSON interpretieren
    })
    .then(ingredients => {
         // Liste leeren
         ingredientsListDiv.innerHTML = "";

         // Wenn keine Zutaten in der DB sind:
         if (ingredients.length === 0) {
             ingredientsListDiv.innerHTML = "<p>Keine Zutaten in dieser Gruppe gefunden.</p>";
             return;
         }

         // Wir bauen das HTML dynamisch aus den JSON-Daten
         const ul = document.createElement('ul');
         ul.className = "ingredients-ui-list";

         ingredients.forEach(ingredient => {
             const li = document.createElement('li');
             li.innerText = ingredient.name;
             ul.appendChild(li);
         });

         ingredientsListDiv.appendChild(ul);
     })
     .catch(error => {
         console.error("API-Fehler:", error);
         ingredientsListDiv.innerHTML = `<p style="color: red;">Daten konnt nicht geladen werden. Datenbank leer?</p>`;
     });
}

//EventListener

//auf Let's cook Llicken -> wechselt zu den Foodgroups
if (cookingBoardBt) {
    cookingBoardBt.addEventListener('click', () => {
        showScreen('groups', 'Food Groups');
    });
}

//Klciken auf eine Foodgroup
document.querySelectorAll('.group-card').forEach(button => {
    button.addEventListener('click', (event) => {
        const groupId = event.target.getAttribute('data-id');
        const groupName = event.target.getAttribute('data-group');

        // 1. Screen wechseln
        showScreen('cooking', groupName.toUpperCase());

        // 2. Daten live aus dem Backend holen
        fetchIngredients(groupId, groupName);
    });
});

//Button um zurück zu klicken
if (backToGroupsBt) {
    backToGroupsBt.addEventListener('click', () => {
       showScreen('groups', 'Food Groups');
    });
}

showScreen('start', 'Foodly');