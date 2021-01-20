"use strict";
$(document).ready(function () {
    svg4everybody({});

    const openProductList = () => {
        $("#show-more").click(function (){
            if(this.innerText === "Показать еще 15 компании"){
                $(".product-information-company__list").css('max-height', 'none')
                $(this).wrap("<a href='#l-truboprowod'></a>")
                $(this).text("Скрыть")
            }else{
                const width = $(window).width() < 768 ? 320 : 270;
                $(".product-information-company__list").css('max-height', `${width}px`)
                $(this).text("Показать еще 15 компании")
            }
        })
    }
    const openProducentList = () => {
        $("#show-more-prod").click(function (){
            if(this.innerText === "Показать еще 15 компаний"){
                $(".product-preview__items--big").css('max-height', 'none')
                // $(this).parent.add("a")
                $(this).wrap("<a href='#all-piping'></a>")
                $(this).text("Скрыть")
            }else{
                const width = $(window).width() < 768 ? 866 : 660;
                $(".product-preview__items--big").css('max-height', `${width}px`)
                $(this).text("Показать еще 15 компаний")
            }
        })
    }
    /** открыть/закрыть мобильное меню */
    const setMobileMenuIsOpen = () =>{
        $(".sandwich").on('click', function (){
            if($(this).hasClass("is-active")){
                $(this).removeClass('is-active');
                $('.header-mobile').css('display', 'none');
            }else{
                $(this).addClass('is-active');
                $('.header-mobile').css('display', 'block');
            }
        })
    }
    /** слайдер картинок о продукте */
    const productInformationSlider = () =>{
        $('.js-product-slider-dots').slick({
            asNavFor: '.js-product-slider',
            slidesToShow: 2,
            slidesToScroll: 1,
            vertical: true,
            prevArrow: '.product-slider-dots__btn--prev',
            nextArrow: '.product-slider-dots__btn--next',
            focusOnSelect: true,
            infinite:false,
            adaptiveHeight: false

        });

        $('.js-product-slider').slick({
            asNavFor: '.js-product-slider-dots',
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            infinite:false,
            responsive:[
                {
                    breakpoint: 768,
                    settings: {
                        dots: true
                    }
                }
            ]
        });
    }
    const loopImage = () =>{
        let  glass, w, h, bw;

        /* Создать увеличительное стекло: */
        glass = document.createElement("DIV");
        glass.setAttribute("class", "img-magnifier-glass");
        let img = $('.loop-image');
        /* Вставить увеличительное стекло: */
        img.parentElement.insertBefore(glass, img);

        /* Установите свойства фона для стекла лупы: */
        glass.style.backgroundImage = "url('" + img.src + "')";
        glass.style.backgroundRepeat = "no-repeat";
        glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
        bw = 3;
        w = glass.offsetWidth / 2;
        h = glass.offsetHeight / 2;

        /* Выполните функцию, когда кто-то перемещает лупу по изображению: */
        glass.addEventListener("mousemove", moveMagnifier);
        img.addEventListener("mousemove", moveMagnifier);

        /* а также для сенсорных экранов: */
        glass.addEventListener("touchmove", moveMagnifier);
        img.addEventListener("touchmove", moveMagnifier);
        function moveMagnifier(e) {
            let pos, x, y;
            /* Предотвратите любые другие действия, которые могут возникнуть при перемещении по изображению */
            e.preventDefault();
            /* Получить позиции курсора x и y: */
            pos = getCursorPos(e);
            x = pos.x;
            y = pos.y;
            /* Не допускайте, чтобы лупа находилась вне изображения: */
            if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
            if (x < w / zoom) {x = w / zoom;}
            if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
            if (y < h / zoom) {y = h / zoom;}
            /* Установите положение стекла лупы: */
            glass.style.left = (x - w) + "px";
            glass.style.top = (y - h) + "px";
            /* Покажите, что такое увеличительное стекло "смотреть": */
            glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
        }

        function getCursorPos(e) {
            let a, x = 0, y = 0;
            e = e || window.event;
            /* Получить x и y позиции изображения: */
            a = img.getBoundingClientRect();
            /* Вычислите координаты курсора x и y относительно изображения: */
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            /* Consider any page scrolling: */
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return {x : x, y : y};
        }
    }
    /** табы на продуктах */
    const tabs =  () => {
        $('.tabs-navigation__item').click(function () {
            let tabName = $(this).attr('show-tab'),
                tabsBody = $(this).closest('.tabs').find('.tabs__body')[0],
                tab = $(tabsBody).find('.' + tabName);
            $(this).addClass('tabs-navigation__item--active').siblings()
                .removeClass('tabs-navigation__item--active');
            $(tab).addClass('tab--active').siblings()
                .removeClass('tab--active');
        });
    };
    /** фильтрация продуктов */
    const filterProducts = () =>{
        $('.product-preview-items__button-wrapper').click(function (){
            $(this).children().addClass('product-preview-items__button--active')
            $(this).siblings().children().removeClass('product-preview-items__button--active')
            let filter = $(this).text().trim();
            let products = document.querySelectorAll('.product-preview-item__categories')
            products.forEach((product)=>{
                if(filter === 'Все товары'){
                    product.closest('a').classList.remove("product-preview__item-wrapper--hidden")
                }else if(!product.textContent.trim().includes(filter)){
                    product.closest('a').classList.add("product-preview__item-wrapper--hidden")
                }else{
                    product.closest('a').classList.remove("product-preview__item-wrapper--hidden")
                }
            })
        })
    }
    const sendMessage = () =>{
        // $("#form").submit(async (e)=>{
        //     console.log(new FormData(this))
        //     e.preventDefault();
        //     let response = await fetch('../php/sendMail.php', {
        //                 method: 'POST',
        //                 body: new FormData(this)
        //             } ).then(res => console.log(res))
        //
        // })
        const form = document.getElementById('form');
        form.addEventListener('submit', formSend);

        async function formSend(e){
            e.preventDefault()
            let formData = new FormData(form)
            let response = await fetch('../static/php/sendMail.php', {
                method: 'POST',
                body: formData
            } ).then(res => console.log(res))
        }
    }
    const kontaktsPopup = () =>{
        $('.kontakt-form__icon').click(function (){
            $('#kontakt-form').css('display', 'none')

        })
        $('.callback-wrapper__icon').click(function (){
            $('#kontakt-form').css('display', 'block')
            Toast.add({
                text: 'Добавлено:',
                color: '#28a745',
                autohide: true,
                delay: 3000
            })
        })
    }
    // loopImage();
    tabs();
    filterProducts();
    openProductList();
    setMobileMenuIsOpen();
    productInformationSlider();
    sendMessage();
    kontaktsPopup();
    openProducentList()

    /** SCROLL */
    $('a[href*="#"]').on('click', function (e) {
        let anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 1000);
        e.preventDefault();
    });
});


