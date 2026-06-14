// Elemente aus der html datei hole
const cookingBoardBt = document.getElementById('cookingBoardBt');
const backToGroupsBt = document.getElementById('backToGroupsBt');
// Wir holen das h1-Element direkt aus dem Header, da es keine ID hat
const pageTitle = document.querySelector('header h1');
const ingredientsListDiv = document.getElementById('ingredients-list')

//alle screens in einer liste speichern
const screens = {
    start: document.getElementById('screen-start'),
    groups: document.getElementById('screen-groups'),
    cooking: document.getElementById('screen-cooking')
};

//Zentrale Funktion zum wechseln der Screens
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
             li.innerText = ingredient.ingrName;
             ul.appendChild(li);
         });

         ingredientsListDiv.appendChild(ul);
     })
     .catch(error => {
         console.error("API-Fehler:", error);
         ingredientsListDiv.innerHTML = `<p style="color: red;">Daten konnt nicht geladen werden. Datenbank leer?</p>`;
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

//Button um zurück zu klicken
if (backToGroupsBt) {
    backToGroupsBt.addEventListener('click', () => {
       showScreen('groups', 'Food Groups');
    });
}

showScreen('start', 'Foodly');