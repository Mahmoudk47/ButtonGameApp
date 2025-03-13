document.addEventListener('DOMContentLoaded', () => {
    const totalCountDisplay = document.getElementById('totalCount');
    const buttonContainer = document.getElementById('buttonContainer');
    const editButtonSelect = document.getElementById('editButtonSelect');
    const createButtonForm = document.getElementById('createButtonForm');
    const editButtonForm = document.getElementById('editButtonForm');

    let buttons = [];
    let totalCount = 0;
    let selectedButtonIndex = null;

    // Update total count
    function updateTotalCount() {
        totalCount = buttons.reduce((sum, button) => sum + button.count, 0);
        totalCountDisplay.textContent = totalCount;
    }

    // Render buttons & dropdown
    function renderButtons() {
        buttonContainer.innerHTML = '';
        editButtonSelect.innerHTML = '<option value="">Select a button to edit</option>';

        buttons.forEach((button, index) => {
            // Create buttons
            const btn = document.createElement('button');
            btn.textContent = `${button.word} (${button.count})`;
            btn.addEventListener('click', () => {
                button.count++;
                renderButtons();
                updateTotalCount();
            });
            buttonContainer.appendChild(btn);

            // Add to edit dropdown
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${button.word} (${button.count})`;
            editButtonSelect.appendChild(option);
        });

        updateTotalCount();
    }

    // Create new button
    document.getElementById('createButton').addEventListener('click', () => {
        const word = document.getElementById('newButtonWord').value.trim();
        const count = parseInt(document.getElementById('newButtonCount').value);

        if (word && !isNaN(count)) {
            buttons.push({ word, count });
            renderButtons();
            document.getElementById('newButtonWord').value = '';
            document.getElementById('newButtonCount').value = '0';
        }
    });

    // Edit button select
    editButtonSelect.addEventListener('change', () => {
        const selectedIndex = editButtonSelect.value;
        if (selectedIndex !== '') {
            selectedButtonIndex = parseInt(selectedIndex);
            const button = buttons[selectedButtonIndex];

            document.getElementById('editButtonWord').value = button.word;
            document.getElementById('editButtonCount').value = button.count;

            createButtonForm.classList.add('hidden');
            editButtonForm.classList.remove('hidden');
        }
    });

    // Update button
    document.getElementById('updateButton').addEventListener('click', () => {
        const word = document.getElementById('editButtonWord').value.trim();
        const count = parseInt(document.getElementById('editButtonCount').value);

        if (word && selectedButtonIndex !== null) {
            buttons[selectedButtonIndex].word = word;
            buttons[selectedButtonIndex].count = count;

            renderButtons();
            resetForms();
        }
    });

    // Delete button
    document.getElementById('deleteButton').addEventListener('click', () => {
        if (selectedButtonIndex !== null) {
            buttons.splice(selectedButtonIndex, 1);
            renderButtons();
            resetForms();
        }
    });

    // Cancel edit
    document.getElementById('cancelEditButton').addEventListener('click', resetForms);

    // Reset forms
    function resetForms() {
        createButtonForm.classList.remove('hidden');
        editButtonForm.classList.add('hidden');
        selectedButtonIndex = null;
        editButtonSelect.value = '';
    }

    renderButtons();
});
