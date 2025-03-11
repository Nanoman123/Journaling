// Simulated login state
let isLoggedIn = false;

// Show journal entry form
function showJournal() {
    if (!isLoggedIn) {
        alert("Please log in to access the journal.");
        return;
    }
    document.getElementById('journal').style.display = 'block';
    document.getElementById('saved-entries').style.display = 'block';
}

// Log out function
function logout() {
    isLoggedIn = false;
    alert("You have logged out.");
}

// Save journal entry
function saveEntry() {
    const entryText = document.getElementById('journal-text').value;
    if (entryText.trim() === "") {
        alert("Please write something in the journal.");
        return;
    }
    const entryList = document.getElementById('entries-list');
    const entryItem = document.createElement('div');
    entryItem.classList.add('journal-entry');
    entryItem.textContent = entryText;
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        deleteEntry(entryItem);
    };
    entryItem.appendChild(deleteButton);
    entryList.appendChild(entryItem);
    document.getElementById('journal-text').value = '';
}

// Delete journal entry
function deleteEntry(entryItem) {
    entryItem.remove();
}

// Simulate login function (for testing)
window.onload = function() {
    isLoggedIn = true;
};
