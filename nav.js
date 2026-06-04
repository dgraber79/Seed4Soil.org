// Shared navigation HTML — injected into every page
(function() {
  const NAV_HTML = `
<header class="nav">
  <div class="container">
    <div class="nav__inner">
      <a class="nav__logo" href="index.html">
        <img class="nav__logo-img" src="images/logo.png" alt="Seed4Soil" />
        <span class="nav__logo-text">
          Seed<span class="nav__logo-accent">4</span>Soil
          <small>The Word Became Flesh</small>
        </span>
      </a>

      <nav>
        <ul class="nav__menu">

          <li class="nav__item">
            <a class="nav__link" href="index.html">Home</a>
          </li>

          <li class="nav__item">
            <a class="nav__link" href="index.html#parable">
              The Parable
              <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
            </a>
            <div class="nav__dropdown">
              <div class="nav__dropdown-label">Four Soil Types</div>
              <a href="wayside-soil.html">Wayside Soil</a>
              <a href="stony-soil.html">Stony Soil</a>
              <a href="thorny-soil.html">Thorny Soil</a>
              <a href="good-soil.html">Good Soil</a>
            </div>
          </li>

          <li class="nav__item">
            <a class="nav__link" href="strategies.html">
              Strategies
              <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
            </a>
            <div class="nav__dropdown">
              <div class="nav__dropdown-label">Bible Engagement Strategies</div>
              <a href="1-plant.html">1 · PLANT</a>
              <a href="2-hear.html">2 · HEAR</a>
              <a href="3-discover.html">3 · DISCOVER</a>
              <a href="4-space.html">4 · SPACE</a>
              <a href="5-trust.html">5 · TRUST</a>
            </div>
          </li>

          <li class="nav__item">
            <a class="nav__link" href="#">
              Resources
              <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
            </a>
            <div class="nav__dropdown">
              <div class="nav__dropdown-label">Articles &amp; Methods</div>
              <a href="testimonials.html">Testimonials</a>
              <a href="faq.html">Frequently Asked Questions</a>
              <a href="why-storytelling-dialogue.html">Why Storytelling &amp; Dialogue?</a>
              <a href="inductive-vs-deductive.html">Inductive vs. Deductive Bible Study</a>
              <a href="what-is-preaching.html">What is "Preaching?"</a>
              <a href="story-learning-strategies.html">Story Learning Strategies</a>
            </div>
          </li>

          <li class="nav__item">
            <a class="nav__link" href="trainings.html">
              Trainings
              <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
            </a>
            <div class="nav__dropdown">
              <div class="nav__dropdown-label">Word Engagement Training</div>
              <a href="strategies-1.html">STRATEGIES 1 - Training</a>
              <a href="strategies-2.html">STRATEGIES 2 - Training</a>
              <a href="leadership-strategies.html">Leadership STRATEGIES</a>
              <a href="7-strategies-oral.html">7 STRATEGIES for Oral Cultures</a>
            </div>
          </li>

        </ul>
      </nav>

      <div class="nav__cta">
        <a class="btn btn--primary btn--sm" href="#contact">Get in Touch</a>
      </div>

      <button class="nav__hamburger" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>`;

  const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer__inner">
      <div style="display:flex;align-items:center;gap:12px;">
        <img src="images/logo.png" alt="Seed4Soil" style="height:48px;width:48px;object-fit:contain;" />
        <div>
          <div class="footer__logo">Seed<span>4</span>Soil</div>
          <div class="footer__tagline">The Word Became Flesh · Bible Engagement &amp; Training</div>
        </div>
      </div>
      <ul class="footer__links">
        <li><a href="index.html">Home</a></li>
        <li><a href="wayside-soil.html">The Parable</a></li>
        <li><a href="strategies.html">Strategies</a></li>
        <li><a href="faq.html">Resources</a></li>
        <li><a href="trainings.html">Trainings</a></li>
      </ul>
      <div class="footer__contact">
        <a href="mailto:info@seed4soil.org">info@seed4soil.org</a>
      </div>
    </div>
  </div>
</footer>`;

  // Inject nav
  const navEl = document.getElementById('site-nav');
  if (navEl) navEl.outerHTML = NAV_HTML;

  // Inject footer
  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.outerHTML = FOOTER_HTML;

  // Sticky dropdown — keeps menu open while cursor moves from link to dropdown
  document.querySelectorAll('.nav__item').forEach(item => {
    let closeTimer = null;

    const open  = () => { clearTimeout(closeTimer); item.classList.add('is-open'); };
    const close = () => { closeTimer = setTimeout(() => item.classList.remove('is-open'), 300); };

    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', close);

    // Also keep open if cursor re-enters the dropdown itself
    const dropdown = item.querySelector('.nav__dropdown');
    if (dropdown) {
      dropdown.addEventListener('mouseenter', open);
      dropdown.addEventListener('mouseleave', close);
    }
  });

  // ── MOBILE DRAWER ─────────────────────────────────────────
  const DRAWER_HTML = `
<div id="nav-overlay" class="nav__overlay"></div>
<div id="nav-drawer" class="nav__drawer">
  <div class="nav__drawer-header">
    <a class="nav__drawer-logo" href="index.html">
      <img src="images/logo.png" alt="Seed4Soil" />
      <span class="nav__drawer-logo-text">
        Seed<span class="nav__logo-accent">4</span>Soil
        <small>The Word Became Flesh</small>
      </span>
    </a>
    <button id="nav-drawer-close" class="nav__drawer-close" aria-label="Close menu">×</button>
  </div>

  <nav class="nav__drawer-body">
    <a class="nav__drawer-link" href="index.html">Home</a>

    <div class="nav__drawer-group">
      <button class="nav__drawer-group-btn">
        The Parable
        <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
      </button>
      <div class="nav__drawer-sub">
        <div class="nav__drawer-sub-label">Four Soil Types</div>
        <a href="wayside-soil.html">Wayside Soil</a>
        <a href="stony-soil.html">Stony Soil</a>
        <a href="thorny-soil.html">Thorny Soil</a>
        <a href="good-soil.html">Good Soil</a>
      </div>
    </div>

    <div class="nav__drawer-group">
      <button class="nav__drawer-group-btn">
        Strategies
        <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
      </button>
      <div class="nav__drawer-sub">
        <div class="nav__drawer-sub-label">Bible Engagement Strategies</div>
        <a href="1-plant.html">1 · PLANT</a>
        <a href="2-hear.html">2 · HEAR</a>
        <a href="3-discover.html">3 · DISCOVER</a>
        <a href="4-space.html">4 · SPACE</a>
        <a href="5-trust.html">5 · TRUST</a>
      </div>
    </div>

    <div class="nav__drawer-group">
      <button class="nav__drawer-group-btn">
        Resources
        <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
      </button>
      <div class="nav__drawer-sub">
        <div class="nav__drawer-sub-label">Articles &amp; Methods</div>
        <a href="testimonials.html">Testimonials</a>
        <a href="faq.html">Frequently Asked Questions</a>
        <a href="why-storytelling-dialogue.html">Why Storytelling &amp; Dialogue?</a>
        <a href="inductive-vs-deductive.html">Inductive vs. Deductive Bible Study</a>
        <a href="what-is-preaching.html">What is "Preaching?"</a>
        <a href="story-learning-strategies.html">Story Learning Strategies</a>
      </div>
    </div>

    <div class="nav__drawer-divider"></div>

    <div class="nav__drawer-group">
      <button class="nav__drawer-group-btn">
        Trainings
        <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
      </button>
      <div class="nav__drawer-sub">
        <div class="nav__drawer-sub-label">Word Engagement Training</div>
        <a href="strategies-1.html">STRATEGIES 1 - Training</a>
        <a href="strategies-2.html">STRATEGIES 2 - Training</a>
        <a href="leadership-strategies.html">Leadership STRATEGIES</a>
        <a href="7-strategies-oral.html">7 STRATEGIES for Oral Cultures</a>
      </div>
    </div>
  </nav>

  <div class="nav__drawer-footer">
    <a class="btn btn--primary" href="#contact" style="width:100%;text-align:center;display:block;">Get in Touch</a>
  </div>
</div>`;

  // Inject drawer into page
  document.body.insertAdjacentHTML('beforeend', DRAWER_HTML);

  // References
  const overlay   = document.getElementById('nav-overlay');
  const drawer    = document.getElementById('nav-drawer');
  const closeBtn  = document.getElementById('nav-drawer-close');
  const hamburger = document.querySelector('.nav__hamburger');

  function openDrawer() {
    overlay.style.display = 'block';
    // Allow display:block to paint before transitioning opacity
    requestAnimationFrame(() => {
      overlay.classList.add('is-open');
      drawer.classList.add('is-open');
      hamburger && hamburger.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeDrawer() {
    overlay.classList.remove('is-open');
    drawer.classList.remove('is-open');
    hamburger && hamburger.classList.remove('is-open');
    document.body.style.overflow = '';
    // Hide overlay after fade-out
    setTimeout(() => { overlay.style.display = 'none'; }, 280);
  }

  hamburger && hamburger.addEventListener('click', openDrawer);
  closeBtn  && closeBtn.addEventListener('click', closeDrawer);
  overlay   && overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Accordion groups inside drawer
  document.querySelectorAll('.nav__drawer-group-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group  = btn.closest('.nav__drawer-group');
      const isOpen = group.classList.contains('is-open');
      // Close all others
      document.querySelectorAll('.nav__drawer-group').forEach(g => g.classList.remove('is-open'));
      if (!isOpen) group.classList.add('is-open');
    });
  });

  // Close drawer when a link inside it is clicked
  drawer && drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // FAQ accordion
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// ── GOOGLE ANALYTICS ──────────────────────────────────────────
(function() {
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-F8TM396Y6M';
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-F8TM396Y6M');
})();
