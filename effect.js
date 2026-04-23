/* ═══════════════════════════════════════════════════════════════
   effect.js — Birthday Interactive Controller
   ═══════════════════════════════════════════════════════════════ */

$(window).load(function () {
  $('.loading').fadeOut('fast');
  $('.container').fadeIn('fast');
});

$('document').ready(function () {

  /* ─────────────────────────────────────────────────────
     BALLOON RESIZE  (8 balloons: HBDADITH)
  ───────────────────────────────────────────────────── */
  var vw;
  $(window).resize(function () {
    vw = $(window).width() / 2;
    relineBalloons(vw);
  });

  function relineBalloons(center) {
    var offsets = [-350,-250,-150,-50,50,150,250,350];
    ['b11','b22','b33','b44','b55','b66','b77','b88'].forEach(function(id, i){
      $('#'+id).animate({ top: bannerLineY(), left: center + offsets[i] }, 500);
    });
  }

  /* Returns the Y position (in viewport px) just BELOW the banner image */
  function bannerLineY() {
    var $b = $('.bannar');
    if ($b.length && $b.offset()) {
      return $b.offset().top - $(window).scrollTop() + $b.outerHeight() + 20;
    }
    return 280; // fallback
  }

  /* ─────────────────────────────────────────────────────
     STEP 1 — Turn On Lights
     Shows the fairy lights container and lights the bulbs
  ───────────────────────────────────────────────────── */
  $('#turn_on').click(function () {
    var $fl = $('#fairy-lights');
    $fl.css('display', 'block');
    // small delay so CSS transition fires properly
    setTimeout(function () {
      $fl.css('opacity', '1');
      $fl.addClass('bright');
    }, 50);
    $(this).fadeOut('slow').delay(2000).promise().done(function () {
      $('#play').fadeIn('slow');
    });
  });

  /* ─────────────────────────────────────────────────────
     STEP 2 — Play Music
  ───────────────────────────────────────────────────── */
  $('#play').click(function () {
    $('.song')[0].play();
    $(this).fadeOut('slow').delay(3000).promise().done(function () {
      $('#bannar_coming').fadeIn('slow');
    });
  });

  /* ─────────────────────────────────────────────────────
     STEP 3 — Decorate (Banner)
  ───────────────────────────────────────────────────── */
  $('#bannar_coming').click(function () {
    $('.bannar').addClass('bannar-come');
    $(this).fadeOut('slow').delay(3000).promise().done(function () {
      $('#balloons_flying').fadeIn('slow');
    });
  });

  /* ─────────────────────────────────────────────────────
     STEP 4 — Fly Balloons
  ───────────────────────────────────────────────────── */
  function randomPos() { return { l: 1000*Math.random(), t: 500*Math.random() }; }

  function loopBalloon(id) {
    var r = randomPos();
    $('#'+id).animate({ left: r.l, bottom: r.t }, 10000, function(){ loopBalloon(id); });
  }

  $('#balloons_flying').click(function () {
    $('.balloon-border').animate({ top: -500 }, 8000);
    $('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
    $('#b2,#b3,#b6,#b8').addClass('balloons-rotate-behaviour-two');
    ['b1','b2','b3','b4','b5','b6','b7','b8'].forEach(loopBalloon);
    $(this).fadeOut('slow').delay(3000).promise().done(function () {
      $('#cake_fadein').fadeIn('slow');
    });
  });

  /* ─────────────────────────────────────────────────────
     STEP 5 — Cake falls from top of screen
  ───────────────────────────────────────────────────── */
  $('#cake_fadein').click(function () {
    // Restart SVG animations by replacing with a fresh clone
    var svg = document.getElementById('cake-svg');
    if (svg) {
      var clone = svg.cloneNode(true);
      svg.parentNode.replaceChild(clone, svg);
    }

    // Reset candle state
    $('.velas').removeClass('dropping lit').css({ top: '-120px', opacity: 0 });

    // Position wrapper above viewport
    $('.cake-wrapper').removeClass('cake-fall').css('transform', 'translateY(-150vh)');

    // Show cake (still off-screen above)
    $('.cake').show();

    // Clip overflow so nothing leaks above the screen during fall
    $('html').css('overflow', 'hidden');

    // Trigger the fall animation after a short paint delay
    setTimeout(function () {
      $('.cake-wrapper').addClass('cake-fall');
    }, 50);

    // Restore overflow after fall + bounce settles
    setTimeout(function () {
      $('html').css('overflow', '');
    }, 1600);

    // AUTO-DROP CANDLE after SVG cream animation finishes (~6.6s)
    // SVG sequence: bizcocho_1(2s+0.8s) → relleno_1(0.5s) → bizcocho_2(0.5s) →
    //               relleno_2(0.5s) → bizcocho_3(0.3s) → crema(2s) = 6.6s total
    setTimeout(function () {
      $('.velas').css('opacity', 1).addClass('dropping');
    }, 7200);

    $(this).fadeOut('slow').delay(8000).promise().done(function () {
      $('#light_candle').fadeIn('slow');
    });
  });

  /* ─────────────────────────────────────────────────────
     STEP 6 — Light Candle
  ───────────────────────────────────────────────────── */
  $('#light_candle').click(function () {
    $('.velas').css('opacity', 1).addClass('lit');
    $(this).fadeOut('slow').promise().done(function () {
      $('#wish_message').fadeIn('slow');
    });
  });

  /* ─────────────────────────────────────────────────────
     STEP 7 — Happy Birthday
     Balloons stop floating and line up under the banner.
  ───────────────────────────────────────────────────── */
  $('#wish_message').click(function () {
    vw = $(window).width() / 2;

    // Stop random floating
    $('#b1,#b2,#b3,#b4,#b5,#b6,#b7,#b8').stop();

    // Rename ids so the resize handler can reposition them later
    ['b1','b2','b3','b4','b5','b6','b7','b8'].forEach(function(id, i){
      $('#'+id).attr('id', ['b11','b22','b33','b44','b55','b66','b77','b88'][i]);
    });

    // Align under the banner
    var targetTop = bannerLineY() + 80 - 155;
    var offsets   = [-390,-290,-190,-90,10,110,210,310];
    ['b11','b22','b33','b44','b55','b66','b77','b88'].forEach(function(id, i){
      $('#'+id).animate({ top: targetTop, left: vw + offsets[i] }, 600);
    });

    $('.balloons').css('opacity', '0.9');
    $('.balloons h2').fadeIn(3000);

    $(this).fadeOut('slow').delay(3000).promise().done(function () {
      $('#story').fadeIn('slow');
    });
  });

  /* ─────────────────────────────────────────────────────
     STEP 8 — Final message with TYPEWRITER
  ───────────────────────────────────────────────────── */
  var TYPING_SPEED = 22;
  var PAUSE_AFTER  = 140;

  function startMessageTypewriter() {
    var $elements = $('.message-box-full').children();

    function typeEl(idx) {
      if (idx >= $elements.length) return;

      var $el      = $($elements[idx]);
      var fullHtml = $el.html();
      var plain    = $('<div>').html(fullHtml).text();
      var i        = 0;

      // Lock the element's rendered height BEFORE clearing — box never shifts
      var lockedH = $el.outerHeight(true);
      $el.css({ 'min-height': lockedH + 'px', visibility: 'visible' }).html('');

      var tick = setInterval(function () {
        i++;
        $el.text(plain.substring(0, i));
        if (i >= plain.length) {
          clearInterval(tick);
          $el.html(fullHtml).css('min-height', ''); // restore bold/emoji, release lock
          setTimeout(function () { typeEl(idx + 1); }, PAUSE_AFTER);
        }
      }, TYPING_SPEED);
    }

    typeEl(0);
  }

  $('#story').click(function () {
    $(this).fadeOut('slow');
    $('.cake, .balloons, .balloon-border, .bulb-holder, .bannar, .navbar').fadeOut('fast');

    $('#message-page').fadeIn('slow', function () {
      startMessageTypewriter();
    });
  });

});

/* ── FLOATING HEARTS ─────────────────────────────────────────── */
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (4 + Math.random() * 4) + "s";
  document.querySelector(".hearts-container").appendChild(heart);
  setTimeout(() => { heart.remove(); }, 8000);
}

/* continuous hearts */
setInterval(createHeart, 300);

/* ─────────────────────────────────────────────────────────────
   FAIRY LIGHTS — place teardrop bulbs exactly on the SVG wire
   path using getPointAtLength(), identical to index2.html.
───────────────────────────────────────────────────────────── */
function initFairyLights() {
  var container = document.getElementById('fairy-lights');
  var path      = document.getElementById('wire-path');
  if (!container || !path) return;
  var pathLength = path.getTotalLength();
  var bulbCount  = 25;
  for (var i = 0; i <= bulbCount; i++) {
    var distance = (i / bulbCount) * pathLength;
    var point    = path.getPointAtLength(distance);
    var bulb     = document.createElement('div');
    bulb.classList.add('bulb-teardrop');
    bulb.style.left = ((point.x / 1000) * 100) + '%';
    bulb.style.top  = point.y + 'px';
    bulb.style.setProperty('--d', (0.5 + Math.random() * 2) + 's');
    container.appendChild(bulb);
  }
}

window.addEventListener('load', initFairyLights);


