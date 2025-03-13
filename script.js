// Select elements
const totalCountEl = document.getElementById('totalCount');
const buttonTextEl = document.getElementById('buttonText');
const buttonCountEl = document.getElementById('buttonCount');
const createButtonEl = document.getElementById('createButton');
const buttonsContainer = document.getElementById('buttonsContainer');
const editButtonSelect = document.getElementById('editButtonSelect');

let totalCount = 0;
let buttons = [];

// Update total count display
function updateTotalCount() {
    totalCountEl.textContent = totalCount;
}

// Add button to the DOM
function addButtonToDOM(button) {
    const buttonElement = document.createElement('div');
    buttonElement.className = 'buttonItem';
    buttonElement.textContent = `${button.text} (${button.count})`;
    buttonElement.dataset.id = button.id;

    buttonElement.addEventListener('click', () => {
        button.count++;
        buttonElement.textContent = `${button.text} (${button.count})`;
        totalCount++;
        updateTotalCount();
    });

    buttonsContainer.appendChild(buttonElement);

    // Add to edit dropdown
    const option = document.createElement('option');
    option.value = button.id;
    option.textContent = button.text;
    editButtonSelect.appendChild(option);
}

// Create new button
createButtonEl.addEventListener('click', () => {
    const text = buttonTextEl.value.trim();
    const count = parseInt(buttonCountEl.value);

    if (text === '') {
        alert('Please enter a word for the button.');
        return;
    }

    const newButton = {
        id: Date.now().toString(),
        text: text,
        count: count
    };

    buttons.push(newButton);
    totalCount += count;
    addButtonToDOM(newButton);
    updateTotalCount();

    // Clear inputs
    buttonTextEl.value = '';
    buttonCountEl.value = '0';
});
