function getTargetCharacter() {
    const VINGT_MINUTES = 20 * 60 * 1000;
    const timeIndex = Math.floor(Date.now() / VINGT_MINUTES);
    
    const characterIndex = timeIndex % personnages.length;
    return personnages[characterIndex];
}

const targetChar = getTargetCharacter();
console.log("🤫 Triche : La cible actuelle est", targetChar.nom);

const searchInput = document.getElementById("searchInput");
const autocompleteList = document.getElementById("autocomplete-list");
const guessesContainer = document.getElementById("guesses");

searchInput.addEventListener("input", function() {
    const val = this.value;
    autocompleteList.innerHTML = "";
    if (!val) return false;
    
    personnages.forEach(p => {
        if (p.nom.toLowerCase().includes(val.toLowerCase())) {
            const item = document.createElement("div");
            item.innerHTML = `<strong>${p.nom}</strong>`;
            
            item.addEventListener("click", function() {
                searchInput.value = "";
                autocompleteList.innerHTML = "";
                submitGuess(p);
            });
            autocompleteList.appendChild(item);
        }
    });
});

document.addEventListener("click", function (e) {
    if (e.target !== searchInput) {
        autocompleteList.innerHTML = "";
    }
});

function submitGuess(guess) {
    const row = document.createElement("div");
    row.className = "guess-row";

    row.appendChild(createCell(guess.nom, guess.nom === targetChar.nom));
    row.appendChild(createCell(guess.sexe, guess.sexe === targetChar.sexe));
    
    let ageText = guess.age;
    let isAgeCorrect = (guess.age === targetChar.age);
    if (!isAgeCorrect) {
        if (guess.age < targetChar.age) {
            ageText += " ⬆️";
        } else {
            ageText += " ⬇️";
        }
    }
    row.appendChild(createCell(ageText, isAgeCorrect));
    row.appendChild(createCell(guess.etude, guess.etude === targetChar.etude));
    row.appendChild(createCell(guess.situation, guess.situation === targetChar.situation));

    guessesContainer.prepend(row);

    if (guess.nom === targetChar.nom) {
        setTimeout(() => {
            alert("💖✨ BINGO BITCH ! Tu as trouvé " + targetChar.nom + " ! ✨💖");
        }, 100);
    }
}

function createCell(text, isCorrect) {
    const div = document.createElement("div");
    div.innerText = text;
    div.className = isCorrect ? "correct" : "incorrect";
    return div;
}