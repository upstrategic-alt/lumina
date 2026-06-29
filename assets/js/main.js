/* ── nav scroll state ── */
window.addEventListener('scroll', function(){
  var nav = document.getElementById('site-nav');
  if (nav) nav.classList.toggle('scrolled', scrollY > 60);
});

/* ── intersection reveal ── */
var io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: .11 });
document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-q').forEach(function(btn){
  btn.addEventListener('click', function(){
    btn.closest('.faq-item').classList.toggle('open');
  });
});

/* ── before/after drag-to-compare slider ── */
document.querySelectorAll('.ba-compare').forEach(function(el){
  var startPos = parseFloat(el.dataset.pos || '50');
  el.style.setProperty('--pos', startPos + '%');
  el.setAttribute('role', 'slider');
  el.setAttribute('tabindex', '0');
  el.setAttribute('aria-label', 'Drag to compare before and after');
  el.setAttribute('aria-valuemin', '0');
  el.setAttribute('aria-valuemax', '100');
  el.setAttribute('aria-valuenow', String(Math.round(startPos)));

  var dragging = false;

  function setPos(pct){
    pct = Math.max(0, Math.min(100, pct));
    el.style.setProperty('--pos', pct + '%');
    el.setAttribute('aria-valuenow', String(Math.round(pct)));
  }

  function posFromEvent(e){
    var rect = el.getBoundingClientRect();
    var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    return (x / rect.width) * 100;
  }

  el.addEventListener('pointerdown', function(e){
    dragging = true;
    el.setPointerCapture && el.setPointerCapture(e.pointerId);
    setPos(posFromEvent(e));
  });
  el.addEventListener('pointermove', function(e){
    if (!dragging) return;
    setPos(posFromEvent(e));
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(function(evt){
    el.addEventListener(evt, function(){ dragging = false; });
  });

  el.addEventListener('keydown', function(e){
    var current = parseFloat(el.style.getPropertyValue('--pos')) || 50;
    if (e.key === 'ArrowLeft')  { setPos(current - 5); e.preventDefault(); }
    if (e.key === 'ArrowRight') { setPos(current + 5); e.preventDefault(); }
    if (e.key === 'Home')       { setPos(0);  e.preventDefault(); }
    if (e.key === 'End')        { setPos(100); e.preventDefault(); }
  });
});
