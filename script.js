(() => {
  const page = window.location.pathname.split('/').pop();
  if (page !== 'login.html' && !localStorage.getItem('currentUser')) {
    window.location.href = 'login.html';
  }
})();

window.onload = function () {
  // Copyright setup
  const year = new Date().getFullYear();
  const cText = `© ${year} Journaling. All rights reserved.`;
  const cElem = document.getElementById("copyright");
  if (cElem) {
    cElem.textContent = cText;
    Object.assign(cElem.style, {
      fontSize: '0.7em',
      padding: '2px 5px',
      left: '10px',
      right: 'auto'
    });
  }

  // Page indicator (only useful on index.html)
  const book = document.getElementById("book");
  if (book) {
    const indicator = document.createElement('div');
    indicator.id = 'page-indicator';
    Object.assign(indicator.style, {
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
    document.body.appendChild(indicator);

    // Initialize paging
    const totalPages = 10;
    window.currentPage = 1;
    window.totalPages = totalPages;

    // Set up existing pages 1–2
    document.querySelectorAll('.page').forEach((pageEl, idx) => {
      const pNum = idx + 1;
      pageEl.style.width = '50vw';
      const ta = pageEl.querySelector('.page-text');
      if (ta) {
        ta.value = localStorage.getItem(`page-${pNum}`) || '';
        ta.addEventListener('input', () => {
          localStorage.setItem(`page-${pNum}`, ta.value);
        });
      }
    });

    // Clone pages 3–10
    for (let i = 3; i <= totalPages; i++) {
      if (document.getElementById(`page${i}`)) continue;
      const div = document.createElement('div');
      div.className = 'page';
      div.id = `page${i}`;
      div.style.width = '50vw';
      const ta = document.createElement('textarea');
      ta.className = 'page-text';
      ta.placeholder = 'Write your thoughts here...';
      ta.value = localStorage.getItem(`page-${i}`) || '';
      ta.addEventListener('input', () => {
        localStorage.setItem(`page-${i}`, ta.value);
      });
      div.appendChild(ta);
      book.appendChild(div);
    }

    // Fit book width
    book.style.width = `${totalPages * 50}vw`;

    // Button handlers
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

    // Initial render
    updateBook();
  }

  // Accessibility settings load from localStorage
  const dm = localStorage.getItem("dark-mode");
  if (dm === "enabled") document.body.classList.add("dark-mode");
  const fs = localStorage.getItem("font-size");
  if (fs === "enabled") document.body.classList.add("large-font");
  const hc = localStorage.getItem("high-contrast");
  if (hc === "enabled") document.body.classList.add("high-contrast");
};

function updateBook() {
  const book = document.getElementById("book");
  book.style.transform = `translateX(-${(window.currentPage - 1) * 50}vw)`;
  document.getElementById("previous-page").disabled = (window.currentPage === 1);
  document.getElementById("next-page").disabled     = (window.currentPage === window.totalPages);
}

function saveSettings(event) {
  event.preventDefault();
  const u = document.getElementById('username').value;
  const e = document.getElementById('email').value;
  alert(`Settings saved! Username: ${u}, Email: ${e}`);
}

function applyAccessibility() {
  const dm = document.getElementById("dark-mode").checked;
  const fs = document.getElementById("font-size").checked;
  const hc = document.getElementById("high-contrast").checked;
  const sr = document.getElementById("screen-reader").checked;

  if (dm) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "enabled");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "disabled");
  }

  if (fs) {
    document.body.classList.add("large-font");
    localStorage.setItem("font-size", "enabled");
  } else {
    document.body.classList.remove("large-font");
    localStorage.setItem("font-size", "disabled");
  }

  if (hc) {
    document.body.classList.add("high-contrast");
    localStorage.setItem("high-contrast", "enabled");
  } else {
    document.body.classList.remove("high-contrast");
    localStorage.setItem("high-contrast", "disabled");
  }

  if (sr) {
    alert("Screen reader mode activated. (Placeholder feature.)");
    localStorage.setItem("screen-reader", "enabled");
  } else {
    alert("Screen reader mode deactivated.");
    localStorage.setItem("screen-reader", "disabled");
  }
}

  document.addEventListener('DOMContentLoaded', () => {
  const loadUsers = () => JSON.parse(localStorage.getItem('users') || '[]');
  const saveUsers = users => localStorage.setItem('users', JSON.stringify(users));

  // Sign-Up (auto-login on success)
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', e => {
      e.preventDefault();
      const u   = signupForm.username.value.trim();
      const em  = signupForm.email.value.trim();
      const p1  = signupForm.password.value;
      const p2  = signupForm.password2.value;
      if (p1 !== p2) return alert('Passwords do not match.');
      const users = loadUsers();
      if (users.find(x => x.username === u)) return alert('Username already exists.');
      users.push({ username: u, email: em, password: p1 });
      saveUsers(users);
      localStorage.setItem('currentUser', u);
      window.location.href = 'index.html';
    });
  }

  // Sign-In
  const signinForm = document.getElementById('signin-form');
  if (signinForm) {
    signinForm.addEventListener('submit', e => {
      e.preventDefault();
      const u  = signinForm.username.value.trim();
      const pw = signinForm.password.value;
      const users = loadUsers();
      if (!users.find(x => x.username === u && x.password === pw)) {
        return alert('Invalid username or password.');
      }
      localStorage.setItem('currentUser', u);
      window.location.href = 'index.html';
    });
  }

  // Feedback form
  const fb = document.getElementById('feedback-form');
  if (fb) {
    fb.addEventListener('submit', function(e) {
      e.preventDefault();
      const txt = this.feedback.value.trim();
      if (!txt) return alert('Please enter your feedback.');
      alert('Thanks for your feedback:\n\n' + txt);
      this.reset();
    });
  }
});

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

