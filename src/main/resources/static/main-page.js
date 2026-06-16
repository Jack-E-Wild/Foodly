// Elemente aus der html datei hole
const cookingBoardBt = document.getElementById('cookingBoardBt');

const logoutBt = document.getElementById('logoutBt');
const universalBackBt = document.getElementById('universalBackBt');
const universalNextBt = document.getElementById('universalNextBt');
const globalSearchInput = document.getElementById('globalSearchInput');
const globalSearchBt = document.getElementById('globalSearchBt');
let screenHistory = []; // Damit er weiß wohin zurück

//Modal Elemente vom dish Name
const dishNameDialog = document.getElementById('dishNameDialog');
const dishNameInput = document.getElementById('dishNameInput');
const dishNameCancelBt = document.getElementById('dishNameCancelBt');
const dishNameConfirmBt = document.getElementById('dishNameConfirmBt');
let currentDishId = null; // Die ID des aktuell erstellten Gerichts merken

//Modal Elemente für amount dialog
const amountDialog = document.getElementById('amountDialog');
const modalIngredientName = document.getElementById('modalIngredientName');
const modalGramInput = document.getElementById('modalGramInput');
const modalCancelBt = document.getElementById('modalCancelBt');
const modalConfirmBt = document.getElementById('modalConfirmBt');
let selectedIngredient = null;

//Selektoren für die neuen Steuerungsknöpfe
const goToPotBt = document.getElementById('goToPotBt');
const goToStatsBt = document.getElementById('goToStatsBt');
const cookingToPotBt = document.getElementById('cookingToPotBt');
const userAvatar = document.getElementById('userAvatar');

// Wir holen das h1-Element direkt aus dem Header, da es keine ID hat
const pageTitle = document.querySelector('header h1');
const ingredientsListDiv = document.getElementById('ingredients-list')


//alle screens in einer liste speichern
const screens = {
    start: document.getElementById('screen-start'),
    groups: document.getElementById('screen-groups'),
    cooking: document.getElementById('screen-cooking'),
};

//Funktion zum Laden des Avatars
function loadUserAvatar() {
    // GET-Request an den neuen, sauberen Endpunkt
    fetch('/api/users/avatar', {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load avatar');
        }
        return response.json(); // Erwartet: { "avatar": "https://..." }
    })
    .then(data => {
        if (data && data.avatar && userAvatar) {
            userAvatar.src = data.avatar; // Die Gravatar-URL ins <img> Tag klatschen
            userAvatar.style.display = "block"; // Bild sichtbar machen
        }
    })
    .catch(error => {
        console.error("Fehler beim Laden des Gravatars:", error);
    });
}

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

    //Next Button ein-/ausblenden
    if (universalNextBt) {
        universalNextBt.style.display = (screenKey === 'start' || screenKey === 'groups' || screenKey === 'cooking') ? "block" : "none";
    }


    // Suchfeld auf Startseite ausblenden
    if (globalSearchInput) {
        globalSearchInput.style.display = screenKey !== 'start' ? "block" : "none";
    }

    // searchbutton auf Startseite ausblenden
    if (globalSearchBt) {
        globalSearchBt.style.display = screenKey !== 'start' ? "block" : "none";
    }
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
         console.error("API-Error:", error);
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
        dishNameInput.value = "";
        dishNameDialog.showModal();
    });
}

if(dishNameCancelBt) {
    dishNameCancelBt.addEventListener('click', () => {dishNameDialog.close();});
}

//Dish im Backend erstellen
if(dishNameConfirmBt) {
    dishNameConfirmBt.addEventListener('click', () => {
        const name = dishNameInput.value.trim();
        if(!name) {
            alert("Please enter a name!");
            return;
        }

        fetch('/api/dish', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify({name: name})
        })
        .then(response => {
            if(!response.ok) throw new Error("Dish could not be created!");
            return response.json();
        })
        .then(dish => {
            //Konsole gibt aus obs richtig gespeichert wurde und b´gibt uns die dish auch aus
            log("1. Erfolg! Backend hat das Gericht erstellt. Antwortdaten:", dish);
            currentDishId = dish.id; //merkt sich die ID vom Server
            //konsole gibt uns die dishId  zrk
            log("2. Die Variable currentDishId ist jetzt:", currentDishId);

            dishNameDialog.close();
            showScreen('groups', 'Food Groups');
            fetchFoodGroups();
        })
        .catch(error => {
            console.error("Failed to create dish: ", error);
            alert("Failed to create dish!");
        });
    });
}


// Zutat zum Gericht hinzufügen (POST an /api/dish/{dishId}/ingredients)
if (modalConfirmBt && amountDialog) {
    modalConfirmBt.addEventListener('click', () => {
        const amount = modalGramInput.value;
        //gibt uns in der konsole zrk was grad apssiert um zu testen obs klappt
        log("3. 'Add' geklickt. Überprüfe Daten vor dem Absenden:");
        log("   - currentDishId (Gericht):", currentDishId);
        log("   - selectedIngredient (Zutat):", selectedIngredient);
        log("   - Eingegebene Menge:", amount);

        if (amount && amount > 0 && selectedIngredient && currentDishId) {
            // POST ans Backend senden, um Zutat an das Dish zu hängen
            //Body braucht "id" (der Zutat) und "amount"
            fetch(`/api/dish/${currentDishId}/ingredients`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: selectedIngredient.id,
                    amount: amount,
                    name : selectedIngredient.name,
                    calories : selectedIngredient.calories,
                    fibers : selectedIngredient.fibers,
                    protein : selectedIngredient.protein,
                    carbs : selectedIngredient.carbs,
                    fats : selectedIngredient.fats

                })
            })
            .then(response => {
                if (!response.ok) throw new Error("failed to add ingredient");
                return response.json();
            })
            .then(data => {
                //konsolen ausgaben zum testen obs klappt
                log("4. Zutat erfolgreich gemappt! Backend-Antwort:", data);
                log(`5. Leite weiter zu: /pot.html?dishId=${currentDishId}`);

                amountDialog.close();
                // Direkt zur Topf-Seite wechseln und die dishId mitschicken!
                window.location.href = `/pot.html?dishId=${currentDishId}`;
            })
            .catch(error => {
                console.error("Error when adding ingredient:", error);
                alert("Backend error when adding ingredient");
            });
        } else {
                alert("Please put in a valid Number!");
        }
    });
}

