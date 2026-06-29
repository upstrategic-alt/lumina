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
