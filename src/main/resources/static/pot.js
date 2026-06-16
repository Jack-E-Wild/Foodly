const potIngredientsContainer = document.getElementById('pot-ingredients-container');
const potAddMoreBt = document.getElementById('potAddMoreBt');
const potToStatsBt = document.getElementById('potToStatsBt');
const potBackBt = document.getElementById('potBackBt');
const userAvatar = document.getElementById('userAvatar');
const pageTitle = document.querySelector('header h1');

// Die dishId aus der URL auslesen
const urlParams = new URLSearchParams(window.location.search);
const dishId = urlParams.get('dishId');

//avatar laden
function loadUserAvatar() {
    fetch('/api/users/avatar', { method: 'GET' })
    .then(response => {
        if (!response.ok) throw new Error('Avatar konnte nicht geladen werden');
        return response.json();
    })
    .then(data => {
        if (data && data.avatar && userAvatar) {
            userAvatar.src = data.avatar;
            userAvatar.style.display = "block";
        }
    })
    .catch(error => console.error("Fehler beim Laden des Gravatars:", error));
}

function loadPotData() {
    if (!dishId) {
        potIngredientsContainer.innerHTML = "<p style='text-align: center; color: red;'>No Dish ID found!</p>";
        return;
    }

    fetch(`/api/dish/${dishId}`, { method: 'GET' })
    .then (response => {
        if (!response.ok) throw new Error("Failed to load dish ");
        return response.json(); // Liefert eine Map: { "dish": ..., "totalCalories": ..., "macroPercentages": ... }
    })
    .then(data => {
        //konsolen ausgaben um sicherzugehen, dass es klappt
        log("=== VIRTUAL POT DATEN VOM BACKEND ===");
        log("Komplette Antwort (data):", data);

        const dish = data.dish; // Das eigentliche Dish-Modul herausholen
        log("Das extrahierte Gericht (dish):", dish);

        if (dish) {
            log("Enthaltene Zutaten im Gericht:", dish.ingredients || dish.foodItems);
        }
        log("=====================================");
        // Den Namen des Gerichts im Titel anzeigen (und klickbar machen zum Bearbeiten!)
        // PATCH: Gerichtname ändern bei Klick auf den Titel
        if (pageTitle && dish) {
            pageTitle.innerHTML = `<span id="dishTitleSpan" style="cursor: pointer;">🍲 ${dish.title || dish.name || 'Unnamed Dish'} ✏️</span>`;

            document.getElementById('dishTitleSpan').addEventListener('click', () => {
                const currentName = dish.title || dish.name;
                const newTitle = prompt("Enter new dish name:", currentName);
                if (newTitle && newTitle.trim() !== "" && newTitle.trim() !== currentName) {
                    fetch(`/api/dish/${dishId}`, {
                        method: 'PATCH', // Laut Backend ein PatchMapping
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name: newTitle.trim() })
                    })
                    .then(res => { if(res.ok) loadPotData(); });
                }
            });
        }

        // Zutatenliste rendern
        const ingredients = dish.dishIngredients  || [];
        //    // Zutaten aus dem localStorage holen, falls keine da sind leeres Array nutzen
        //    const virtualPot = JSON.parse(localStorage.getItem('virtualPot')) || [];

        if (ingredients.length === 0) {
            potIngredientsContainer.innerHTML = "<p style='text-align: center; color: #777;'>Your pot is empty. Add some ingredients!</p>";
            return;
        }

        const ul = document.createElement('ul');
        ul.className = "pot-list";

        ingredients.forEach(item => {
            const li = document.createElement('li');
            li.className = "pot-item";
            // Holt den Namen direkt oder schaut in das verschachtelte Objekt aus deiner Server-Antwort
            const ingredientName = item.ingrName || item.name || (item.ingredient ? item.ingredient.ingrName : null) || "Zutat";

            // Holt die Grammzahl (im Backend-Log deines Bildes heißt es schlicht "amount")
            const ingredientAmount = item.amountInGrams ||
                                     (item.ingredient ? item.ingredient.amount : null) ||
                                     (item.foodItem ? item.foodItem.amount : null) ||
                                     item.grams || 0;

            li.innerHTML = `
                <span class="pot-item-name">${ingredientName}</span>
                <div>
                    <span class="pot-item-amount" style="margin-right: 15px; cursor:pointer;">${ingredientAmount}g ✏️</span>
                    <button class="delete-ingredient-bt" style="background:none; border:none; cursor:pointer; font-size:1.1rem;">❌</button>
                </div>
            `;

            // PUT: Menge ändern (Schickt ID und amount im JSON-Body an /api/dish/{dishId}/ingredients)
            li.querySelector('.pot-item-amount').addEventListener('click', () => {
                const newAmount = prompt("Change amount (grams):", ingredientAmount);
                if (newAmount && parseFloat(newAmount) > 0) {
                    fetch(`/api/dish/${dishId}/ingredients`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                              id: item.id, // Die ID des Eintrags im Join/Modell
                              amount: newAmount,
                              name: item.name,
                              fats: item.fats,
                              carbs: item.carbs,
                              protein: item.protein,
                              fibers: item.fibers,
                              calories: item.calories
                        })
                    })
                    .then(res => { if(res.ok) loadPotData(); });
                }
            });

            log("=== VIRTUAL POT DATEN VOM BACKEND ===");
            log("Komplette Antwort (data):", data);

            // DELETE: Zutat aus dem Gericht löschen (/api/dish/{dishId}/ingredients/{ingredientId})
            li.querySelector('.delete-ingredient-bt').addEventListener('click', () => {
                if(confirm(`Remove ${ingredientName}?`)) {
                    fetch(`/api/dish/${dishId}/ingredients/${item.id}`, {
                        method: 'DELETE'
                    })
                    .then(res => { if(res.ok) loadPotData(); });
                }
            });

            log("=== VIRTUAL POT DATEN VOM BACKEND ===");
            log("Komplette Antwort (data):", data);

            ul.appendChild(li);
        });

        potIngredientsContainer.innerHTML = "";
        potIngredientsContainer.appendChild(ul);
    })
    .catch(error => {
        console.error("Fehler beim Laden des Topfes:", error);
        potIngredientsContainer.innerHTML = "<p style='text-align: center; color: red;'>Error loading dish from backend.</p>";
    });
}

// Navigationen
potAddMoreBt.addEventListener('click', () => {
    // Schickt den User zurück, hängt aber einen Parameter an, damit main-page direkt bei den Gruppen startet
    window.location.href = `/main-page.html?dishId=${dishId}`;
});

potToStatsBt.addEventListener('click', () => {
    //alert("Statistik-Seite kommt in Kürze!");

    console.log("=== NAVIGATION ZU DEN STATISTIKEN ===");
    console.log("Button 'Go to Stats' im Virtual Pot geklickt.");
    console.log("Aktuelle dishId in pot.js vorhanden:", dishId);


    if (dishId) {
        console.log(`Leite erfolgreich weiter zu: /stats.html?dishId=${dishId}`);
        console.log("======================================");
        window.location.href = `/stats.html?dishId=${dishId}`;
    } else {
        console.warn("WARNUNG: Navigation abgebrochen, da keine dishId in der URL von pot.html gefunden wurde!");
        console.log("======================================");
        alert("No dish selected to show statistics for.");
    }
});

potBackBt.addEventListener('click', () => {
    window.location.href = `/main-page.html?dishId=${dishId}`;
});

// Beim Laden der Seite direkt ausführen
loadPotData();
loadUserAvatar();