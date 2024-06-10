import words from './vocabulary.js';

const wordToTranslate = document.getElementById("word");
const translationInput = document.getElementById("translation");
const switchLanguageButton = document.getElementById("switch-language");
const vocabTable = document.querySelector(".not-guessed-words table tbody");

const sectionButtons = document.querySelectorAll('.section-button');
const x = 40; 

let activeSections = new Set();
window.wordList = [...words];
window.currentWordIndex = 0;
let fromFrenchToRomanian = true;

shuffleArray(wordList);
updateTranslationFields();



function updateTranslationFields() {
  if (currentWordIndex < wordList.length) {
    const [french, romanian, explanation] = wordList[currentWordIndex];
    wordToTranslate.value = fromFrenchToRomanian ? french : romanian.split(',')[0].trim();
    translationInput.value = "";

    document.getElementById("explanation").textContent = explanation;
  } else {
    currentWordIndex = 0;
    shuffleArray(wordList);
    updateTranslationFields();
  }
}

const langSwitch = document.querySelector('.language-container');
switchLanguageButton.addEventListener("click", () => {
  fromFrenchToRomanian = !fromFrenchToRomanian;
  langSwitch.style.flexDirection = fromFrenchToRomanian? "row" :"row-reverse";
  currentWordIndex++;
  updateTranslationFields();
  
});

function addToVocab(french, romanian) {
  const row = document.createElement("tr");
  row.innerHTML = `
      <td>${french}</td>
      <td style="position:relative">${romanian} <button class="close-button" onclick="removeFromVocab(this)">x</button></td>
  `;
  vocabTable.insertBefore(row, vocabTable.firstChild);
  currentWordIndex++;
  updateTranslationFields();
}

window.removeFromVocab = button => {
  const row = button.parentElement.parentElement;
  vocabTable.removeChild(row);
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function removeDiacritics(str) {
    const diacriticMap = {
        'ă': 'a',
        'â': 'a',
        'ș': 's',
        'ț': 't',
        'î': 'i',
        'é': 'e',
        'è': 'e',
        'à': 'a',
        'ù': 'u',
        'ç': 'c',
        'ê': 'e',
        'ô': 'o',
        'û': 'u'
    };

    return str.replace(/[ăâșțîéèàùçêôû]/g, match => diacriticMap[match] || match);
}

function isRomanianTranslationCorrect(userInput, romanianTranslation) {
    const userInputWithoutDiacritics = removeDiacritics(userInput);
    const romanianWords = romanianTranslation.split(',').map(word => removeDiacritics(word.trim().toLowerCase()));
    return romanianWords.includes(userInputWithoutDiacritics);
}

translationInput.addEventListener("input", () => {
    const userInput = translationInput.value.trim().toLowerCase();
    if (userInput.startsWith("/l")) {
        if (currentWordIndex < wordList.length) {
            const [french, romanian] = wordList[currentWordIndex];
            addToVocab(french, romanian);
        }
    }
    else if(userInput.startsWith("/s")){
      currentWordIndex++;
      updateTranslationFields();
    }
    else if (currentWordIndex < wordList.length) {
        
        const [french, romanian] = wordList[currentWordIndex];
        if (
            (fromFrenchToRomanian && isRomanianTranslationCorrect(userInput, romanian.toLowerCase())) ||
            (!fromFrenchToRomanian && removeDiacritics(userInput) === removeDiacritics(french.toLowerCase()))
        ) {
            currentWordIndex++;
            updateTranslationFields();
        }
    }
    else {
      currentWordIndex = 0;
      shuffleArray(wordList);
    }
});


function toggleActiveSection(section) {
  if (activeSections.has(section)) {
    activeSections.delete(section);
  } else {
    activeSections.add(section);
  }
  updateButtonStates();
  updateWordList();
}

// Function to update button states based on the activeSections Set
function updateButtonStates() {
  sectionButtons.forEach((button, index) => {
    if (activeSections.has(index + 1)) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

// Function to calculate the range for each section
function calculateWordRange(sectionNumber) {
  const totalWords = words.length;
  const sections = sectionButtons.length;
  const wordsPerSection = x;

  let start = (sectionNumber - 1) * wordsPerSection;
  let end = sectionNumber === sections ? totalWords : sectionNumber * wordsPerSection;
  if(end < start){
    start = 0;
    end = 1;
  }
  return [start, end];
}

// Function to update the wordList based on active sections
function updateWordList() {
  const newWordList = [];
  for (const section of activeSections) {
    const [start, end] = calculateWordRange(section);
    newWordList.push(...words.slice(start, end));
  }
  shuffleArray(newWordList);
  wordList = newWordList;
  currentWordIndex = 0; // Reset currentWordIndex when active sections change
  updateTranslationFields();
}

// Add click event listeners to the buttons
sectionButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    toggleActiveSection(index + 1);
  });
});

// Initialize with the first section active
for(let i = 1; i <= sectionButtons.length; i++){
  toggleActiveSection(i);
}
