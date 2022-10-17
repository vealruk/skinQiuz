document.addEventListener('DOMContentLoaded', function () {
    // VARIABLES
    const questions = document.querySelectorAll('.section'),
        progress = document.querySelector('.progress__bar'),
        progressStar = document.querySelectorAll('.progress__star'),
        progressSvg = document.querySelectorAll('[data-active]'),
        bg = document.querySelector('.bg'),
        plan = document.querySelector('.plan-popup'),
        checkoutOpen = document.querySelectorAll('.open-checkout'),
        planTarget = document.querySelector('#target'),
        planExtra = document.querySelector('#extra'),
        planExtraItem = document.querySelector('.list-plan-extra'),
        planExtraPlus = document.querySelector('#plus'),
        planExtraHidden = document.querySelector('#extra-hidden'),
        planAge = document.querySelector('#age'),
        alerts = document.querySelectorAll('.alert');

    let extra = '',
        area = '',
        findThis,
        re;

    // functions

    function starActive(star, svg) {
        star.classList.add('active')
        svg.setAttribute('xlink:href', '#progress_star-pink')
    }
    for (let index = 0; index < questions.length; index++) {
        let
            question = questions[index],
            questionNext = questions[+index + 1];
        const
            btnNext = question.querySelector('.btn-next'),
            inputs = question.querySelectorAll('.input'),
            otherInput = question.querySelectorAll('[data-other]'),
            prompts = question.querySelectorAll('.prompt'),
            wrapBtn = question.querySelector('.listener');

        otherInput.forEach((input) => {
            input.addEventListener('input', () => {
                if (input.checked) {
                    if (input.dataset.extra == 'Other') {
                        extra = ''
                        localStorage.setItem('extra', 'Other')
                    }
                    for (const prompt of prompts) {
                        prompt.classList.remove('vis-click')
                    }
                    // for (const btn of btnNext) {
                    btnNext.disabled = false;
                    // }
                } else {
                    // for (const btn of btnNext) {
                    btnNext.disabled = true;
                    // }
                }

                inputs.forEach((input) => {
                    input.checked = false
                })

                for (const alert of alerts) {
                    alert.classList.remove('vis')
                }
            })
        })

        for (const input of inputs) {
            if (index != 17) {
                input.addEventListener('mouseenter', () => {
                    for (const prompt of prompts) {
                        if (input.dataset.hover === prompt.dataset.prompt && !prompt.classList.contains('vis-click')) {
                            prompt.classList.add('vis')
                        } 
                    }
                })
                input.addEventListener('mouseleave', () => {
                    for (const prompt of prompts) {
                        if (input.dataset.hover === prompt.dataset.prompt && !prompt.classList.contains('vis-click')) {
                            prompt.classList.remove('vis')
                        }
                    }
                })
            }

            input.oninput = () => {
                // if (input.getAttribute('data-btn') === "true") {
                if (index == 0) {
                    localStorage.setItem('target', input.dataset.target)
                }

                if (index == 2) {
                    localStorage.setItem('age', input.dataset.age)
                }

                if (index == 3) {
                    for (const other of otherInput) {
                        other.checked = false
                    }
                    findThis = input.dataset.extra;
                    re = RegExp(`\\b${findThis}\\b`, 'g');

                    if (input.checked) {
                        if (!re.test(extra)) {
                            extra += findThis + ','
                        }
                    } else {
                        extra = extra.replace(re, '')
                            .replace(/^,*/, '')
                            .replace(/,{2,}/, ',')
                            .replace(/,$/, '')
                    }
                    localStorage.setItem('extra', extra.replace(/,$/, ''))
                }

                if (index == 6) {
                    for (const other of otherInput) {
                        other.checked = false
                    }
                }
              
                if (index == 8) {
                    findThis = input.dataset.area;
                    re = new RegExp(`\\b${findThis}\\b`, 'g');

                    if (input.checked) {
                        if (!re.test(area)) {
                            area += findThis + ','
                        }
                    } else {
                        area = area.replace(re, '')
                            .replace(/^,*/, '')
                            .replace(/,{2,}/, ',')
                            .replace(/,$/, '')
                    }
                }

                if (index == 9) {
                    for (const other of otherInput) {
                        other.checked = false
                    }
                }

                for (const prompt of prompts) {
                    if (input.dataset.hover === prompt.dataset.prompt && input.checked) {
                        prompt.classList.add('vis-click')
                        prompt.classList.remove('vis')
                    } else if (input.checked) {
                        prompt.classList.remove('vis-click')
                        prompt.classList.remove('vis')
                    } else if (input.dataset.hover === prompt.dataset.prompt && !input.checked) {
                        prompt.classList.remove('vis-click')
                    }
                }

          

                // for (const button of btnNext) {
                btnNext.disabled = false
                // }

                for (const alert of alerts) {
                    alert.classList.remove('vis')
                }

           
            }
        }

        if (wrapBtn) {
            wrapBtn.onclick = () => {
                if (btnNext.disabled) {
                    for (const alert of alerts) {
                        alert.classList.add('vis')
                    }
                }
            }
        }

        btnNext.onclick = () => {
            if (index == 3) {
                starActive(progressStar[0], progressSvg[0])
            }
            if (index == 4) {
                question.classList.add('hidden')
                questionNext.classList.remove('hidden')
                localStorage.setItem('progressSR', (index + 1))
            }
            if (index == 8) {
                localStorage.setItem('area', area.replace(/,$/, ''))
            }

            if (index == 11) {
                starActive(progressStar[1], progressSvg[1])
            }

            if (index == 17) {
                localStorage.setItem('progressLineSR', index)
                progressValue = +(progress.getAttribute('value')) - 1
            }
            if (index == 18) {
                question.classList.add('hidden')
                questionNext.classList.remove('hidden')
                starActive(progressStar[2], progressSvg[2])
                loaderStart()
                localStorage.setItem('progressSR', (index + 1))
            }
            if (index < 18) {
                dataLayer.push({
                    'event': `question_${index + 1}`,
                    'category': 'quiz',
                    'action': 'click',
                    'label': `question_${index + 1}`,
                });
            }
            if (index < 19) {
                question.classList.add('hidden')
                questionNext.classList.remove('hidden')
                progressValue = +(progress.getAttribute('value')) + 1
                progress.setAttribute(`value`, progressValue)
                localStorage.setItem('progressLineSR', index + 1)
                localStorage.setItem('progressSR', (index + 1))
            }
            window.scrollTo(0, 0);

        }

        if (index == 18) {
            break
        }
    }

    // sliders

    const aboutSlider = new Swiper('.slider-about', {
        autoHeight: true,
        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
        },
    })

    const stepAboutSlider = new Swiper('.step-slider-about', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoHeight: true,
        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
        },
    })

    aboutSlider.controller.control = stepAboutSlider;
    stepAboutSlider.controller.control = aboutSlider;

    const resultsSlider = new Swiper('.slider-results', {
        pagination: {
            el: '.swiper-pagination',
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    })

    // loader 
    const loaderProgress = document.querySelectorAll('.item-loader__progress'),
        loaderItem = document.querySelectorAll('.item-loader');

    function valueLoader(progress) {
        let counter = 0,
            interval = setInterval(() => {
                counter++
                progress.setAttribute('value', counter)
                counter > 99 ? clearInterval(interval) : false;
            }, 30)
    }

    function timeoutLoader(time, index) {
        setTimeout(() => {
            loaderItem[index].style.display = 'block'
            valueLoader(loaderProgress[index])
        }, time);
    }

    function planPopup(target, extra, extraHidden, age) {
        target.innerHTML = `${localStorage.target}`
        age.innerHTML = `${localStorage.age}`

        extraStr = `${localStorage.extra}`

        extraStr = extraStr.split(',')

        if (extraStr.length == 1) {
            extra.innerHTML = extraStr
        } else if (extraStr.length > 1) {
            planExtraPlus.style.cssText = 'display: inline;'
            extra.innerHTML = extraStr[0]
            for (let i = 1; i < extraStr.length; i++) {
                extraHidden.innerHTML += extraStr[i] + ', '
            }
            extraHidden.innerHTML = extraHidden.innerHTML.replace(/,\s$/, '')
        }
    }

    function loaderStart() {

        planPopup(planTarget, planExtra, planExtraHidden, planAge)

        valueLoader(loaderProgress[0])

        timeoutLoader(3222, 1)
        timeoutLoader(6444, 2)

        setTimeout(() => {
            bg.classList.remove('hidden')
            plan.classList.remove('hidden')
        }, 9666);
    }

    planExtraPlus.onclick = () => {
        planExtraItem.classList.add('active')
        planExtraPlus.innerHTML = ','
        planExtraPlus.classList.add('not')
    }

    for (const open of checkoutOpen) {
        open.onclick = () => {
            window.location.href = 'checkout.html'
            localStorage.setItem('progress', 20)
        
        }
    }


    function saveProgressLine() {
        let progressLine = localStorage.getItem('progressLineSR');

        for (let index = 0; index < +progressLine; index++) {
            progressValue = +(progress.getAttribute('value')) + 1;
            progress.setAttribute(`value`, progressValue);

            if (index == 3) {
                starActive(progressStar[0], progressSvg[0])
                progressValue = +(progress.getAttribute('value'));
                progress.setAttribute(`value`, progressValue);
            }
            if (index == 11) {
                starActive(progressStar[1], progressSvg[1])
                progressValue = +(progress.getAttribute('value'));
                progress.setAttribute(`value`, progressValue);
            }
            if (index == 18) {
                starActive(progressStar[2], progressSvg[2])
                progressValue = +(progress.getAttribute('value'));
                progress.setAttribute(`value`, progressValue);
            }
        }
    }

    function storageLoad() {
        let i = localStorage.getItem('progressSR'),
            question = questions[i],
            start = questions[0];

        if (i == 19) {
            loaderStart()
            start.classList.add('hidden')
            question.classList.remove('hidden')
        } else if (i == 20) {
            start.classList.add('hidden')
            plan.classList.remove('hidden')
            bg.classList.remove('hidden')
        } else if (i) {
            start.classList.add('hidden')
            question.classList.remove('hidden')
        }
    }

    saveProgressLine()
    storageLoad()
})