// Полифилы

// forEach IE 11
if ('NodeList' in window && !NodeList.prototype.forEach) {
    console.info('polyfill for IE11');
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (let i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}
// closest IE 11
(function () {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            let node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();
// matches IE 11
(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();
//Array.form IE 11
if (!Array.from) {
    Array.from = function (object) {
        'use strict';
        return [].slice.call(object);
    };
}
$(window).resize(function(){
    if ($(window).width() > 768) {
        $('.header-mobile').css('display', 'none')
    }
});

const Toast = function (element, config) {
    const
        _this = this,
        _element = element,
        _config = {
            autohide: true,
            delay: 5000
        };
    for (const prop in config) {
        _config[prop] = config[prop];
    }
    Object.defineProperty(this, 'element', {
        get: function () {
            return _element;
        }
    });
    Object.defineProperty(this, 'config', {
        get: function () {
            return _config;
        }
    });
    _element.addEventListener('click', function (e) {
        if (e.target.classList.contains('toast__close')) {
            _this.hide();
        }
    });
}
Toast.prototype = {
    show: function () {
        const _this = this;
        this.element.classList.add('toast_show');
        if (this.config.autohide) {
            setTimeout(function () {
                _this.hide();
            }, this.config.delay)
        }
    },
    hide: function () {
        const event = new CustomEvent('hidden.toast', { detail: { toast: this.element } });
        this.element.classList.remove('toast_show');
        document.dispatchEvent(event);
    }
};
Toast.create = function (text, color) {
    const
        fragment = document.createDocumentFragment(),
        toast = document.createElement('div'),
        toastClose = document.createElement('button');
    toast.classList.add('toast');
    toast.style.backgroundColor = 'rgba(' + parseInt(color.substr(1, 2), 16) + ',' + parseInt(color.substr(3, 2), 16) + ',' + parseInt(color.substr(5, 2), 16) + ',0.5)';
    toast.textContent = text;
    toastClose.classList.add('toast__close');
    toastClose.setAttribute('type', 'button');
    toastClose.textContent = '×';
    toast.appendChild(toastClose);
    fragment.appendChild(toast);
    return fragment;
};
Toast.add = function (params) {
    const config = {
        header: 'Название заголовка',
        text: 'Текст сообщения...',
        color: '#ffffff',
        autohide: true,
        delay: 5000
    };
    if (params !== undefined) {
        for (const item in params) {
            config[item] = params[item];
        }
    }
    if (!document.querySelector('.toasts')) {
        const container = document.createElement('div');
        container.classList.add('toasts');
        container.style.cssText = 'position: fixed; top: 45px; right: 15px; width: 250px;';
        document.body.appendChild(container);
    }
    document.querySelector('.toasts').appendChild(Toast.create(config.text, config.color));
    const toasts = document.querySelectorAll('.toast');
    const toast = new Toast(toasts[toasts.length - 1], { autohide: config.autohide, delay: config.delay });
    toast.show();
    return toast;
};
document.addEventListener('hidden.toast', function (e) {
    const element = e.detail.toast;
    if (element) {
        element.parentNode.removeChild(element);
    }
});




