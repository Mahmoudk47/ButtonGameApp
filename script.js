document.addEventListener('DOMContentLoaded', () => {
    const totalCountDisplay = document.getElementById('totalCount');
    const buttonContainer = document.getElementById('buttonContainer');
    const editButtonSelect = document.getElementById('editButtonSelect');
    const createButtonForm = document.getElementById('createButtonForm');
    const editButtonForm = document.getElementById('editButtonForm');

    let buttons = [];
    let totalCount = 0;
    let selectedButtonIndex = null;

    function updateTotalCount() {
        totalCount = buttons.reduce((sum, button) => sum + button.count, 0);
        totalCountDisplay.textContent = totalCount;
    }

    function renderButtons() {
        buttonContainer.innerHTML = '';
        editButtonSelect.innerHTML = '<option>Select a button to edit</option>';

        buttons.forEach((button, index) => {
            // Render main buttons
            const btn = document.createElement('button');
            btn.textContent = `${button.word} (${button.count})`;
            btn.addEventListener('click', () => {
                button.count++;
                renderButtons();
                updateTotalCount();
            });
            buttonContainer.appendChild(btn);

            // Populate edit dropdown
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${button.word} (${button.count})`;
            editButtonSelect.appendChild(option);
        });

        updateTotalCount();
    }

    document.getElementById('createButton').addEventListener('click', () => {
        const word = document.getElementById('newButtonWord').value;
        const count = parseInt(document.getElementById('newButtonCount').value);

        if (word) {
            buttons.push({ word, count });
            renderButtons();
            document.getElementById('newButtonWord').value = '';
            document.getElementById('newButtonCount').value = '0';
        }
    });

    editButtonSelect.addEventListener('change', () => {
        const selectedIndex = editButtonSelect.value;
        if (selectedIndex !== 'Select a button to edit') {
            selectedButtonIndex = parseInt(selectedIndex);
            const button = buttons[selectedButtonIndex];

            document.getElementById('editButtonWord').value = button.word;
            document.getElementById('editButtonCount').value = button.count;

            createButtonForm.style.display = 'none';
            editButtonForm.style.display = 'block';
        }
    });

    document.getElementById('updateButton').addEventListener('click', () => {
        const word = document.getElementById('editButtonWord').value;
        const count = parseInt(document.getElementById('editButtonCount').value);

        if (word && selectedButtonIndex !== null) {
            buttons[selectedButtonIndex].word = word;
            buttons[selectedButtonIndex].count = count;

            renderButtons();
            resetForms();
        }
    });

    document.getElementById('deleteButton').addEventListener('click', () => {
        if (selectedButtonIndex !== null) {
            buttons.splice(selectedButtonIndex, 1);
            renderButtons();
            resetForms();
        }
    });

    document.getElementById('cancelEditButton').addEventListener('click', resetForms);

    function resetForms() {
        createButtonForm.style.display = 'block';
        editButtonForm.style.display = 'none';
        selectedButtonIndex = null;
        editButtonSelect.value = 'Select a button to edit';
    }

    renderButtons();
});
