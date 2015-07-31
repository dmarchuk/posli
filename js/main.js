$('.menu a, #scroll-menu a').click(function (e) {
    e.preventDefault();
    var scrollTop = $($(this).attr('href')).offset().top;

    $('body, html').animate({scrollTop: scrollTop}, 800);
});

$('button.get-in-line').click(function () {
    $('body, html').animate({scrollTop: $('#sign-up').offset().top}, 800);
    $('#sign-up input').focus();
});

function validateEmail($email) {
    var email = $email.val();
    var emailRegEx = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;

    if (emailRegEx.test(email)) {
        $email.removeClass('error');
    }
    else {
        $email.addClass('error').focus();
        $('.error').off('keyup').on('keyup', function () {
            if (validateEmail($(this))) {
                $(this).removeClass('error');
                $('.error').off('keyup');
            }
        });
    }
    return emailRegEx.test(email);
}

function successFunction() {
    $('.form-wrapper').addClass('fadeOutDown');
    setTimeout(function () {
        $('.form-wrapper').hide();
        $('.success').show().addClass('fadeInUp');

    }, 300);
}

$('button.submit').click(function () {
    var $email = $(this).parent().find('input');
    if (validateEmail($email)) {
        successFunction();
    }
});

$(window).scroll(function() {

    var menuScroll = $('#scroll-menu')

    if ($(window).width() <= 767) {

        if ($(window).scrollTop() > 524) {
            menuScroll.addClass('mobile-fixed');
        } else {
            menuScroll.removeClass('mobile-fixed');
        }

    }

    if ($(window).scrollTop() > 300) {
        menuScroll.show();
    } else {
        menuScroll.hide();
    }

})

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#scroll-menu a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top - $('#scroll-menu').height()  <= scrollPos && refElement.position().top - $('#scroll-menu').height() + refElement.height() > scrollPos) {
            $('#scroll-menu a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}

function onScrollMobile(event){
    var scrollPos = $(document).scrollTop();
    $('.menu a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top - $('#scroll-menu').height()  <= scrollPos && refElement.position().top - $('#scroll-menu').height() + refElement.height() > scrollPos) {
            $('.menu a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}

$(document).ready(function() {

    if ($(window).width <= 767) {
        $(document).on("scroll", onScrollMobile);
    } else {
        $(document).on("scroll", onScroll);
    }

    var w = 0;

    $(window).load(function(){
        w = $(window).width();
    });

    if ($(window).width() <= 767) {
        $('.slider').slick();
    }

    $(window).resize(function() {

        var nw = $(window).width();

        if (nw != w) {

            $('.slider').slick('unslick');

            if ($(window).width() <= 767) {
                $('.slider').find('.col-3').addClass('resized-slick');
                $('#scroll-menu').hide();
            } else {
                $('.slider').find('.col-3').removeClass('resized-slick');
                $('#scroll-menu').show();
            }

        }

    })

});