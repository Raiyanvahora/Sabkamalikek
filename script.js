(function () {
  'use strict';

  var WHATSAPP_NUMBER = '919726965438';

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Sticky header shrink + mobile nav ---------- */
  var header = document.getElementById('site-header');
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  function onScroll() {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  navToggle.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.acc-item').forEach(function (item) {
    var trigger = item.querySelector('.acc-trigger');
    trigger.addEventListener('click', function () {
      var alreadyOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.acc-trigger').setAttribute('aria-expanded', 'false');
      });
      if (!alreadyOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Enquiry form -> WhatsApp ---------- */
  var form = document.getElementById('enquiry-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;

    var data = new FormData(form);
    var name = (data.get('name') || '').trim();
    var phone = (data.get('phone') || '').trim();
    var pickup = (data.get('pickup') || '').trim();
    var destination = (data.get('destination') || '').trim();
    var date = data.get('date') || '';
    var passengers = (data.get('passengers') || '').trim();

    var lines = [
      'Hi Sabka Malik Ek Tours! I would like to enquire about a Tempo Traveller booking.',
      '',
      'Name: ' + name,
      'Phone: ' + phone,
      'Pickup Location: ' + pickup,
      'Destination: ' + destination,
      'Travel Date: ' + date,
      'Number of Passengers: ' + passengers,
      '',
      'Please share the exact quote. Thank you!'
    ];

    var message = encodeURIComponent(lines.join('\n'));
    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + message;
    window.open(url, '_blank', 'noopener');
  });
})();
