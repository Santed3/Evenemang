(function () {
  'use strict';
  // Publiceringsbar nyckel (anon/publishable). Åtkomst styrs av radnivåsäkerhet (RLS) i Supabase.
  var SB_URL = 'https://sxacyaureudlvijiykqx.supabase.co';
  var SB_KEY = 'sb_publishable_VYR2RqOXoKEUykzd3o1D1Q_wtQ0wU8v';
  var TZ = 'Europe/Stockholm';
  var WD = { Sun: 'Sön', Mon: 'Mån', Tue: 'Tis', Wed: 'Ons', Thu: 'Tors', Fri: 'Fre', Sat: 'Lör' };
  var MON = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  var fmt = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'short', hourCycle: 'h23' });
  var SK = 'kvitt_saved';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function color(c, fallback) {
    return /^#[0-9a-fA-F]{3,8}$/.test(c || '') ? c : fallback;
  }
  function parts(date) {
    var o = {};
    fmt.formatToParts(date).forEach(function (p) { o[p.type] = p.value; });
    var y = +o.year, m = +o.month, d = +o.day;
    return { y: y, m: m, d: d, hh: o.hour, mm: o.minute, wd: WD[o.weekday] || o.weekday, ord: Math.round(Date.UTC(y, m - 1, d) / 86400000) };
  }
  function info(iso) {
    var date = new Date(iso), p = parts(date), t = parts(new Date());
    return { date: date, day: p.d, mon: MON[p.m - 1], wd: p.wd, time: p.hh + ':' + p.mm, diff: p.ord - t.ord };
  }
  function isPast(i) { return i.date.getTime() < Date.now() - 3 * 3600 * 1000; }
  function bucket(i) { return i.diff <= 0 ? 'Idag' : (i.diff <= 7 ? 'Denna vecka' : 'Senare'); }
  function when(i) {
    if (i.diff === 0) return 'Idag · ' + i.time;
    if (i.diff === 1) return 'Imorgon · ' + i.time;
    return i.wd + ' ' + i.day + ' ' + i.mon + ' · ' + i.time;
  }
  function priceLabel(e) { return e.price_sek > 0 ? 'från ' + e.price_sek + ' kr' : 'Gratis'; }
  function pricePlain(e) { return e.price_sek > 0 ? e.price_sek + ' kr' : 'Gratis'; }

  function sbGet(path) {
    return fetch(SB_URL + '/rest/v1/' + path, { headers: { apikey: SB_KEY, Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) { throw new Error('HTTP ' + r.status); } return r.json(); });
  }

  function getSaved() {
    try { var v = JSON.parse(localStorage.getItem(SK) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; }
  }
  function toggleSaved(slug) {
    var a = getSaved(), i = a.indexOf(slug);
    if (i === -1) { a.push(slug); } else { a.splice(i, 1); }
    try { localStorage.setItem(SK, JSON.stringify(a)); } catch (e) { /* lagring kan vara blockerad */ }
    return a.indexOf(slug) !== -1;
  }

  window.Kvitt = {
    get: sbGet, esc: esc, color: color, info: info, isPast: isPast,
    bucket: bucket, when: when, priceLabel: priceLabel, pricePlain: pricePlain,
    getSaved: getSaved, toggleSaved: toggleSaved
  };
})();
