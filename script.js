// script.js - simple interactive behaviors

document.addEventListener('DOMContentLoaded', () => {
  // NAV TOGGLE
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // SMOOTH SCROLL for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav after click
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Reveal on scroll
  const revealElems = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const offset = window.innerHeight * 0.85;
    revealElems.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < offset) el.classList.add('visible');
    });
  };
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  // Animate skill bars once when visible
  const fills = document.querySelectorAll('.bar-fill');
  const animateBars = () => {
    fills.forEach(f => {
      const parent = f.closest('.section, .hero-left');
      if (!parent) return;
      const inView = parent.getBoundingClientRect().top < window.innerHeight * 0.85;
      if (inView && !f.dataset.animated) {
        f.style.width = f.dataset.fill || '70%';
        f.dataset.animated = 'true';
      }
    });
  };
  animateBars();
  window.addEventListener('scroll', animateBars);

  // Typed-like entrance for title (simple)
  const typed = document.getElementById('typed');
  if (typed) {
    const full = typed.textContent;
    typed.textContent = '';
    let i = 0;
    const t = setInterval(() => {
      typed.textContent += full.charAt(i++);
      if (i >= full.length) clearInterval(t);
    }, 18);
  }

  // Project modal
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalLink = document.getElementById('modal-link');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      modalTitle.textContent = card.dataset.title || 'Project';
      modalDesc.innerHTML = (card.dataset.desc || '').replace(/\n/g, '<br>');

      modalLink.href = card.dataset.link || '#';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  function closeModal(){
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Contact form -> open user's mail client (basic)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const subject = encodeURIComponent(document.getElementById('sub').value.trim() || 'Contact');
      const body = encodeURIComponent(document.getElementById('msg').value.trim() || '');
      if (!body) {
        alert('Please write a short message before sending.');
        return;
      }
      window.location = `mailto:abirhasanmahin228@gmail.com?subject=${subject}&body=${body}`;
    });
  }
  


  // Download CV button placeholder (openers)
  const dl = document.getElementById('download-cv');
  if (dl) {
    dl.addEventListener('click', (e) => {
      e.preventDefault();
      alert('To enable download, upload your CV (DOCX/PDF) to Google Drive/public host and replace the link in the HTML.');
    });
  }
});
