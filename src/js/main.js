
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

function showContent(i = 1) {
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







