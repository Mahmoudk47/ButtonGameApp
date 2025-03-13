// Get elements
const buttonPicker = document.getElementById("buttonPicker");
const createButtonSection = document.getElementById("createButtonSection");
const editButtonSection = document.getElementById("editButtonSection");
const cancelEditButton = document.getElementById("cancelEditButton");

// Show Edit Section and hide Create Section when button is selected
buttonPicker.addEventListener("change", function() {
    if (buttonPicker.value !== "default") {
        createButtonSection.style.display = "none";
        editButtonSection.style.display = "block";
    }
});

// Show Create Section and hide Edit Section when cancel is clicked
cancelEditButton.addEventListener("click", function() {
    createButtonSection.style.display = "block";
    editButtonSection.style.display = "none";
    buttonPicker.value = "default"; // Reset dropdown
});
