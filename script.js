document.addEventListener('DOMContentLoaded', () => {
  const buttonContainer = document.getElementById('buttonContainer');
  const buttonSelect = document.getElementById('buttonSelect');
  const totalCountDisplay = document.getElementById('totalCount');
  const createForm = document.getElementById('createForm');
  const newWordInput = document.getElementById('newWord');
  const newCountInput = document.getElementById('newCount');
  const editForm = document.getElementById('editForm');
  const editWordInput = document.getElementById('editWord');
  const editCountInput = document.getElementById('editCount');
  const cancelEditBtn = document.getElementById('cancelEdit');

  let buttons = [];
  let totalCount = 0;

  // Update total count
  function updateTotalCount() {
    totalCountDisplay.textContent = totalCount;
  }

  // Render all buttons and populate dropdown
  function renderButtons() {
    buttonContainer.innerHTML = '';
    buttonSelect.innerHTML = '<option value="">Select a button to edit</option>';

    buttons.forEach((btn, index) => {
      const button = document.createElement('div');
      button.className = 'button';
      button.innerHTML = `
        <button class="btn btn-primary">
          ${btn.word} <span class="count">${btn.count}</span>
        </button>
      `;
      buttonContainer.appendChild(button);

      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${btn.word} (${btn.count})`;
      buttonSelect.appendChild(option);
    });

    updateTotalCount();
  }

  // Create a new button
  createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const word = newWordInput.value.trim();
    const count = parseInt(newCountInput.value.trim(), 10);

    if (word && !isNaN(count)) {
      buttons.push({ word, count });
      totalCount += count;
      newWordInput.value = '';
      newCountInput.value = '0';
      renderButtons();
    }
  });

  // Edit existing button
  buttonSelect.addEventListener('change', () => {
    const index = buttonSelect.value;
    if (index === '') {
      editForm.style.display = 'none';
      return;
    }

    const btn = buttons[index];
    editWordInput.value = btn.word;
    editCountInput.value = btn.count;
    editForm.style.display = 'block';

    editForm.onsubmit = (e) => {
      e.preventDefault();
      const newWord = editWordInput.value.trim();
      const newCount = parseInt(editCountInput.value.trim(), 10);

      if (newWord && !isNaN(newCount)) {
        totalCount = totalCount - btn.count + newCount;
        buttons[index] = { word: newWord, count: newCount };
        renderButtons();
        editForm.style.display = 'none';
      }
    };
  });

  // Cancel edit
  cancelEditBtn.addEventListener('click', () => {
    editForm.style.display = 'none';
  });

  renderButtons(); // Initial render
});
