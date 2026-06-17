//import navogationsmenü
import { renderNavigationMenu, loadUserAvatar } from './navigation.js';

const statsBackBt = document.getElementById('statsBackBt');
const statsDishTitle = document.getElementById('statsDishTitle');
const totalCaloriesDisplay = document.getElementById('totalCaloriesDisplay');

// dishId aus der URL holen
const urlParams = new URLSearchParams(window.location.search);
const dishId = urlParams.get('dishId');


function loadStatsData() {
    if (!dishId) {
        console.error("STATS-ERROR: Keine dishId in der URL gefunden!");
        return;
    };

    console.log(`STATS-FETCH: Hole Daten vom Backend für Dish-ID: ${dishId}`);

    // Wir rufen den GET-Endpunkt für das gesamte Gericht auf
    fetch(`/api/dish/${dishId}`, { method: 'GET' })
    .then(response => {
        if (!response.ok) throw new Error("Fehler beim Abruf der Statistik-Daten");
        return response.json();
    })
    .then(data => {
        console.log("=== STATS DATA VOM BACKEND EMPFANGEN ===");
        console.log("Komplette Server-Antwort (data):", data);
        console.log("Extrahierte Makronährstoffe (macroPercentages):", data.macroPercentages);
        console.log("Gesamtkalorien (totalCalories):", data.totalCalories);
        console.log("========================================");

        // Titel und Kalorien anzeigen
        if (data.dish) {
            statsDishTitle.innerText = data.dish.title || data.dish.name || "Unbenanntes Gericht";
        }
        totalCaloriesDisplay.innerText = `${Math.round(data.totalCalories || 0)} kcal`;

        // Diagramm füttern
        if (data.macroPercentages) {
            createChart(data.macroPercentages);
        } else {
            console.warn("STATS-WARNUNG: 'macroPercentages' ist leer oder undefined im JSON!");
        }
        //navigationsmenü
        renderNavigationMenu('stats', dishId);
    })
    .catch(error => console.error("Fehler beim Laden der Stats:", error));
}

function createChart(macros) {
    const ctx = document.getElementById('macrosChart').getContext('2d');

    // Die Daten aus dem Backend-Objekt ziehen
    // carbs, fibers, fats, proteins
    const values = [
        macros.carbs || 0,
        macros.fibers || 0,
        macros.fats || 0,
        macros.proteins || 0
    ];

    console.log("CHART.JS: Diagramm wird mit folgenden Werten gebaut (Carbs, Fibers, Fats, Proteins):", values);

    new Chart(ctx, {
        type: 'doughnut', // Ringdiagramm
        data: {
            labels: ['Carbs', 'Fibers', 'Fats', 'Proteins'],
            datasets: [{
                data: values,
                backgroundColor: [
                    'rgb(239, 210, 152)', // Carbs (Beige)
                    'rgb(83, 105, 92)',   // Fibers (Dunkelgrün)
                    'rgb(196, 206, 169)', // Fats (Hellgrün)
                    'rgb(218, 107, 96)'   // Proteins (Rot/Koralle)
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#4A3525',
                        font: { size: 14 }
                    }
                }
            },
            cutout: '50%' // Macht den Ring dicker/dünner
        }
    });
}


// Initialisieren
loadUserAvatar();
loadStatsData();