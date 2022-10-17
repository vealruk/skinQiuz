// localStorage.clear();

var utm_campaign,
    utm_source,
    utm_medium,
    test,
    utm_term,
    utm_content;
let params = window
    .location
    .search
    .replace('?', '')
    .split('&')
    .reduce(
        function (p, e) {
            var a = e.split('=');
            p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        }, {}
    );
for (const key in params) {
    if (key == "utm_campaign") {
        utm_campaign = params['utm_campaign'];
    }
    if (key == "utm_source") {
        utm_source = params['utm_source'];
    }
    if (key == "utm_medium") {
        utm_medium = params['utm_medium'];
    }
    if (key == "utm_term") {
        utm_term = params['utm_term'];
    }
    if (key == "utm_content") {
        utm_content = params['utm_content'];
    }
}
localStorage.setItem('utm_campaign', `${utm_campaign}`)
localStorage.setItem('utm_source', `${utm_source}`)
localStorage.setItem('utm_medium', `${utm_medium}`)
localStorage.setItem('utm_term', `${utm_term}`)
localStorage.setItem('utm_content', `${utm_content}`)

var lang = document.documentElement.lang,
    quiz_id = 'fitnessquiz',
    bundle_id = 'com.skinrestart.app';
// amount = localStorage.setItem('amount_skinrestart', '0.99');
let urls = new URL(window.location);

const startInputs = document.querySelectorAll("[data-disabled]");
const startQuiz = document.querySelector(".step-goal__btn");

startQuiz.addEventListener("click", (e) => {
    getResponse();
});

// localStorage.setItem('utm_facetory', urls.search);

/* real */
window.endPoint = '';

/* test */
// window.endPoint = 'https://api-dev.myedusystem.com/web/';

if (localStorage.getItem('load-quiz_skinrestart') !== 'load') {
    getResponse();
}
// РЅР°С‡Р°Р»СЊРЅС‹Р№ Р·Р°РїСЂРѕСЃ Рє СЃРµСЂРІРµСЂСѓ Рё РїРѕР»СѓС‡РµРЅРёРµ id
async function getResponse() {
    const url = `${endPoint}open_test?bundle_id=${bundle_id}&lang=${lang}`;

    let response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                price: 99,
                quiz_id: quiz_id,
                site: window.location.href,
                utm_campaign: localStorage.getItem('utm_campaign'),
                utm_source: localStorage.getItem('utm_source'),
                utm_medium: localStorage.getItem('utm_medium'),
                utm_term: localStorage.getItem('utm_term'),
                utm_content: localStorage.getItem('utm_content'),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(resp => resp.json())
        // .then(json => json)
        .catch(error => {
            console.log('Error:', error);
        });

    // let data = await response;

    localStorage.setItem('code_skinrestart', `${response.data.code}`);
    localStorage.setItem('id_skinrestart', `${response.data.id}`);
    localStorage.setItem('load-quiz_skinrestart', 'load');

    checkID();
}

function checkID() {
    if (!localStorage.getItem('id_skinrestart')) {
        for (const item of startInputs) {
            item.disabled = true;
        }
        // startQuiz.disabled = true;
    } else {
        for (const item of startInputs) {
            item.disabled = false;
        }
        // startQuiz.disabled = false;
    }
}
checkID();

document.addEventListener('click', (e) => {
    checkID();
});