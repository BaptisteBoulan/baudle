// app.js

// 1. Déterminer le personnage du moment (Change toutes les 20 minutes)
function getTargetCharacter() {
    const VINGT_MINUTES = 20 * 60 * 1000; // en millisecondes
    const timeIndex = Math.floor(Date.now() / VINGT_MINUTES);
    
    // On utilise le modulo pour boucler sur le tableau
    const characterIndex = timeIndex % personnages.length;
    return personnages[characterIndex];
}

const targetChar = getTargetCharacter();
console.log("🤫 Triche : La cible actuelle est", targetChar.nom);

// 2. Gestion des éléments HTML
const searchInput = document.getElementById("searchInput");
const autocompleteList = document.getElementById("autocomplete-list");
const guessesContainer = document.getElementById("guesses");

// 3. Autocomplétion de la barre de recherche
searchInput.addEventListener("input", function() {
    const val = this.value;
    autocompleteList.innerHTML = "";
    if (!val) return false;
    
    personnages.forEach(p => {
        // Si le nom contient ce qui est tapé
        if (p.nom.toLowerCase().includes(val.toLowerCase())) {
            const item = document.createElement("div");
            item.innerHTML = `<strong>${p.nom}</strong>`;
            
            item.addEventListener("click", function() {
                searchInput.value = "";
                autocompleteList.innerHTML = "";
                submitGuess(p); // On valide le choix
            });
            autocompleteList.appendChild(item);
        }
    });
});

// Fermer la liste si on clique ailleurs
document.addEventListener("click", function (e) {
    if (e.target !== searchInput) {
        autocompleteList.innerHTML = "";
    }
});

// 4. Logique de vérification d'une proposition
function submitGuess(guess) {
    const row = document.createElement("div");
    row.className = "guess-row";

    // NOM
    row.appendChild(createCell(guess.nom, guess.nom === targetChar.nom));
    
    // SEXE
    row.appendChild(createCell(guess.sexe, guess.sexe === targetChar.sexe));
    
    // AGE (avec flèches)
    let ageText = guess.age;
    let isAgeCorrect = (guess.age === targetChar.age);
    if (!isAgeCorrect) {
        // Si l'âge proposé est inférieur à la cible, flèche vers le haut
        if (guess.age < targetChar.age) {
            ageText += " ⬆️";
        } else {
            ageText += " ⬇️";
        }
    }
    row.appendChild(createCell(ageText, isAgeCorrect));
    
    // ETUDE
    row.appendChild(createCell(guess.etude, guess.etude === targetChar.etude));
    
    // SITUATION
    row.appendChild(createCell(guess.situation, guess.situation === targetChar.situation));

    // Ajoute la ligne tout en haut des réponses
    guessesContainer.prepend(row);

    // Victoire
    if (guess.nom === targetChar.nom) {
        setTimeout(() => {
            alert("💖✨ BINGO BITCH ! Tu as trouvé " + targetChar.nom + " ! ✨💖");
        }, 100);
    }
}

// Fonction utilitaire pour créer les cases Cyan / Rouge
function createCell(text, isCorrect) {
    const div = document.createElement("div");
    div.innerText = text;
    div.className = isCorrect ? "correct" : "incorrect";
    return div;
}