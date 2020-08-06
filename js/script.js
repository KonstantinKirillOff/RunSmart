
//slick-slider
/* $(document).ready(function () {
    $('.carousel__inner').slick({
        infinite: true,
        speed: 1200,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
              breakpoint: 992,
              settings: {
                dots: true,
                arrows: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
    });
}); */

$(document).ready(function () {

  //табы с ресурса https://denis-creative.com/jquery-tabs/
  $('ul.catalog__tabs').on('click', '.catalog__tab:not(.catalog__tab__active)', function () {
    $(this)
      .addClass('catalog__tab__active').siblings().removeClass('catalog__tab__active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });


  //Слайдер tinny slider
  const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
    /* controlsText: [
      '<img src="icons/left.svg">',
      '<img src="icons/right.svg">'
    ] */
  });

  document.querySelector('.prev').onclick = function () {
    slider.goTo('prev');
  };

  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });


  /* $('.catalog-item__link').each(function (i) {
    $(this).on('click', function (e) {
      e.preventDefault();

      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');

      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');

    })
  }); */



  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  function toggleSlide(type_link) {

    $(type_link).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();

        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');

        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');

      })
    });

  }


  //Modal windows
  /* $('[data-modal = consultation]').fadeOut(); - выбрали все элементы с нужными дата атрибутами и скрываем их */
  $('[data-modal = consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');

  });

  $('[data-modal = thanks]').on('click', function () {
    $('.overlay, #thanks').fadeIn('slow');

  });

  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #buy, #thanks ').fadeOut('slow');

  });

  $('[data-modal = buy]').each(function (i) {
    $(this).on('click', function () {
      $('#buy .modal__subheader').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #buy').fadeIn('slow');
    })

  });


  function validator(idForm) {

    $(idForm).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },

      messages: {
        name: {
          required: "Введите имя",
          minlength: jQuery.validator.format("Должно быть минимум {0} символа!")
        },
        email: {
          required: "Заполните почту",
          email: "Ваша почта должна иметь формат name@domain.com"
        }
      }
    });
  };

  validator('#buy .feed-form');
  validator('#consultationForm');
  validator('#consultation .feed-form');

  $('input[name=phone').mask("+7 (999)-999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');
      $('form').trigger('reset');
    });
    return false;
  });

  //Появление стрелочки после проматывания 1600px
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.pageUp').fadeIn();
    } else {
      $('.pageUp').fadeOut();
    }
  });

  $("a[href^='#up']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  var wow = new WOW(
    {
      boxClass:     'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset:       0,          // distance to the element when triggering the animation (default is 0)
      mobile:       true,       // trigger animations on mobile devices (default is true)
      live:         true
    }
  );
  wow.init();

});


//bootstrap