// Navigationen zur eigenständigen pot.html mit dishId
if (goToPotBt) {
    goToPotBt.addEventListener('click', () => {
        if(currentDishId) window.location.href = `/pot.html?dishId=${currentDishId}`;
    });
}

if (cookingToPotBt) {
     cookingToPotBt.addEventListener('click', () => {
         if(currentDishId) window.location.href = `/pot.html?dishId=${currentDishId}`;
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

//Next Button
if (universalNextBt) {
    universalNextBt.addEventListener('click', () => {
        // Finden, welcher Screen gerade aktiv ist
        const currentScreenKey = Object.keys(screens).find(key => screens[key] && screens[key].classList.contains('active'));

        if (currentScreenKey === 'start') {
            // Falls man von Start weiter klickt, auch nach Namen fragen
            dishNameDialog.showModal();
        } else if (currentScreenKey === 'groups') {
            // Von Gruppen geht es zur Koch-Anzeige
            showScreen('cooking', 'COOKING');
        } else if (currentScreenKey === 'cooking') {
            // Reicht die aktuelle dishId an die Topf-Seite weiter
            if (currentDishId) {
                window.location.href = `/pot.html?dishId=${currentDishId}`;
            } else {
                //Wenn wir auf der Cooking-Seite "Weiter" klicken, springen wir zur pot.html!
                window.location.href = '/pot.html';
            }
        }
    });
}

// Wenn man im Popup auf Cancel klickt, schließt es sich einfach
if (modalCancelBt && amountDialog) {
    modalCancelBt.addEventListener('click', () => {
        amountDialog.close();
    });
}




if (goToStatsBt) {
    goToStatsBt.addEventListener('click', () => {
        //alert("Statistik-Seite folgt bald!");
        console.log("NAVIGATE: 'Go to Stats' auf der Hauptseite geklickt.");
        console.log("NAVIGATE: Aktuelle currentDishId im Speicher:", currentDishId);

        if (currentDishId) {
            console.log(`Maps: Leite weiter zu: /stats.html?dishId=${currentDishId}`);
            window.location.href = `/stats.html?dishId=${currentDishId}`;
        } else {
            console.warn("NAVIGATE-ABBRUCH: Kann nicht zu Stats wechseln, weil currentDishId null oder undefined ist! (Noch kein Gericht gestartet?)");
            alert("Please start or select a dish first before viewing statistics!");
        }
    });
}

    //Search für die Ingredient Buttons
if (globalSearchInput) {
    globalSearchBt.addEventListener('click', (event) => {
        const searchTerm = globalSearchInput.value.toLowerCase().trim();
        const url = `/api/search?query=${encodeURIComponent(searchTerm)}`;
        // FDC-Daten bei Group holen
        const currentScreenKey = Object.keys(screens).find(key => screens[key] && screens[key].classList.contains('active'));
        if (currentScreenKey === 'groups' && searchTerm.length > 2) {

            // in die passende Foodgroup wechselnn mit filter
            showScreen('cooking', 'SEARCH RESULTS');

    // SEARCH endpoint
    fetch(url)
    .then(response => response.json())
    .then(foodItems => {
    //Liste leeren und FDC-Ergebnisse einbaun
    ingredientsListDiv.innerHTML = "";

                const container = document.createElement('div');
                container.className = "ingredients-buttons-grid";

                foodItems.forEach(item => {
                    const button = document.createElement('button');
                    button.className = "ingredient-card-bt";
                    button.innerText = item.description;

                    button.addEventListener('click', () => {
                        // Speichert jetzt auch die id des Suchergebnisses mit ab
                        selectedIngredient = { name : item.description, calories: item.calories, fibers: item.fibers, protein : item.protein, carbs: item.carbs, fats: item.fats };
                        log(selectedIngredient);
                        modalIngredientName.innerText = item.description;
                        modalGramInput.value = "";
                        amountDialog.showModal();
                    });
                    container.appendChild(button);
                });
                ingredientsListDiv.appendChild(container);
            });
        }


        else {
            //Ingredeitn Buttons holen
            const ingredientButtons = document.querySelectorAll('.ingredient-card-bt');

            ingredientButtons.forEach(button => {
                const ingredientName = button.innerText.toLowerCase();

                // Verstecke nicht gesuchtes
                if (ingredientName.includes(searchTerm)) {
                    button.style.display = ""; // sichtbar
                } else {
                    button.style.display = "none"; // ausgeblendet
                }
            });
        }
    });
}

// --- Deep-Linking Check beim Starten ---
// Falls pot.html uns einen Query-Parameter mitschickt, direkt die Gruppen zeigen
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('dishId')) {
    currentDishId = parseInt(urlParams.get('dishId'), 10);
    showScreen('groups', 'Food Groups');
    fetchFoodGroups();
} else {
    showScreen('start', 'Foodly');
}

// Beim Laden der Seite direkt den Avatar des Session-Users holen
loadUserAvatar();