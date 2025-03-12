// Get references to DOM elements
const mainButton = document.getElementById('mainButton');
const totalCount = document.getElementById('totalCount');
const wordInput = document.getElementById('wordInput');
const numberInput = document.getElementById('numberInput');
const updateButton = document.getElementById('updateButton');

// Initialize count
let buttonCount = parseInt(mainButton.getAttribute('data-count'));
let total = buttonCount;
totalCount.textContent = total;

// Button click: decrement count
mainButton.addEventListener('click', () => {
    if (buttonCount > 0) {
        buttonCount--;
        total--;
        mainButton.innerHTML = `Button 1 <span>(${buttonCount})</span>`;
        totalCount.textContent = total;

        if (buttonCount === 0) {
            mainButton.style.backgroundColor = 'green';
        }
    }
});

// Update button details
updateButton.addEventListener('click', () => {
    const newWord = wordInput.value.trim();
    const newNumber = parseInt(numberInput.value);

    if (newWord) {
        mainButton.innerHTML = `${newWord} <span>(${newNumber})</span>`;
    }
    if (!isNaN(newNumber) && newNumber >= 0) {
        buttonCount = newNumber;
        total = newNumber; 
        totalCount.textContent = total;
    }

    wordInput.value = '';
    numberInput.value = '';
});
