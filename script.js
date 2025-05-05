(() => {
  const page = window.location.pathname.split('/').pop();
  if (page !== 'login.html' && !localStorage.getItem('currentUser')) {
    window.location.href = 'login.html';
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // Helpers for user storage
  const loadUsers = () => JSON.parse(localStorage.getItem('users') || '[]');
  const saveUsers = users => localStorage.setItem('users', JSON.stringify(users));

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

  const book = document.getElementById('book');
  if (book) {
    // Create page indicator badge
    const indicator = document.createElement('div');
    indicator.id = 'page-indicator';
    Object.assign(indicator.style, {
      position: 'fixed',
      top: '60px',
      right: '10px',
      backgroundColor: 'rgba(255,255,255,0.8)',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '0.9em',
      color: '#333',
      zIndex: 9999
    });
    document.body.appendChild(indicator);

    const totalPages = 10;
    let currentPage = 1;

    book.querySelectorAll('.page').forEach((pageEl, idx) => {
      const num = idx + 1;
      pageEl.style.width = '50vw';
      const ta = pageEl.querySelector('.page-text');
      if (ta) {
        ta.value = localStorage.getItem(`page-${num}`) || '';
        ta.addEventListener('input', () => {
          localStorage.setItem(`page-${num}`, ta.value);
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

    book.style.width = `${totalPages * 50}vw`;

    document.getElementById('previous-page').addEventListener('click', () => {
      if (currentPage > 1) { currentPage--; updateBook(); }
    });
    document.getElementById('next-page').addEventListener('click', () => {
      if (currentPage < totalPages) { currentPage++; updateBook(); }
    });

    updateBook();

    function updateBook() {
      book.style.transform = `translateX(-${(currentPage - 1) * 50}vw)`;
      indicator.textContent = `Page ${currentPage} / ${totalPages}`;
      document.getElementById('previous-page').disabled = (currentPage === 1);
      document.getElementById('next-page').disabled = (currentPage === totalPages);
    }
  }
});

function saveSettings(e) {
  e.preventDefault();
  const u = document.getElementById('username').value;
  const em = document.getElementById('email').value;
  alert(`Settings saved! Username: ${u}, Email: ${em}`);
}

function applyAccessibility() {
  const dm = document.getElementById('dark-mode').checked;
  const fs = document.getElementById('font-size').checked;
  const hc = document.getElementById('high-contrast').checked;
  const sr = document.getElementById('screen-reader').checked;

  if (dm) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('dark-mode', 'enabled');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('dark-mode', 'disabled');
  }

  if (fs) {
    document.body.classList.add('large-font');
    localStorage.setItem('font-size', 'enabled');
  } else {
    document.body.classList.remove('large-font');
    localStorage.setItem('font-size', 'disabled');
  }

  if (hc) {
    document.body.classList.add('high-contrast');
    localStorage.setItem('high-contrast', 'enabled');
  } else {
    document.body.classList.remove('high-contrast');
    localStorage.setItem('high-contrast', 'disabled');
  }

  if (sr) {
    alert('Screen reader mode activated. (Placeholder.)');
    localStorage.setItem('screen-reader', 'enabled');
  } else {
    alert('Screen reader mode deactivated.');
    localStorage.setItem('screen-reader', 'disabled');
  }
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}
