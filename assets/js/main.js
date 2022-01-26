"use strict";

/*---------------------------------------------
Template name :  Hostpack
Version       :  1.0
Author        :  ThemeLooks
Author url    :  http://themelooks.com

NOTE:
------
Please DO NOT EDIT THIS JS, you may need to use "custom.js" file for writing your custom js.
We may release future updates so it will overwrite this file. it's better and safer to use "custom.js".

[Table of Content]

    01: Main Menu
    02: Sticky Nav
    03: Background Image
    04: Check Data
    05: Changing svg color 
    06: Google map
    07: Back to top button
    08: Offcanvas Triggar
    09: Owl Carousel
    10: Popup Video
    11: Preloader 
    12: Countdown Timer
    13: Typed js
    14: Search Toggle
    15: Service Point 
    16: Contact Form
    17: Banner Mousemove
    18: Data Center Location Map
    19: Price Switcher


----------------------------------------------*/
(function ($) {
  "use strict";
  /*===================
  01: Main Menu
  =====================*/

  $('ul.nav li a[href="#"]').on('click', function (event) {
    event.preventDefault();
  });
  /* Menu Maker */

  $(".nav-wrapper").menumaker({
    title: '<span></span>',
    format: "multitoggle"
  });
  $($(window)).on('scroll', function () {
    if (!$('ul.nav').hasClass('open')) {
      $('#menu-button').removeClass('menu-opened');
    }

    ;
  });

  function mobileMenu() {
    if ($(window).width() < 992) {
      $(".nav-wrapper .nav-wrap-inner").hide();
    } else {
      $(".nav-wrapper .nav-wrap-inner").show();
    }
  } // $(window).on("resize", () => mobileMenu());


  $(window).on("resize", function () {
    mobileMenu();
  });
  mobileMenu();
  /* Menu Responsive in Small Device */

  function subMenu() {
    var $subMain = $('.nav-wrapper .nav > li > ul');
    var $subSub = $('.nav-wrapper .nav > li > ul ul');
    $subMain.each(function () {
      if ($(window).width() > 991) {
        if ($(this).offset().left + $(this).width() > $(window).width()) {
          $(this).css({
            'left': 'auto',
            'right': '0'
          });
        }
      }
    });
    $subSub.each(function () {
      if ($(window).width() > 991) {
        if ($(this).offset().left + $(this).width() > $(window).width()) {
          $(this).css({
            'left': 'auto',
            'right': '100%'
          });
        }
      }
    });
  }

  subMenu();
  $(window).resize(subMenu);
  /*========================
  02: Sticky Nav
  ==========================*/

  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();

    if (scroll < 180) {
      $(".header-main.love-sticky").removeClass("sticky fixed-top fadeInDown animated");
    } else {
      $(".header-main.love-sticky").addClass("sticky fixed-top fadeInDown animated");
    }
  });
  /*========================
  03: Background Image
  ==========================*/

  var $bgImg = $('[data-bg-img]');
  $bgImg.css('background-image', function () {
    return 'url("' + $(this).data('bg-img') + '")';
  }).removeAttr('data-bg-img').addClass('bg-img');
  /*==================================
  04: Check Data
  ====================================*/

  var checkData = function checkData(data, value) {
    return typeof data === 'undefined' ? value : data;
  };
  /*==================================
  05: Changing svg color 
  ====================================*/


  $(window).on('load', function () {
    jQuery('img.svg').each(function () {
      var $img = jQuery(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');
      jQuery.get(imgURL, function (data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg'); // Add replaced image's ID to the new SVG

        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        } // Add replaced image's classes to the new SVG


        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        } // Remove any invalid XML tags as per http://validator.w3.org


        $svg = $svg.removeAttr('xmlns:a'); // Check if the viewport is set, else we gonna set it if we can.

        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
        } // Replace image with new SVG


        $img.replaceWith($svg);
      }, 'xml');
    });
  });
  /*==================================
  06: Google map 
  ====================================*/

  var style = [{
    "featureType": "administrative.country",
    "elementType": "geometry",
    "stylers": [{
      "visibility": "simplified"
    }, {
      "hue": "#ff0000"
    }]
  }];
  var $map = $('[data-trigger="map"]'),
      $mapOps;

  if ($map.length) {
    // Map Options
    $mapOps = $map.data('map-options'); // Map Initialization

    window.initMap = function () {
      $map.css('min-height', '570px');
      $map.each(function () {
        var $t = $(this),
            map,
            lat,
            lng,
            zoom;
        $mapOps = $t.data('map-options');
        lat = parseFloat($mapOps.latitude, 10);
        lng = parseFloat($mapOps.longitude, 10);
        zoom = parseFloat($mapOps.zoom, 10);
        map = new google.maps.Map($t[0], {
          center: {
            lat: lat,
            lng: lng
          },
          zoom: zoom,
          scrollwheel: false,
          disableDefaultUI: true,
          zoomControl: true,
          styles: style
        }); // map = new google.maps.Marker({
        //     position: { lat: lat, lng: lng },
        //     map: map,
        //     animation: google.maps.Animation.DROP,
        //     draggable: false,
        //     icon: 'assets/img/map-marker.png'
        // });
      });
    };

    initMap();
  }

  ;
  /*============================================
  07: Back to top button
  ==============================================*/

  var $backToTopBtn = $('.back-to-top');

  if ($backToTopBtn.length) {
    var scrollTrigger = 400,
        // px
    backToTop = function backToTop() {
      var scrollTop = $(window).scrollTop();

      if (scrollTop > scrollTrigger) {
        $backToTopBtn.addClass('show');
      } else {
        $backToTopBtn.removeClass('show');
      }
    };

    backToTop();
    $(window).on('scroll', function () {
      backToTop();
    });
    $backToTopBtn.on('click', function (e) {
      e.preventDefault();
      $('html,body').animate({
        scrollTop: 0
      }, 700);
    });
  }
  /*==================================
  08: Offcanvas Triggar
  ====================================*/


  $('.offcanvas-trigger').on('click', function () {
    $('.offcanvas-wrapper, .offcanvas-overlay').addClass('show');
  });
  $('.offcanvas-overlay, .offcanvas-close').on('click', function () {
    $('.offcanvas-wrapper, .offcanvas-overlay').removeClass('show');
  });
  /*==================================
  09: Owl Carousel
  ====================================*/

  var $owlCarousel = $('.owl-carousel');
  $owlCarousel.each(function () {
    var $t = $(this);
    $t.owlCarousel({
      items: checkData($t.data('owl-items'), 1),
      margin: checkData($t.data('owl-margin'), 0),
      loop: checkData($t.data('owl-loop'), true),
      smartSpeed: 450,
      autoplay: checkData($t.data('owl-autoplay'), true),
      autoplayTimeout: checkData($t.data('owl-speed'), 5000),
      center: checkData($t.data('owl-center'), false),
      animateIn: checkData($t.data('owl-animate-in'), false),
      animateOut: checkData($t.data('owl-animate-out'), false),
      nav: checkData($t.data('owl-nav'), false),
      navText: ['<svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15"><path id="slider-left-arrow" d="M253.983,248.709a.75.75,0,0,1,1.034,1.086l-5.753,5.457H264.25a.75.75,0,0,1,0,1.5H249.288l5.729,5.457a.75.75,0,1,1-1.034,1.086l-6.544-6.232a1.5,1.5,0,0,1,.013-2.134Z" transform="translate(-247 -248.502)" fill="#00c3ff"/></svg>', '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15"><path id="slider-right-arrow" d="M258.017,248.709a.75.75,0,0,0-1.034,1.086l5.753,5.457H247.75a.75.75,0,0,0,0,1.5h14.962l-5.729,5.457a.75.75,0,1,0,1.034,1.086l6.544-6.232a1.5,1.5,0,0,0-.013-2.134Z" transform="translate(-247 -248.502)" fill="#00c3ff"/></svg>'],
      dots: checkData($t.data('owl-dots'), false),
      stagePadding: checkData($t.data('owl-stage-padding'), false),
      autoWidth: checkData($t.data('owl-auto-width'), false),
      responsive: checkData($t.data('owl-responsive'), {})
    });
  });
  /*==================================
  10: Popup Video
  ====================================*/

  $(".video-btn").magnificPopup({
    type: "video"
  });
  $(".gallery-link").magnificPopup({
    gallery: {
      enabled: true
    },
    type: "image"
  });
  /*==================================
  11: Preloader 
  ====================================*/

  $(window).on('load', function () {
    $('.preloader').fadeOut(1000);
  });
  /*==================================
  12: Counter Up
  ====================================*/

  $('.counter').counterUp({
    delay: 100,
    time: 2000
  });
  /*==================================
  13: Typed js
  ====================================*/

  $(function () {
    $(".typed").typed({
      strings: ["your website", "your hosting", "your cloud"],
      typeSpeed: 30,
      startDelay: 1200,
      backSpeed: 20,
      backDelay: 500,
      loop: true,
      loopCount: 5
    });
    $(".typed2").typed({
      strings: ["web host", "web cloud", "VPS host"],
      typeSpeed: 30,
      startDelay: 1200,
      backSpeed: 20,
      backDelay: 500,
      loop: true,
      loopCount: 5
    });
  });
  /*==================================
  14: Search Toggle
  ====================================*/

  $('.search-toggle-btn').on('click', function () {
    $('.full-page-search').addClass('show');
  });
  $('.search-close-btn').on('click', function () {
    $('.full-page-search').removeClass('show');
  });
  /*==================================
  15: Service Point 
  ====================================*/

  $('.service_point-map-img').find('.l_info').on('mouseenter', function () {
    $('.service_point-map-img').find('.l_info').removeClass('active');
    $(this).addClass('active');
  });
  /*==================================
  16: Contact Form
  ====================================*/

  $('.contact-form-wrap, .question-form').on('submit', 'form', function (e) {
    e.preventDefault();
    var $el = $(this);
    $.post($el.attr('action'), $el.serialize(), function (res) {
      res = $.parseJSON(res);
      $el.parent('.contact-form-wrap, .question-form').find('.form-response').html('<span>' + res[1] + '</span>');
    });
  });
  /*==================================
  17: Banner Mousemove
  ====================================*/

  var object1 = $('.men-img');
  var object2 = $('.monitor-img, .men-img1, .men-img2');
  var object3 = $('.text-img, .men-img3');
  var layer = $('.layer');
  layer.mousemove(function (e) {
    var valueX = e.pageX * 1 / 100;
    var valueY = e.pageY * 1 / 100;
    object1.css({
      'transform': 'translate3d(' + valueX + 'px, ' + valueY + 'px,0)'
    });
  });
  layer.on('mousemove', function (e) {
    var valueX = e.pageX * 1 / 200;
    var valueY = e.pageY * 1 / 200;
    object2.css({
      'transform': 'translate3d(' + valueX + 'px, ' + valueY + 'px,0)'
    });
  });
  layer.mousemove(function (e) {
    var valueX = e.pageX * -1 / 150;
    var valueY = e.pageY * -1 / 150;
    object3.css({
      'transform': 'translate3d(' + valueX + 'px, ' + valueY + 'px,0)'
    });
  });
  /*==================================
  18: Data Center Location Map
  ====================================*/

  $('.data_center_location-map').find('.l_info').on('mouseenter', function () {
    $('.data_center_location-map').find('.l_info').removeClass('active');
    $(this).addClass('active');
  });
  /*==================================
  19: Price Switcher
  ====================================*/

  var c = $(".filt-monthly"),
      d = $(".filt-yearly"),
      m = $(".switcher"),
      month = $(".monthly"),
      year = $(".yearly");
  c.on("click", function () {
    m.prop("checked", !1);
    c.addClass("toggler--is-active");
    d.removeClass("toggler--is-active");
    month.removeClass("hide"), p.addClass("hide");
  });
  d.on("click", function () {
    m.prop("checked", !0);
    d.addClass("toggler--is-active");
    c.removeClass("toggler--is-active");
    month.addClass("hide"), p.removeClass("hide");
  });
  m.on("click", function () {
    d.toggleClass("toggler--is-active");
    c.toggleClass("toggler--is-active");
    month.toggleClass("hide");
    year.toggleClass("hide");
  });
})(jQuery);