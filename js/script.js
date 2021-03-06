$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="icons/right.svg"></button>',
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    function toggleSlide(item){ 
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
    toggleSlide('.catalog-item__back');
    toggleSlide('.catalog-item__link');
    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    $('.button_mini').on('click', function(){
        $('.overlay, #order').fadeIn('slow');
    });
    $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        });
    });
    function ValidateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 3
                },
                phone: "required",
                email:{
                    required: true,
                    email: true
                } 
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите больше {0}-ёх символов!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "неправильно введен адрес почты"
                }
              }
        });
    };
    ValidateForms('#consultation-form');
    ValidateForms('#consultation form');
    ValidateForms('#order form');
    $('input[name=phone]').mask ("(+7 (999) 999-99-99)");
    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");


            $('form').trigger('reset');
        });
        return false;
    });
    $(window).scroll(function(){
        if($(this).scrollTop() > 1600){
            $('.pageup').fadeIn();
        }
        else{
            $('.pageup').fadeOut();
        }
    });
    function scroll (item){
        $(item).on('click', function() {
            let href = $(this).attr('href');
            $('html, body').animate({
                scrollTop: $(href).offset().top
            });
            return false;
        });
    };
    scroll('a[href^="#down"');
    scroll('a[href^="#up"');
    const wow = new WOW(
        {
          boxClass:     'wow', 
          animateClass: 'animated',
          offset:       0,    
          mobile:       true,   
          live:         true,
          callback:     function(box) {
          },
          scrollContainer: null,    
          resetAnimation: false,    
        }
      );
    wow.init();
    $(".footer__arrow").click(function() {
        $('.footer__arrow').toggleClass('footer__arrow_active');
        $('.footer__info').toggleClass('footer__info_active');
    });

    function lazyloadRun() {
        let container = document.body;
        if(container) {
            let img_list = container.getElementsByTagName('img, iframe');
            for(let i = 0;i < img_list.length;i++) {
                let el = img_list[i];
                let data_src = el.getAttribute('data-src'); 
                if(data_src) {
                    el.setAttribute('src',data_src);
                    el.lazy = '';
                }
            }
        }
    }
    lazyloadRun();
});
