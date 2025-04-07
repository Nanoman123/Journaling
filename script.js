// Homepage
let isLoggedIn = false;

// Log out function
function logout() {
    isLoggedIn = false;
    alert("You have logged out.");
}

// Simulate login function (for testing)
window.onload = function() {
    isLoggedIn = true;
};

// Book Pages Navigation
let currentPage = 1;
const totalPages = 2;

document.getElementById("next-page").addEventListener("click", function() {
    if (currentPage < totalPages) {
        currentPage++;
        updateBook();
    }
});

document.getElementById("previous-page").addEventListener("click", function() {
    if (currentPage > 1) {
        currentPage--;
        updateBook();
    }
});

function updateBook() {
    const book = document.getElementById("book");
    book.style.transform = `translateX(-${(currentPage - 1) * 50}%)`;
}

// Save Settings Function
function saveSettings(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    alert(`Settings saved! Username: ${username}, Email: ${email}`);
}

// Accessibility settings function
function applyAccessibility() {
    const darkModeCheckbox = document.getElementById("dark-mode");
    const fontSizeCheckbox = document.getElementById("font-size");
    const highContrastCheckbox = document.getElementById("high-contrast");
    const screenReaderCheckbox = document.getElementById("screen-reader");

    // Toggle the classes on the body
    if (darkModeCheckbox.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("dark-mode", "enabled");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("dark-mode", "disabled");
    }

    if (fontSizeCheckbox.checked) {
        document.body.classList.add("large-font");
        localStorage.setItem("font-size", "enabled");
    } else {
        document.body.classList.remove("large-font");
        localStorage.setItem("font-size", "disabled");
    }

    if (highContrastCheckbox.checked) {
        document.body.classList.add("high-contrast");
        localStorage.setItem("high-contrast", "enabled");
    } else {
        document.body.classList.remove("high-contrast");
        localStorage.setItem("high-contrast", "disabled");
    }

    //not working just a simulation
    if (screenReaderCheckbox.checked) {
        alert("Screen reader mode activated. (This is a placeholder feature.)");
        localStorage.setItem("screen-reader", "enabled");
    } else {
        alert("Screen reader mode deactivated.");
        localStorage.setItem("screen-reader", "disabled");
    }
}

