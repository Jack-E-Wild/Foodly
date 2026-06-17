// navigation.js

/**
 * Erstellt eine dynamische Menüleiste basierend auf der aktuellen Seite.
 * @param {string} currentScreen - 'groups', 'cooking', 'pot' oder 'stats'
 * @param {number|string} dishId - Die aktuelle ID des Gerichts aus der URL
 */
export function renderNavigationMenu(currentScreen, dishId) {
    // Suchen nach einer Box im HTML, wo die Knöpfe reinkommen sollen
    let navContainer = document.getElementById('app-navigation-menu');

    // Falls kein Container da ist, erstellen wir einen temporär unter dem Main-Bereich
    if (!navContainer) {
        navContainer = document.createElement('div');
        navContainer.id = 'app-navigation-menu';

        // Sucht das <main> Tag auf der aktuellen Seite
        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.appendChild(navContainer);
        } else {
            document.body.appendChild(navContainer);
        }
    }

    // SICHERSTELLEN, dass die CSS-Klassen immer sauber greifen
    navContainer.innerHTML = '';
    navContainer.className = 'global-nav-menu';

    // Definition aller 4 möglichen Buttons
    const allButtons = {
        addMore: {
            text: '➕ Add Ingredients',
            class: 'nav-btn-add',
            action: () => {
                if (dishId) window.location.href = `/main-page.html?dishId=${dishId}`;
            }
        },
        pot: {
            text: '🍲 Virtual Pot',
            class: 'nav-btn-pot',
            action: () => {
                if (dishId) window.location.href = `/pot.html?dishId=${dishId}`;
            }
        },

        stats: {
            text: '📊 Statistics',
            class: 'nav-btn-stats',
            action: () => {
                if (dishId) window.location.href = `/stats.html?dishId=${dishId}`;
            }
        },
         restart: {
            text: '🔄 Restart',
            class: 'nav-btn-restart',
            action: () => {
                if (confirm("Are you sure you want to restart? You will delete this dish with al it's ingredients!")) {
                  if (dishId) {
                      // Schickt den DELETE-Request an dein Backend (z.B. /api/dish/1)
                      fetch(`/api/dish/${dishId}`, {
                          method: 'DELETE'
                      })
                      .then(response => {
                          if (!response.ok) {
                              throw new Error('Fehler beim Löschen des Gerichts im Backend');
                          }
                          console.log('RESTART: Gericht erfolgreich gelöscht. Navigiere zur Startseite.');
                          window.location.href = '/index.html'; // Zurück zur Startseite ohne ID
                      })
                      .catch(error => {
                          console.error('RESTART-ERROR:', error);
                          alert('Das Gericht konnte auf dem Server nicht gelöscht werden.');
                      });
                  } else {
                      // Sicherheitsanker: Falls aus irgendeinem Grund keine ID da war, einfach so zurückgehen
                      console.warn('RESTART: Keine dishId vorhanden, navigiere direkt zurück.');
                      window.location.href = '/index.html';
                  }
                }
            }
        }
    };

    // Bestimmen, welche Knöpfe auf welchem Screen ausgeblendet werden sollen
    let buttonsToRender = [];

    if (currentScreen === 'groups' || currentScreen === 'cooking') {
        buttonsToRender = [allButtons.pot, allButtons.stats, allButtons.restart];
    } else if (currentScreen === 'pot') {
        buttonsToRender = [allButtons.addMore, allButtons.stats, allButtons.restart ];
    } else if (currentScreen === 'stats') {
        buttonsToRender = [allButtons.addMore, allButtons.pot, allButtons.restart];
    }

    // Die 3 ermittelten Buttons in das HTML einbauen
    buttonsToRender.forEach(btnConfig => {
        const button = document.createElement('button');
        button.innerText = btnConfig.text;
        button.className = `nav-action-btn ${btnConfig.class}`;
        button.addEventListener('click', btnConfig.action);
        navContainer.appendChild(button);
    });
}

const userAvatar = document.getElementById('userAvatar');

//Funktion zum Laden des Avatars

export function loadUserAvatar() {
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