document.addEventListener('DOMContentLoaded', function () {
    var lang = document.documentElement.lang,
        bundle_id = 'com.skinrestart.app';
    country = 'US',
        currency = 'usd',
        total = {
            label: 'SKIN RESTART',
            amount: 99,
        };
    let urls = new URL(window.location);






    const bg = document.querySelector('.modal-bg'),
        contact = document.querySelector('.contact-popup'),
        body = document.querySelector('body'),
        contactBtn = document.querySelector('.contact-popup__btn'),
        emailInput = document.querySelector('#email'),
        tabs = document.querySelectorAll('.main-ask'),
        payment = document.querySelector('.payment-popup'),
        openPayment = document.querySelector('.open-payment'),
        leed = document.querySelector('.ui-zone'),
        info = document.querySelector('#info'),
        header = document.querySelector('.header'),
        btnsScroll = document.querySelectorAll('.scroll-btn'),
        exploreBtn = document.querySelector('.explore'),
        thanks = document.querySelector('.thanks-popup'),
        thanksBg = document.querySelector('.thanks-bg'),
        thanksBtn = document.querySelector('.thanks-popup__btn'),
        programm = document.querySelector('.dynamic-programm');

    function getImg(mount) {
        let area = '',
            imgCreate = '';

        area = (`${localStorage.area}`);
        area = area.split(',')

        imgCreate = area.map(img =>
            `<div class="programm-img">
        <img src="img/${img}.png" alt="${img}">
        <p class="programm-img__text">${img}</p></div>`).join('')
        mount.innerHTML = imgCreate
    }

    if (localStorage.area) {
        getImg(programm)
    }

    window.addEventListener('scroll', () => {
        if (window.innerWidth >= 767) {
            if (pageYOffset <= 2000) {
                header.classList.remove('hid')
            } else if (pageYOffset >= 2800) {
                header.classList.remove('hid')
            } else {
                header.classList.add('hid')
            }
        } else {
            if (pageYOffset <= 2800) {
                header.classList.remove('hid')
            } else if (pageYOffset >= 3500) {
                header.classList.remove('hid')
            } else {
                header.classList.add('hid')
            }

        }
    })

    if (localStorage.emailSR) {
        bg.classList.add('hidden')
        contact.classList.add('hidden')
        body.classList.remove('overflow')
    }

    function validateEmail(input) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(input);
    }

    function validate() {
        const email = emailInput.value;
        localStorage.setItem('emailSR', email)
        if (validateEmail(email)) {
            contactBtn.disabled = false
        } else {
            contactBtn.disabled = true
        }
        return false;
    }

    emailInput.oninput = () => {
        validate();
    }

    contactBtn.onclick = () => {
        bg.classList.add('hidden')
        contact.classList.add('hidden')
        body.classList.remove('overflow')
     
      
    }

    openPayment.onclick = () => {
        payment.classList.remove('hidden')
        body.classList.add('overflow')
        bg.classList.remove('hidden')
     
    }

  

    // scroll

    const scroll = new SmoothScroll();

    for (const btnScroll of btnsScroll) {
        // if (window.innerWidth >= 767) {
            btnScroll.onclick = () => {
                dataLayer.push({
                    'event': 'claim_my_plan',
                    'category': 'quiz_checkout',
                    'action': 'click',
                    'label': 'claim_my_plan'
                });
                scroll.animateScroll(document.querySelector('#leed'), {
                    speed: 800,
                    updateURL: false,
                    offset: 200,
                    // header: header
                })
            }
    
    }

    exploreBtn.onclick = () => {
        scroll.animateScroll(info, {
            speed: 800,
            updateURL: false,
            // header: header
        })
    }

    function timer(deadline, m, s) {
        // id таймера
        let
            timerId = null;
        // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
        function countdownTimer() {
            // сейчас
            let
                now = new Date().getTime();
            let
                diff = deadline - now;
            if (diff <= 0) {
                clearInterval(timerId);
            }
            let
                minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0,
                seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
            m.textContent = minutes < 10 ? '0' + minutes : minutes;
            s.textContent = seconds < 10 ? '0' + seconds : seconds;
        }
        // вызываем функцию countdownTimer
        countdownTimer();
        // вызываем функцию countdownTimer каждую секунду
        timerId = setInterval(countdownTimer, 1000);
    }

    m = document.querySelector('.header-min')
    s = document.querySelector('.header-sec')

    // m2 = document.querySelector('.leed-min')
    // s2 = document.querySelector('.leed-sec')

    const deadline = new Date().getTime() + (900 * 1000);

    timer(deadline, m, s);
    // timer(deadline, m2, s2);

    // elem view

    // Координаты объекта
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        }
    }

    // Анимации при скролле
    const animItems = document.querySelectorAll('.circle');

    window.addEventListener('scroll', animOnScroll);

    function animOnScroll() {
        if (animItems.length > 0) {
            for (let index = 0; index < animItems.length; index++) {
                const anim = animItems[index],
                    animItemHeight = anim.offsetHeight,
                    animItemOffset = offset(anim).top,
                    animStart = 4;

                // Момент анимации
                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    anim.classList.add('animated');
                } else {
                    anim.classList.add('animated');
                }
            }
        }
    }

    // video

    const videoContainer = document.querySelectorAll('.video');

    //Запускаем видео или ставим на паузу
    for (const videoItem of videoContainer) {
        let video = videoItem.querySelector('.video__player')

        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                videoItem.classList.add('play')
            } else {
                video.pause();
                videoItem.classList.remove('play');
            }
        })
    }

    // tabs

    for (const tab of tabs) {
        tab.onclick = () => {
            tab.parentElement.classList.toggle('open')
        }
    }

    // slider
    const feedbackSlider = new Swiper('.feedback', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoHeight: true,
        slidesPerView: 2,
        spaceBetween: 30,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        loop: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            1299: {
                slidesPerView: 2,
            },
        }
    })

    // stripe

    const stripeBtn = document.querySelector('.form-payment__btn');
    const formPayment = document.querySelector('.form-payment');
    const stripeLoader = document.querySelector('.lds-dual-ring');
    const checkoutBtn = document.querySelector('.thanks-popup__btn.checkout-btn');
    const thanksPopup = document.querySelector('.thanks-popup.hidden');

    const PUBLISHABLE_KEY = 'pk_test_51IsNCwLBx5miI8AdCWt5J1FhYZ2UmGgbM3RF2ysUGZZWMHuMEcbUN109480eC4Pfwirsv6LDCx59pcaFrT3iJaQk00c1d0A68w';

    let cardElement;
    let cardElement2;
    let cardElement3;

    const stripe = Stripe(PUBLISHABLE_KEY, {
        locale: 'en',
        apiVersion: '2020-08-27',
    });

    //АВТОВЫПОЛНЯЕТСЯ <---------------------------------------------------!!!!!!!!!!!!!!!!!!!!!
    (function initStripe() {
        const elements = stripe.elements();

        cardElement = elements.create('cardNumber');
        cardElement2 = elements.create('cardExpiry');
        cardElement3 = elements.create('cardCvc');

        cardElement.mount('#card-element');
        cardElement2.mount('#card-element2');
        cardElement3.mount('#card-element3');

        cardElement.on('change', function (event) {
            const displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = 'Your card number is invalid.';
                Object.assign(displayError.style, {
                    color: '#f00',
                    fontSize: '16px',
                    marginTop: '5px',
                });
                stripeBtn.disabled = true;
            } else {
                displayError.textContent = '';
                Object.assign(displayError.style, {
                    color: '#fa755a',
                    iconColor: '#fa755a',
                });
                // stripeBtn.innerHTML = 'Get your free 14-day trial';
                stripeBtn.disabled = false;
            }
        });
        cardElement2.on('change', function (event) {
            const displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = 'Your card date is invalid.';
                Object.assign(displayError.style, {
                    color: '#f00',
                    fontSize: '16px',
                    marginTop: '5px',
                });
                stripeBtn.disabled = true;
            } else {
                displayError.textContent = '';
                Object.assign(displayError.style, {
                    color: '#fa755a',
                    iconColor: '#fa755a',
                });
                // stripeBtn.innerHTML = 'Get your free 14-day trial';
                stripeBtn.disabled = false;
            }
        });
        cardElement3.on('change', function (event) {
            const displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = 'Your card cvv is invalid.';
                Object.assign(displayError.style, {
                    color: '#f00',
                    fontSize: '16px',
                    marginTop: '5px',
                });
                stripeBtn.disabled = true;
            } else {
                displayError.textContent = '';
                Object.assign(displayError.style, {
                    color: '#fa755a',
                    iconColor: '#fa755a',
                });
                // stripeBtn.innerHTML = 'Get your free 14-day trial';
                stripeBtn.disabled = false;
            }
        });
    })();

   
    async function onPayClick() {
        stripeBtn.disabled = true;
        stripeLoader.style.display = 'block'
        stripeBtn.style.display = "none"
        // const response = await fetch('stripe.php', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify()
        // }).then(res => res.json()).then(data =>  
        //   stripe
        //   .confirmCardPayment(data.client_secret, {
        //     payment_method: {
        //       card: cardElement,
        //     },
        //   })
        //   .then((result) => {
        //     if (result.error) {
        //         stripeLoader.style.display = 'none'
        //         stripeBtn.style.display = "flex"
        //       return;
        //     }
     
            setTimeout(() => {
                thanks.classList.remove('hidden')
                thanksBg.classList.remove('hidden')
                stripeLoader.style.display = 'none'
                formPayment.style.display = 'none'
                openPayment.disabled = true
            }, 4000);
          
      }
   
    const cardHolder = document.querySelector('#name-inp');
    cardHolder.addEventListener('input', (e) => {
        if (cardHolder.value.length > 2) {
            stripeBtn.removeAttribute('disabled', 'disabled');
        } else {
            stripeBtn.setAttribute('disabled', 'disabled');
        }
    });

  

    stripeBtn.onclick = () => {
        onPayClick()
    }
    checkoutBtn.addEventListener('click', ()=> {
       
        window.location.href = 'index.html'
      
    })

  
})












