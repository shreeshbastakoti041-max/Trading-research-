// Renders the site from content.js. Edit content.js, not this file.
(function () {
  'use strict';
  var S = SITE, P = S.profile;
  var ARROW = '<svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true"><path d="M0 6h16M11 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';

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
  function rateClass(r) {
    r = (r || '').toLowerCase();
    return r === 'bullish' || r === 'buy' ? 'rate-bullish' : r === 'hold' ? 'rate-hold' : '';
  }
  function ext(url) { return /^https?:\/\//.test(url) ? ' target="_blank" rel="noopener"' : ''; }
  function set(id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; }
  var job = S.experience[0] || {};

  /* ---- profile band ---- */
  var h = '<div class="person">' + (P.headshot ? '<img src="' + esc(P.headshot) + '" alt="Portrait of ' + esc(P.name) + '" width="100" height="100">' : '<span></span>') +
    '<div><p class="statement">' + esc(P.lede) + '</p><p class="who"><b>' + esc(P.name) + '</b><span>' + esc(job.role || '') + ', ' + esc(job.firm || '') + '</span></p></div></div>';
  h += '<ul class="facts">';
  P.ledger.forEach(function (row) { h += '<li><b>' + esc(row[0]) + '</b><span>' + esc(row[1]) + '</span></li>'; });
  h += '</ul>';
  set('band', h);

  /* ---- report tiles, with context tiles placed between them ---- */
  function reportTile(r, i) {
    var u = upside(r);
    var t = '<article class="tile report" id="r-' + esc(String(r.ticker).toLowerCase()) + '"><p class="n" aria-hidden="true">' + (i + 1) + '</p>';
    t += '<h3>' + esc(r.company) + '</h3><p class="meta">' + esc(r.ticker) + ' · ' + esc(r.industry) + '</p>';
    t += '<p class="thesis">' + esc(r.summary) + '</p>';
    t += '<dl><dt>Rating</dt><dd class="' + rateClass(r.rating) + '">' + esc(r.rating || 'Not rated') + '</dd>' +
      '<dt>Price</dt><dd>' + money(r.price) + '</dd>' +
      '<dt>1-yr target</dt><dd>' + money(r.target) + '</dd>' +
      '<dt>Implied upside</dt><dd>' + pct(u) + '</dd>' +
      (r.fair ? '<dt>Fair value</dt><dd>' + esc(r.fair) + '</dd>' : '') + '</dl>';
    if (r.pdf) t += '<a class="go caps" href="' + esc(r.pdf) + '" data-pdf="' + esc(r.company) + '"' + ext(r.pdf) + '>Read report<span class="visually-hidden"> on ' + esc(r.company) + '</span> ' + ARROW + '</a>';
    return t + '</article>';
  }

  var tiles = S.reports.map(reportTile);
  set('tiles', tiles.join(''));

  /* ---- experience ---- */
  h = '';
  S.experience.forEach(function (j) {
    h += '<article class="role"><div class="top"><h3>' + esc(j.firm) + '</h3><span class="when">' + esc(j.dates) + ' · ' + esc(j.place) + '</span></div><p class="title caps">' + esc(j.role) + '</p><ol class="duties">';
    j.duties.forEach(function (d) { h += '<li><b>' + esc(d[0]) + '</b><span>' + esc(d[1]) + '</span></li>'; });
    h += '</ol></article>';
  });
  set('experience-body', h);

  /* ---- contact ---- */
  h = '';
  if (P.phone) h += '<li><b class="caps">Telephone</b><a href="tel:' + esc(P.phone.replace(/[^0-9+]/g, '')) + '">' + esc(P.phone) + '</a></li>';
  if (P.email) h += '<li><b class="caps">Email</b><a href="mailto:' + esc(P.email) + '">' + esc(P.email) + '</a></li>';
  if (P.linkedin) h += '<li><b class="caps">LinkedIn</b><a href="' + esc(P.linkedin) + '" target="_blank" rel="noopener">LinkedIn profile</a></li>';
  if (P.github) h += '<li><b class="caps">GitHub</b><a href="' + esc(P.github) + '" target="_blank" rel="noopener">' + esc(P.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')) + '</a></li>';
  h += '<li><b class="caps">Based in</b><span>' + esc(P.location) + '</span></li>';
  set('contact-list', h);
  set('footer-text', '<p>© ' + new Date().getFullYear() + ' ' + esc(P.name) + '</p><p>Student research for the Davis Student Investment Management Group. Not investment advice.</p>');
})();
