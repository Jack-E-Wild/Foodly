//import navigationsmenü
import { renderNavigationMenu,loadUserAvatar } from './navigation.js';

const potIngredientsContainer = document.getElementById('pot-ingredients-container');
const potAddMoreBt = document.getElementById('potAddMoreBt');
const potToStatsBt = document.getElementById('potToStatsBt');
const potBackBt = document.getElementById('potBackBt');

const pageTitle = document.querySelector('header h1');

// Die dishId aus der URL auslesen
const urlParams = new URLSearchParams(window.location.search);
const dishId = urlParams.get('dishId');



function loadPotData() {
    if (!dishId) {
        potIngredientsContainer.innerHTML = "<p style='text-align: center; color: red;'>No Dish ID found!</p>";
        return;
    }

    fetch(`/api/dish/${dishId}/macros`, {method: 'GET'})
    .then (response => {
        if (!response.ok) throw new Error("Failed to get macros");
        return response.json();
    })
    .then (data => {
    updateMacroUI(data);
    });

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
            pageTitle.innerHTML = `<span id="dishTitleSpan" style="cursor: pointer;">${dish.title || dish.name || 'Unnamed Dish'} ✏️</span>`;

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
            renderNavigationMenu('pot', dishId); // Menü trotzdem rendern, damit man zurückkommt!
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

            //DELETE: Zutat aus dem Gericht löschen (/api/dish/{dishId}/ingredients/{ingredientId})
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

        //navigationsmenü
        renderNavigationMenu('pot', dishId);
    })
    .catch(error => {
        console.error("Fehler beim Laden des Topfes:", error);
        potIngredientsContainer.innerHTML = "<p style='text-align: center; color: red;'>Error loading dish from backend.</p>";
    });
}



// Beim Laden der Seite direkt ausführen
loadPotData();
loadUserAvatar();