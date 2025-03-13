// Elements
const totalCountElement = document.getElementById('totalCount');
const editButtonSelect = document.getElementById('editButtonSelect');
const buttonWordInput = document.getElementById('buttonWord');
const buttonCountInput = document.getElementById('buttonCount');
const createButton = document.getElementById('createButton');
const buttonContainer = document.getElementById('buttonContainer');

let buttons = [];
let totalCount = 0;

// Update total count
function updateTotalCount() {
    totalCountElement.textContent = totalCount;
}

// Create a new button
createButton.addEventListener('click', () => {
    const word = buttonWordInput.value.trim();
    const count = parseInt(buttonCountInput.value);

    if (word === '') {
        alert('Please enter a word.');
        return;
    }

    const newButton = {
        id: Date.now(),
        word,
        count,
    };

    buttons.push(newButton);
    totalCount += count;

    addButtonToDOM(newButton);
    updateEditOptions();
    updateTotalCount();

    buttonWordInput.value = '';
    buttonCountInput.value = '0';
});

// Add button to the DOM
function addButtonToDOM(button) {
    const buttonElement = document.createElement('div');
    buttonElement.classList.add('button');
    buttonElement.setAttribute('data-id', button.id);

    buttonElement.innerHTML = `
        ${button.word} <span class="count">${button.count}</span>
    `;

    buttonElement.addEventListener('click', () => incrementCount(button.id));
    buttonContainer.appendChild(buttonElement);
}

// Increment count on button click
function incrementCount(id) {
    const button = buttons.find(btn => btn.id === id);
    if (button) {
        button.count++;
        totalCount++;
        updateButtonDisplay(id);
        updateTotalCount();
    }
}

// Update button display after increment
function updateButtonDisplay(id) {
    const buttonElement = document.querySelector(`.button[data-id="${id}"] .count`);
    const button = buttons.find(btn => btn.id === id);
    if (buttonElement) {
        buttonElement.textContent = button.count;
    }
}

// Update edit options dropdown
function updateEditOptions() {
    editButtonSelect.innerHTML = '<option value="">Select a button to edit</option>';
    buttons.forEach(button => {
        const option = document.createElement('option');
        option.value = button.id;
        option.textContent = button.word;
        editButtonSelect.appendChild(option);
    });
}
