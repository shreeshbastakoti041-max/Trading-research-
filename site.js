// Builds the page from content.js. You normally don't need to edit this file.
(function () {
  var S = SITE, p = S.profile;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function money(n) { var x = Number(n); return n !== '' && isFinite(x) && x ? '$' + x.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'; }
  function upside(r) { var a = Number(r.price), b = Number(r.target); return a && b ? (b - a) / a * 100 : null; }
  function cls(r) { r = (r || '').toLowerCase(); return r === 'buy' || r === 'hold' || r === 'sell' ? r : 'none'; }
  var parts = p.name.split(' '), last = parts.pop();

  document.title = p.name + ' | Portfolio';
  var h = '<div class="masthead">';
  h += '<header class="top"><div class="wrap"><a class="brand" href="#top">' + esc(parts.join(' ')) + ' <i>' + esc(last) + '</i></a><nav class="links"><a href="#experience">Experience</a><a href="#research">Research</a>' + (S.photos.length ? '<a href="#photos">Photos</a>' : '') + '<a href="#contact">Contact</a></nav></div></header>';
  h += '<div class="wrap" id="top"><div class="hero"><div><p class="eyebrow">' + esc(p.school) + (p.location ? ' · ' + esc(p.location) : '') + '</p><h1>' + esc(p.name) + '</h1><p class="headline">' + esc(p.headline) + '</p><p class="about">' + esc(p.about) + '</p>';
  h += '<div class="meta">' + (p.program ? '<span>' + esc(p.program) + '</span>' : '') + '<span>Defensive Sector Head</span><span>Equity Research</span></div></div>';
  if (p.headshot) h += '<img class="headshot" src="' + esc(p.headshot) + '" alt="Photo of ' + esc(p.name) + '">';
  h += '</div>';
  if (p.stats && p.stats.length) {
    h += '<div class="stats">';
    p.stats.forEach(function (s) { h += '<div class="stat"><b>' + esc(s.value) + '</b><span>' + esc(s.label) + '</span></div>'; });
    h += '</div>';
  }
  h += '</div></div>';

  h += '<main class="wrap">';
  h += '<section id="experience"><div class="sec-head"><div><p class="sec-kicker">Experience</p><h2>Where I work</h2></div></div><div class="jobs">';
  S.experience.forEach(function (j) {
    h += '<div class="job"><div class="when">' + esc(j.dates) + '</div><div><p class="firm">' + esc(j.firm) + (j.place ? ' <span>· ' + esc(j.place) + '</span>' : '') + '</p><p class="role">' + esc(j.role) + '</p><ul>';
    j.bullets.forEach(function (b) { h += '<li>' + esc(b) + '</li>'; });
    h += '</ul></div></div>';
  });
  h += '</div></section>';

  h += '<section id="research"><div class="sec-head"><div><p class="sec-kicker">Equity Research · ' + S.reports.length + ' reports</p><h2>Reports</h2><p class="sec-note">' + (p.researchNote ? esc(p.researchNote) + '. ' : '') + 'Click any report to read the full PDF.</p></div></div><div class="grid">';
  S.reports.forEach(function (r) {
    var u = upside(r), link = esc(r.pdf || '#');
    h += '<article class="card"><a class="cover" href="' + link + '" target="_blank" rel="noopener" aria-label="Open ' + esc(r.company) + ' report">' + (r.cover ? '<img src="' + esc(r.cover) + '" alt="First page of the ' + esc(r.company) + ' report" loading="lazy">' : '<div class="noimg">' + esc(r.ticker || 'PDF') + '</div>') + '</a>';
    h += '<div class="card-body"><div class="card-top"><div><p class="company">' + esc(r.company) + '</p><div class="ticker">' + esc(r.ticker) + (r.industry ? ' · ' + esc(r.industry) : '') + '</div></div><span class="pill ' + cls(r.rating) + '">' + esc(r.rating || 'Not rated') + '</span></div>';
    h += '<div class="figs"><div class="fig"><span>Price</span><b>' + money(r.price) + '</b></div><div class="fig"><span>1-yr target</span><b>' + money(r.target) + '</b></div><div class="fig"><span>Upside</span><b class="' + (u == null ? '' : u >= 0 ? 'up' : 'down') + '">' + (u == null ? '—' : (u >= 0 ? '+' : '') + u.toFixed(1) + '%') + '</b></div></div>';
    h += '<p class="summary">' + esc(r.summary) + '</p>';
    if (r.fair) h += '<p class="authors">Fair value estimate: ' + esc(r.fair) + '</p>';
    if (r.authors) h += '<p class="authors">' + esc(r.authors) + '</p>';
    h += '<div class="card-foot">' + (r.pdf ? '<a class="open" href="' + link + '" target="_blank" rel="noopener">Read the report →</a>' : '') + '</div></div></article>';
  });
  h += '</div></section>';

  if (S.photos.length) {
    h += '<section id="photos"><div class="sec-head"><div><p class="sec-kicker">Photos</p><h2>Around the fund</h2></div></div><div class="photos">';
    S.photos.forEach(function (ph) { h += '<figure class="photo"><img src="' + esc(ph.src) + '" alt="' + esc(ph.caption || 'Photo') + '" loading="lazy">' + (ph.caption ? '<figcaption>' + esc(ph.caption) + '</figcaption>' : '') + '</figure>'; });
    h += '</div></section>';
  }

  h += '<section id="contact"><div class="contact-band"><div><h2>Get in touch</h2><p>Open to internships in equity research, sales and trading, and asset management.</p></div><div class="contact">';
  if (p.phone) h += '<a href="tel:' + esc(p.phone.replace(/[^0-9+]/g, '')) + '">' + esc(p.phone) + '</a>';
  if (p.email) h += '<a class="ghost" href="mailto:' + esc(p.email) + '">' + esc(p.email) + '</a>';
  if (p.linkedin) h += '<a class="ghost" href="' + esc(p.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>';
  h += '</div></div></section></main><footer class="wrap">© ' + new Date().getFullYear() + ' ' + esc(p.name) + '</footer>';

  document.getElementById('root').innerHTML = h;
})();
