function updateMacroUI(macros) {
//    // 1. Update widths dynamically using percentages
//    document.getElementById('bar-protein').style.width = `${macros.proteins}%`;
//    document.getElementById('bar-carbs').style.width = `${macros.carbs}%`;
//    document.getElementById('bar-fats').style.width = `${macros.fats}%`;
//    document.getElementById('bar-fibers').style.width = `${macros.fibers}%`;
//
//    // 2. Update the numeric text indicators
//    document.getElementById('protein-text').textContent = `${macros.proteins}%`;
//    document.getElementById('carbs-text').textContent = `${macros.carbs}%`;
//    document.getElementById('fats-text').textContent = `${macros.fats}%`;
//    document.getElementById('fibers-text').textContent = `${macros.fibers}%`;

    // Summe aller Gramm-Werte
    const total = macros.proteins + macros.carbs + macros.fats + macros.fibers;

    // Überprüfen ob der Topf leer ist, dann setzen wir alle Balken auf 0%
    if (total === 0) {
        document.getElementById('bar-protein').style.setProperty('width', '0%', 'important');
        document.getElementById('bar-carbs').style.setProperty('width', '0%', 'important');
        document.getElementById('bar-fats').style.setProperty('width', '0%', 'important');
        document.getElementById('bar-fibers').style.setProperty('width', '0%', 'important');
    }

    // Ratio berechnen
    const proteinPercent = ((macros.proteins / total) * 100).toFixed(1);
    const carbsPercent = ((macros.carbs / total) * 100).toFixed(1);
    const fatsPercent = ((macros.fats / total) * 100).toFixed(1);
    const fibersPercent = ((macros.fibers / total) * 100).toFixed(1);

    // Breiten der Balken in der Leiste aktualisieren
    document.getElementById('bar-protein').style.setProperty('width', `${proteinPercent}%`, 'important');
    document.getElementById('bar-carbs').style.setProperty('width', `${carbsPercent}%`, 'important');
    document.getElementById('bar-fats').style.setProperty('width', `${fatsPercent}%`, 'important');
    document.getElementById('bar-fibers').style.setProperty('width', `${fibersPercent}%`, 'important');

    }

    (function() {
    // Prüfen, ob eine dishId in der aktuellen URL steckt
    const urlParams = new URLSearchParams(window.location.search);
    const urlDishId = urlParams.get('dishId');

    if (urlDishId) {
    // Wenn eine ID da ist, holen wir uns die Makros automatisch vom Server
    fetch(`/api/dish/${urlDishId}`, { method: 'GET' })
    .then(response => {
    if (!response.ok) throw new Error("Automatic Macro-check didn't work.");
    return response.json();
    })
    .then(dish => {
    // Summen sammeln
    let totals = { proteins: 0, carbs: 0, fats: 0, fibers: 0 };

    // holen aus "dishIngredients"
    const actualDish = dish.dish || dish;
    const ingredients = actualDish.dishIngredients || [];

    if (ingredients.length > 0) {
    ingredients.forEach(item => {
    // Berechnung auf Grammzahl
    const factor = (item.amountInGrams || 100) / 100;

    // Nährwerte zusammenrechnen
    totals.proteins += (item.protein || 0) * factor;
    totals.carbs += (item.carbs || 0) * factor;
    totals.fats += (item.fats || 0) * factor;
    totals.fibers += (item.fibers || 0) * factor;
    });
    }
    console.log("Loop done. Give to UI:", totals);
    updateMacroUI(totals);
    })
    .catch(error => {
    console.warn("Automatic Border-update skipped:", error);
    });
    }
    })();