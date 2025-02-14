
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
    tabContent[i].style.display = 'grid'
}

hideContent()
showContent()

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
}

showCurentTab()

// Modals

const overlay = document.querySelector('.overlay'),
    btn = document.querySelectorAll('button'),
    consultationModal = document.querySelector('#consultation'),
    orderModal = document.querySelector('#order'),
    closeBtn = document.querySelectorAll('.modal__close')


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
})

function closeModal(btn) {
    overlay.style.display = 'none';
    btn.closest('.modal').style.display = 'none'
}

closeBtn.forEach(item => {
    item.addEventListener('click', e => {
        closeModal(e.target)
    })
})








