$(window).load(function(){
    $('.preloader').fadeOut(1000);
})

let activeMorePage = false;

$(document).ready(function(){
    const settings = {
        mode: 'horizontal',         
        speed: 500, 
        easing: 'ease-out', 
        adaptiveHeight: true,
        adaptiveHeightSpeed: 500,
        startSlide: 0, 
        infiniteLoop: true,
        preloadImages: 'visible',
        responsive: true, 
        pager: true, 
        
        controls: true, // 좌,우 컨트롤 버튼 출력 여부
        
        prevText: '',
        nextText: '',
        captions: true,
        touchEnabled: false,
    };

    $('.publishing__slider').bxSlider({
        ...settings, 
        pagerSelector: '.publishing__pager',
        nextSelector: '.publishing__controls_next',
        prevSelector: '.publishing__controls_prev',
    });

    $('.frontEnd__slider').bxSlider({
        ...settings,
        pagerSelector: '.frontEnd__pager',
        nextSelector: '.frontEnd__controls_next',
        prevSelector: '.frontEnd__controls_prev',
    });
    

    AOS.init({
        duration: 1000,
        ease: 'ease-in-out',
        once: true,
    });

    $('.main > div > h2').fitText(1.2, { minFontSize: '50px', maxFontSize: '64px' });
    
    animateScroll();

    showMorePage();

    mui();

    typing($('.typing1'));
    
    setTimeout(function(){
        typing($('.typing2'));
    },1300);

    scrollUp();
});

function scrollUp(){
    $('.scrollUp').click(function(e){
        e.preventDefault();
        $(this).parent().parent().stop().animate({ 'scrollTop': 0});
    })
}

function typing($target){
    const $typing = $target;
    const text = $typing.text();
    $typing.html('');
    const chars = text.split('');

    $typing.css({opacity: 1});
    chars.forEach(function(item) {
        if(item == ' '){
            item = '&nbsp';
        }
        $('<span></span>').html(item).appendTo($typing);
    });
    const delayStart = 1000;
    const speed = 100;
    
    $typing.children().hide().each(function(index) {
        const delay = delayStart + speed * index;
        $(this).delay(delay).show(10);
    });
}

function animateScroll(){
    const $nav = $('.menu ul li');
    const duration = 1000;
    const scrollY = $('html').scrollTop();
    let homeOffsetTop = $('#home').offset().top;
    let aboutOffsetTop = $('#about').offset().top;
    let skillOffsetTop = $('#skill').offset().top;
    let portfolioOffsetTop = $('#portfolio').offset().top;
    let skillHeight = $('#skill').innerHeight();
    let aboutHeight = $('#about').innerHeight();

    $(window).resize(() => {
        homeOffsetTop = $('#home').offset().top;
        aboutOffsetTop = $('#about').offset().top;
        skillOffsetTop = $('#skill').offset().top;
        portfolioOffsetTop = $('#portfolio').offset().top;
        skillHeight = $('#skill').innerHeight();
        aboutHeight = $('#about').innerHeight();
    })

    $nav.click(function(e){
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        const areaId = $(this).attr('data-nav');
        moveScroll(areaId, duration);
    });

    $('.goToHome').click(function(e){
        e.preventDefault();
        moveScroll('home', duration);
    });

    $('.goToAbout').click(function(e){
        e.preventDefault();
        moveScroll('about', duration);
    });
    
    if(scrollY === 0){
        activeNav('home');
    }

    $(window).scroll(function(){
        if( $(this).scrollTop() >= homeOffsetTop && $(this).scrollTop() < aboutOffsetTop / 2){
            activeNav('home');
        }
        if( $(this).scrollTop() >= aboutOffsetTop - 200 && $(this).scrollTop() < skillOffsetTop - aboutHeight / 2){
            activeNav('about');
        }
        if( $(this).scrollTop() >= skillOffsetTop - 200 && $(this).scrollTop() < portfolioOffsetTop - skillHeight){
            activeNav('skill');
        }
        if( $(this).scrollTop() >= portfolioOffsetTop - 200 && $(this).scrollTop() < portfolioOffsetTop + $(window).height()){
            activeNav('portfolio');
        }
        if( $(this).scrollTop() >= portfolioOffsetTop + $(window).height()){
            activeNav('contact');
        }
    });  
}

function activeNav(areaId){
    if(activeMorePage){
        return ;
    }
    
    const $nav = $('.menu ul li');
    $nav.removeClass('active');
    $nav.filter(`[data-nav=${areaId}]`).addClass('active');
}

function moveScroll(areaId, duration){
    let areaDistance;
    if(areaId === 'skill'){
        areaDistance = $('#'+areaId).offset().top - 200;
    }else{
        areaDistance = $('#'+areaId).offset().top;
    }
    
    $('html, body').stop().animate({
        scrollTop: areaDistance,
    }, duration);
}

function showMorePage(){
    const $view = $('.slide_title');
    const $close = $('.close');
    let id = '';
    let scrollY;

    $view.click(function(e){
        e.preventDefault();
        activeMorePage = true;
        scrollY = $('html').scrollTop();
        id = '.' + $(this).attr('id');
        $('.more_page').fadeIn();
        $(id).fadeIn();
        $('body').css({
            'position': 'fixed',
            'top' : `-${scrollY}px`,
            'overflow-y' : 'scroll',
        })
    });
    
    $close.click(function(e){
        e.preventDefault();
        $(id).fadeOut();
        $('.more_page').fadeOut();
        $('body').css({
            'position': '',
            'top': ``,
        });
        $(window).scrollTop(scrollY);
    });
}

function mui(){
    $('#mui').click(function(){
        $('#mui').toggleClass('active');
        $('.mui').toggleClass('active');
    });

    $('.mui nav ul li').click(function(){
        $('#mui').removeClass('active');
        $('.mui').removeClass('active');
    });
}
