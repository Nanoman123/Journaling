window.onload = function () {
    // Login simulation
    isLoggedIn = true;

    // Copyright setup
    const currentYear = new Date().getFullYear();
    const copyrightText = `© ${currentYear} Journaling. All rights reserved.`;
    const copyrightElement = document.getElementById("copyright");
    if (copyrightElement) {
        copyrightElement.textContent = copyrightText;
        // Make it smaller and move to bottom-left to avoid overlapping buttons
        Object.assign(copyrightElement.style, {
            fontSize: '0.7em',
            padding: '2px 5px',
            left: '10px',
            right: 'auto'
        });
    }

    // Page indicator badge
    const pageIndicator = document.createElement('div');
    pageIndicator.id = 'page-indicator';
    Object.assign(pageIndicator.style, {
        position: 'fixed',
        top: '10px',
        right: '10px',
        backgroundColor: 'rgba(255,255,255,0.7)',
        padding: '5px',
        borderRadius: '5px',
        fontSize: '1em',
        color: '#333',
        zIndex: '1000'
    });
    document.body.appendChild(pageIndicator);

    // Initialize paging
    const book = document.getElementById("book");
    const totalPages = 10;           // Total number of journal pages
    window.currentPage = 1;
    window.totalPages = totalPages;

    // Setup existing page elements and storage
    document.querySelectorAll('.page').forEach((page, index) => {
        const pageNum = index + 1;
        page.style.width = '50vw';

        const ta = page.querySelector('.page-text');
        if (ta) {
            // Load saved text if available
            const saved = localStorage.getItem(`page-${pageNum}`) || '';
            ta.value = saved;

            // Save on input
            ta.addEventListener('input', () => {
                localStorage.setItem(`page-${pageNum}`, ta.value);
            });
        }
    });

    // Dynamically add empty pages 3–10
    for (let i = 3; i <= totalPages; i++) {
        if (document.getElementById(`page${i}`)) continue;
        const pageDiv = document.createElement('div');
        pageDiv.className = 'page';
        pageDiv.id = `page${i}`;
        pageDiv.style.width = '50vw';

        const textarea = document.createElement('textarea');
        textarea.className = 'page-text';
        textarea.placeholder = 'Write your thoughts here...';

        // Load any saved content
        const saved = localStorage.getItem(`page-${i}`) || '';
        textarea.value = saved;
        textarea.addEventListener('input', () => {
            localStorage.setItem(`page-${i}`, textarea.value);
        });

        pageDiv.appendChild(textarea);
        book.appendChild(pageDiv);
    }

    // Set book width to fit all pages
    book.style.width = `${totalPages * 50}vw`;

    // Page navigation controls
    document.getElementById("next-page").addEventListener('click', () => {
        if (window.currentPage < window.totalPages) {
            window.currentPage++;
            updateBook();
        }
    });
    document.getElementById("previous-page").addEventListener('click', () => {
        if (window.currentPage > 1) {
            window.currentPage--;
            updateBook();
        }
    });

    // Initial positioning and page number
    updateBook();
};

function updateBook() {
    const book = document.getElementById("book");
    // Shift by 50vw per page number
    book.style.transform = `translateX(-${(window.currentPage - 1) * 50}vw)`;

    // Update page indicator
    const indicator = document.getElementById("page-indicator");
    if (indicator) {
        indicator.textContent = `Page ${window.currentPage} / ${window.totalPages}`;
    }
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
