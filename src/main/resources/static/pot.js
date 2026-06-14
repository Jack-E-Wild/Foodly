const potIngredientsContainer = document.getElementById('pot-ingredients-container');
const potAddMoreBt = document.getElementById('potAddMoreBt');
const potToStatsBt = document.getElementById('potToStatsBt');
const potBackBt = document.getElementById('potBackBt');

function loadPotUI() {
    // Zutaten aus dem localStorage holen, falls keine da sind leeres Array nutzen
    const virtualPot = JSON.parse(localStorage.getItem('virtualPot')) || [];

    if (virtualPot.length === 0) {
        potIngredientsContainer.innerHTML = "<p style='text-align: center; color: #777;'>Your pot is empty. Add some ingredients!</p>";
        return;
    }

    const ul = document.createElement('ul');
    ul.className = "pot-list";

    virtualPot.forEach(item => {
        const li = document.createElement('li');
        li.className = "pot-item";
        li.innerHTML = `
            <span class="pot-item-name">${item.name}</span>
            <span class="pot-item-amount">${item.amount}g</span>
        `;
        ul.appendChild(li);
    });

    potIngredientsContainer.innerHTML = "";
    potIngredientsContainer.appendChild(ul);
}

// Navigationen
potAddMoreBt.addEventListener('click', () => {
    // Schickt den User zurück, hängt aber einen Parameter an, damit main-page direkt bei den Gruppen startet
    window.location.href = '/main-page.html?screen=groups';
});

potToStatsBt.addEventListener('click', () => {
    alert("Statistik-Seite kommt in Kürze!");
    // window.location.href = '/stats.html'; (Sobald vorhanden)
});

potBackBt.addEventListener('click', () => {
    window.location.href = '/main-page.html?screen=groups';
});

// Beim Laden der Seite direkt ausführen
loadPotUI();