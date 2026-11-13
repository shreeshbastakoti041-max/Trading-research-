// Renders the site from content.js. Edit content.js, not this file.
(function () {
  'use strict';
  var S = SITE, P = S.profile;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function money(n) {
    var x = Number(n);
    return n !== '' && isFinite(x) && x ? '$' + x.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—';
  }
  function upside(r) { var a = Number(r.price), b = Number(r.target); return a && b ? (b / a - 1) * 100 : null; }
  function pct(u) { return u == null ? '—' : (u >= 0 ? '+' : '−') + Math.abs(u).toFixed(1) + '%'; }
  function ratingKey(r) {
    r = (r || '').toLowerCase();
    if (r === 'bullish' || r === 'buy') return 'bullish';
    if (r === 'bearish' || r === 'sell') return 'bearish';
    if (r === 'hold') return 'hold';
    return 'none';
  }
  function ext(url) { return /^https?:\/\//.test(url) ? ' target="_blank" rel="noopener"' : ''; }
  function slug(t) { return 'r-' + String(t).toLowerCase().replace(/[^a-z0-9]+/g, ''); }
  function set(id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; }

  /* ---- profile ---- */
  var h = '<div class="profile"><div><p class="label">' + esc(P.focus) + '</p><h1>' + esc(P.name) + '</h1><p class="lede">' + esc(P.lede) + '</p><dl class="ledger">';
  P.ledger.forEach(function (row) { h += '<div><dt>' + esc(row[0]) + '</dt><dd>' + esc(row[1]) + '</dd></div>'; });
  h += '</dl></div>';
  if (P.headshot) h += '<figure class="portrait"><div class="frame"><img src="' + esc(P.headshot) + '" alt="Portrait of ' + esc(P.name) + '" width="480" height="600"></div><figcaption><span>' + esc(P.name) + '</span><span>' + esc(P.location) + '</span></figcaption></figure>';
  h += '</div>';
  set('profile', h);

  /* ---- coverage strip ---- */
  h = '<ol aria-label="Coverage"><li>Coverage</li>';
  S.reports.forEach(function (r) {
    h += '<li><a href="#' + slug(r.ticker) + '"><b>' + esc(r.ticker) + '</b><span class="r">' + esc(r.rating || 'Not rated') + '</span><span class="u">' + pct(upside(r)) + '</span></a></li>';
  });
  set('strip', h + '</ol>');

  /* ---- experience ---- */
  h = '';
  S.experience.forEach(function (j) {
    h += '<article><header class="role-head"><h3>' + esc(j.firm) + '</h3><span class="dates">' + esc(j.dates) + '</span><span class="where">' + esc(j.place) + '</span></header>';
    h += '<p class="role-title">' + esc(j.role) + '</p>';
    if (j.figures && j.figures.length) {
      h += '<div class="figures">';
      j.figures.forEach(function (f) { h += '<div><b>' + esc(f[0]) + '</b><span>' + esc(f[1]) + '</span></div>'; });
      h += '</div>';
    }
    h += '<dl class="duties">';
    j.duties.forEach(function (d) { h += '<div><dt>' + esc(d[0]) + '</dt><dd>' + esc(d[1]) + '</dd></div>'; });
    h += '</dl></article>';
  });
  set('experience-body', h);

  /* ---- research library ---- */
  var order = S.reports.map(function (_, i) { return i; });
  var counts = {};
  S.reports.forEach(function (r) { var k = r.rating || 'Not rated'; counts[k] = (counts[k] || 0) + 1; });
  var countText = Object.keys(counts).map(function (k) { return '<i>' + counts[k] + '</i> ' + esc(k); }).join(' · ');

  function libraryRows() {
    return order.map(function (i) {
      var r = S.reports[i], u = upside(r), k = ratingKey(r.rating);
      var pdf = esc(r.pdf || '');
      var row = '<tr id="' + slug(r.ticker) + '">';
      row += '<td class="c-thumb">' + (r.cover && r.pdf ? '<a class="thumb" href="' + pdf + '" data-pdf="' + esc(r.company) + '"' + ext(r.pdf) + ' tabindex="-1" aria-hidden="true"><img src="' + esc(r.cover) + '" alt=""></a>' : '') + '</td>';
      row += '<td class="c-co"><div class="co"><b>' + esc(r.company) + '</b><span class="tk">' + esc(r.ticker) + '</span></div><div class="ind">' + esc(r.industry) + '</div><p class="thesis">' + esc(r.summary) + '</p>' + (r.authors ? '<p class="by">' + esc(r.authors) + '</p>' : '') + (r.pdf ? '<a class="open" href="' + pdf + '" data-pdf="' + esc(r.company) + '"' + ext(r.pdf) + '>Read the report<span class="visually-hidden"> on ' + esc(r.company) + '</span> <span aria-hidden="true">↗</span></a>' : '') + '</td>';
      row += '<td class="c-rating"><span class="rating ' + k + '">' + esc(r.rating || 'Not rated') + '</span></td>';
      row += '<td class="num" data-label="Price">' + money(r.price) + '</td>';
      row += '<td class="num" data-label="1-yr target">' + money(r.target) + (r.fair ? '<span class="fvline">Fair value ' + esc(r.fair) + '</span>' : '') + '</td>';
      row += '<td class="num ' + (u == null ? '' : u >= 0 ? 'up' : 'dn') + '" data-label="Implied upside">' + pct(u) + '</td>';
      return row + '</tr>';
    }).join('');
  }

  h = '<div class="lib-head"><span class="counts">' + S.reports.length + ' reports · ' + countText + '</span><div class="sort" role="group" aria-label="Sort reports"><span>Sort</span>' +
    '<button type="button" data-sort="default" aria-pressed="true">Default</button>' +
    '<button type="button" data-sort="upside" aria-pressed="false">Upside</button>' +
    '<button type="button" data-sort="company" aria-pressed="false">Company</button></div></div>';
  h += '<table class="library"><caption class="visually-hidden">Equity research reports with rating, price, target and implied upside</caption><thead><tr><th scope="col"><span class="visually-hidden">Preview</span></th><th scope="col">Company</th><th scope="col">Rating</th><th scope="col" class="num">Price</th><th scope="col" class="num">1-yr target / fair value</th><th scope="col" class="num">Upside</th></tr></thead><tbody id="library-rows">' + libraryRows() + '</tbody></table>';
  h += '<p class="lib-note">Price is the share price at the time of each report. Implied upside = one-year price target ÷ price − 1. Fair value is the estimate cited in the report. Reports are student research written for the Davis Student Investment Management Group.</p>';
  set('research-body', h);

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-sort]');
    if (!b) return;
    var mode = b.getAttribute('data-sort');
    order = S.reports.map(function (_, i) { return i; });
    if (mode === 'upside') order.sort(function (a, c) { return (upside(S.reports[c]) || -1e9) - (upside(S.reports[a]) || -1e9); });
    if (mode === 'company') order.sort(function (a, c) { return S.reports[a].company.localeCompare(S.reports[c].company); });
    document.querySelectorAll('[data-sort]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    document.getElementById('library-rows').innerHTML = libraryRows();
  });

  /* ---- quantitative research ---- */
  h = '';
  (S.research || []).forEach(function (p) {
    h += '<article class="paper"><div class="paper-meta"><b>Working paper</b><span>' + esc(p.venue) + '</span><span>' + esc(p.year) + '</span></div>';
    h += '<h3>' + esc(p.title) + '</h3><p class="abstract">' + esc(p.abstract) + '</p>';
    if (p.data) {
      h += '<dl class="specs">';
      p.data.forEach(function (d) { h += '<div><dt>' + esc(d[0]) + '</dt><dd>' + esc(d[1]) + '</dd></div>'; });
      h += '</dl>';
    }
    if (p.method) {
      h += '<ol class="method" aria-label="Method">';
      p.method.forEach(function (m) { h += '<li><b>' + esc(m[0]) + '</b><span>' + esc(m[1]) + '</span></li>'; });
      h += '</ol>';
    }
    h += '<div class="exhibits">';
    if (p.transitions) {
      var T = p.transitions;
      h += '<figure class="exhibit"><figcaption><span class="label">Exhibit 1</span>Bayesian transition matrix and expected regime duration</figcaption><table><thead><tr><th scope="col">From \\ To</th>';
      T.labels.forEach(function (l) { h += '<th scope="col">' + esc(l.replace(' Vol', '')) + '</th>'; });
      h += '<th scope="col">Days</th></tr></thead><tbody>';
      T.matrix.forEach(function (row, i) {
        h += '<tr><td style="font-family:var(--font-body);font-size:13.5px">' + esc(T.labels[i]) + '</td>';
        row.forEach(function (v) { h += '<td class="cell" style="--a:' + (0.05 + v * 0.22).toFixed(3) + '"><span>' + v.toFixed(3) + '</span></td>'; });
        h += '<td>' + T.duration[i].toFixed(1) + '</td></tr>';
      });
      h += '</tbody></table><p class="src">Daily SPY, 2004–2024 training sample. Days = expected time in a regime before it changes, 1 ÷ (1 − persistence).</p></figure>';
    }
    if (p.events) {
      h += '<figure class="exhibit"><figcaption><span class="label">Exhibit 2</span>Share of trading days in each regime during known stress periods</figcaption><table><thead><tr><th scope="col">Event</th><th scope="col">Days</th><th scope="col">Low</th><th scope="col">Med</th><th scope="col">High</th></tr></thead><tbody>';
      p.events.forEach(function (ev) {
        var mx = Math.max(ev[2], ev[3], ev[4]);
        h += '<tr><td style="font-family:var(--font-body);font-size:13.5px">' + esc(ev[0]) + '</td><td>' + ev[1] + '</td>';
        [ev[2], ev[3], ev[4]].forEach(function (v) { h += '<td' + (v === mx ? ' style="color:var(--text);font-weight:600"' : ' style="color:var(--muted)"') + '>' + v.toFixed(1) + '%</td>'; });
        h += '</tr>';
      });
      h += '</tbody></table><p class="src">The model was not given the event dates; most crisis days fall in the medium and high volatility regimes.</p></figure>';
    }
    h += '</div>';
    if (p.links) {
      h += '<div class="paper-links">';
      p.links.forEach(function (l) { h += '<a href="' + esc(l[1]) + '" target="_blank" rel="noopener">' + esc(l[0]) + '</a>'; });
      h += '</div>';
    }
    h += '</article>';
  });
  set('quant-body', h);

  /* ---- contact ---- */
  h = '<dl>';
  if (P.phone) h += '<div><dt>Telephone</dt><dd><a href="tel:' + esc(P.phone.replace(/[^0-9+]/g, '')) + '">' + esc(P.phone) + '</a></dd></div>';
  if (P.email) h += '<div><dt>Email</dt><dd><a href="mailto:' + esc(P.email) + '">' + esc(P.email) + '</a></dd></div>';
  if (P.linkedin) h += '<div><dt>LinkedIn</dt><dd><a href="' + esc(P.linkedin) + '" target="_blank" rel="noopener">' + esc(P.linkedin.replace(/^https?:\/\/(www\.)?/, '')) + '</a></dd></div>';
  if (P.github) h += '<div><dt>GitHub</dt><dd><a href="' + esc(P.github) + '" target="_blank" rel="noopener">' + esc(P.github.replace(/^https?:\/\//, '')) + '</a></dd></div>';
  h += '<div><dt>Based in</dt><dd>' + esc(P.location) + '</dd></div></dl>';
  set('contact-body', h);
  set('footer-text', '<p>© ' + new Date().getFullYear() + ' ' + esc(P.name) + '. Research on this site is student work and is not investment advice.</p>');

  /* ---- navigation: mobile menu and current section ---- */
  var btn = document.querySelector('.menu-btn'), list = document.getElementById('nav-list');
  if (btn) btn.addEventListener('click', function () {
    var open = list.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  list.addEventListener('click', function (e) { if (e.target.closest('a') && btn) { list.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
  if ('IntersectionObserver' in window) {
    var links = {};
    list.querySelectorAll('a.link').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && links[en.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].removeAttribute('aria-current'); });
          links[en.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }
})();
