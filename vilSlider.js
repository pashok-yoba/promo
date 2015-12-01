function mpSliderBI(manual, first)
{
    var slides = $('.banner-slide', '#prm-banner');
    var menu = $('span', '#prm-banner');

    var activeSlide = ((first != undefined) && (!isNaN(parseInt(first))))? parseInt(first) : Math.floor((Math.random()*(slides.length - 1)));
    activeSlide = (activeSlide >= (slides.length - 1))? 0 : activeSlide;
    slides.eq(activeSlide).css('z-index', 700);
    menu.eq(activeSlide).addClass('banner-active');

    $('#banner-preloader').remove();

    slides = $('.banner-slide', '#prm-banner');
    this.index = activeSlide;
    this.length = slides.length - 1;
    this.animation = false;
    this.mouseover = false;
    this.manual = manual;

    var target = this;

    for(var i = 0; i < slides.length; i++) menu.eq(i).click(setActive(i));
    $('#prm-arrow-left').click(arrowClick(0));
    $('#prm-arrow-right').click(arrowClick(1));

    function setActive(index)
    {
        return function() {
            if(!target.animation && !menu.eq(index).hasClass('banner-active'))
            {
                target.animation = true;
                var current = target.index;
                target.index = index;
                slides.eq(target.index).css('z-index', 500);
                slides.eq(current).fadeTo(750, 0, function(){
                    slides.eq(current).css('z-index', 1);
                    slides.eq(target.index).css('z-index', 700);
                    slides.eq(current).fadeTo(0, 1);
                    target.animation = false;
                });
                menu.eq(current).removeClass('banner-active');
                menu.eq(target.index).addClass('banner-active');
                if(index != undefined) postEvent(['_trackEvent', 'Slider', 'Select_' + index, 'slider_button_click_test']);
            }
            return false;}
    }
    function arrowClick(direction)
    {
        return function() {
            if(!target.animation)
            {
                target.animation = true;
                var current = target.index;
                var index = direction ? ((current < target.length) ? (current + 1) : 0) : ((current > 0) ? (current - 1) : target.length);
                target.index = index;
                slides.eq(target.index).css('z-index', 500);
                slides.eq(current).fadeTo(750, 0, function(){
                    slides.eq(current).css('z-index', 1);
                    slides.eq(target.index).css('z-index', 700);
                    slides.eq(current).fadeTo(0, 1);
                    target.animation = false;
                });
                menu.eq(current).removeClass('banner-active');
                menu.eq(target.index).addClass('banner-active');
                if(index != undefined) postEvent(['_trackEvent', 'Slider', 'Select_' + index, 'slider_button_click_test']);
            }
            return false;}
    }
    function newSlide()
    {
        return function(){
            if(!target.animation && !target.mouseover)
            {
                target.animation = true;
                var current = target.index;
                target.index = ((target.index + 1) < target.length + 1)? target.index + 1 : 0;
                slides.eq(target.index).css('z-index', 500);
                slides.eq(current).fadeTo(750, 0, function(){
                    slides.eq(current).css('z-index', 1);
                    slides.eq(target.index).css('z-index', 700);
                    slides.eq(current).fadeTo(0, 1);
                    target.animation = false;
                });
                menu.eq(current).removeClass('banner-active');
                menu.eq(target.index).addClass('banner-active');
            }
        }
    }

    function postEvent(data){
        if(window._gaq && typeof(_gaq.push) == 'function'){
            _gaq.push(data);
        }
    }

    if(!this.manual){
        this.interval = setInterval(newSlide(), 9000);
        $('.banner-main-container').hover(
            function(){target.mouseover = true; clearInterval(target.interval);},
            function(){target.mouseover = false; target.interval = setInterval(newSlide(), 9000)}
        );
    }
}
