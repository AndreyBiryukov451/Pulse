
// slider

const swiper = new Swiper('.swiper', {

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        enabled: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.carousel__btn-next',
        prevEl: '.carousel__btn-prev',
    },

    loop: true,

    breakpoints: {
        980: {
            pagination: {
                el: '.swiper-pagination',
                enabled: false,
            },
        }
    }
});

// Change cards

const moreBtn = document.querySelectorAll('.card__link'),
    backBtn = document.querySelectorAll('.card__back'),
    mainSide = document.querySelectorAll('.card__main'),
    infoSide = document.querySelectorAll('.card__info');

function changeCardInner(btn) {
    btn.forEach((item, i) => {
        item.addEventListener('click', e => {
            e.preventDefault();
            mainSide[i].classList.toggle('card__main_active');
            infoSide[i].classList.toggle('card__info_active')
        })
    })
}

changeCardInner(moreBtn);
changeCardInner(backBtn);

// Tabs

const tabs = document.querySelectorAll('.catalog__tab'),
    tabContent = document.querySelectorAll('.catalog__content'),
    tabsContainer = document.querySelector('.catalog__tabs');

function hideContent() {
    tabs.forEach(item => {
        item.classList.remove('catalog__tab_active')
    })
    tabContent.forEach(item => {
        item.style.display = 'none'
    })
}

function showContent(i = 0) {
    tabs[i].classList.add('catalog__tab_active');
    tabContent[i].style.display = 'grid';
}

hideContent();
showContent();

function showCurentTab() {
    tabsContainer.addEventListener('click', (event) => {
        if (event.target && (event.target.classList.contains('catalog__tab') || event.target.closest('.catalog__tab'))) {
            tabs.forEach((item, i) => {
                if ((event.target == item) || (event.target.closest('.catalog__tab') == item)) {
                    hideContent()
                    showContent(i)
                }
            })
        }
    })
};

showCurentTab();

// Modals

const overlay = document.querySelector('.overlay'),
    btn = document.querySelectorAll('button'),
    consultationModal = document.querySelector('#consultation'),
    orderModal = document.querySelector('#order'),
    closeBtn = document.querySelectorAll('.modal__close');


function openModal(modal) {
    overlay.style.display = 'block';
    modal.style.display = 'block';
}

btn.forEach((item) => {
    item.addEventListener('click', (e) => {
        if (e.target.classList.contains('button_mini')) {
            orderModal.querySelector('.modal__subtitle').textContent =
                e.target.closest('.card').querySelector('.card__subtitle').textContent;
            openModal(orderModal)
        } else if (e.target.getAttribute('data-modal') === 'consultation') {
            openModal(consultationModal)
        }
    })
});

function closeModal(btn) {
    overlay.style.display = 'none';
    btn.closest('.modal').style.display = 'none'
};

closeBtn.forEach(item => {
    item.addEventListener('click', e => {
        closeModal(e.target)
    })
});


// form validation

const form = document.querySelectorAll('.form');

let textMessage = {
    email: 'некорктный запрос',
    name: 'Введите имя',
    phone: 'Введите телефон'
};

form.forEach(item => {

    const elem = item.querySelectorAll('input')

    item.addEventListener('submit', e => {
        e.preventDefault();

        elem.forEach(input => {

            let existingMessage = input.nextElementSibling;
            if (existingMessage && existingMessage.classList.contains('error')) {

                existingMessage.remove();
            }

            let message = document.createElement('div');

            function addMessage(text) {
                message.textContent = text;
                message.classList.add('error')
                input.insertAdjacentElement('afterend', message);
                input.style.border = '1px solid red'
            }

            if (!input.value && input.getAttribute('type') === 'text') {
                addMessage(textMessage.name)
            } else if (!input.value && input.getAttribute('name') === 'phone') {
                addMessage(textMessage.phone)
            } else if (!input.value && input.getAttribute('type') === 'email') {
                addMessage(textMessage.email)
            }
            else {
                input.style.border = 'none'
            }
        });
    });
});

// Phone Mask

const phoneInput = document.querySelectorAll('[name = "phone"]');
const maskOptions = {
    mask: '+{3}(000)000-00-00'
};

for (let i = 0; i < phoneInput.length; i++) {
    let mask = IMask(phoneInput[i], maskOptions);
}

// Scroll

const arrowUp = document.querySelector('.uparrow');

window.addEventListener('scroll', e => {
    e.preventDefault()
    if (window.scrollY > 700) {
        arrowUp.style.display = 'block'
    } else {
        arrowUp.style.display = 'none'
    }
})

let links = document.querySelectorAll('[href^="#"]'),
    speed = 0.3;

links.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        let widthTop = document.documentElement.scrollTop,
            hash = this.hash,
            toBlock = document.querySelector(hash).getBoundingClientRect().top,
            start = null;

        requestAnimationFrame(step);

        function step(time) {
            if (start === null) {
                start = time;
            }

            let progress = time - start,
                r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock));

            document.documentElement.scrollTo(0, r);

            if (r != widthTop + toBlock) {
                requestAnimationFrame(step);
            } else {
                location.hash = hash;
            }
        }
    });
});




