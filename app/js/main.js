// ! Header and Promo
// function headerPromoHeroAnim() {
//   if (window.innerWidth > 990) {
//     TweenMax.from('.header__logo', 0.6, {
//       delay: 0.5,
//       opacity: 0,
//     });
//     TweenMax.to('.header__logo', 0.6, {
//       delay: 0.5,
//       opacity: 1,
//     });

//     TweenMax.from(['.hero__preview', '.promo__preview'], 1.5, {
//       delay: 1,
//       opacity: 0,
//       y: '-10%',
//       ease: Expo.easeInOut,
//     });
//     TweenMax.staggerFrom(
//       '.menu__item',
//       1,
//       {
//         delay: 0.5,
//         opacity: 0,
//         y: 50,
//         scale: 1.5,
//         ease: Expo.easeInOut,
//       },
//       0.2
//     );
//     TweenMax.from(['.hero__title', '.promo__title'], 1, {
//       opacity: 0,
//       delay: 0.4,
//       x: -80,
//       ease: Expo.easeInOut,
//     });
//     TweenMax.from(['.hero__text', '.promo__text'], 1, {
//       delay: 0.4,
//       opacity: 0,
//       x: -80,
//       ease: Expo.easeInOut,
//     });
//     TweenMax.from('.header__link', 1, {
//       delay: 0.3,
//       opacity: 0,
//       y: -40,
//       ease: Expo.easeInOut,
//     });
//     TweenMax.from('.header-contacts', 1, { delay: 0.4, y: -20, opacity: 0 });
//     TweenMax.from('.hero__download', 1, {
//       dealy: 0.4,
//       x: '500%',
//       opacity: 0,
//       ease: Expo.easeInOut,
//     });
//     TweenMax.from('.promo__btn', 1, {
//       dealy: 0.4,
//       x: '-500%',
//       opacity: 0,
//       ease: Expo.easeInOut,
//     });
//   } else {
//     return;
//   }
// }
// headerPromoHeroAnim();
// window.addEventListener('load ', );

window.addEventListener('DOMContentLoaded', () => {
  (function loadForm() {
    let inputs = document.querySelectorAll('.input-file-upload');
    Array.prototype.forEach.call(inputs, function (input) {
      let label = input.previousElementSibling,
        labelVal = label.querySelector('.custom-file-upload span').innerText;

      input.addEventListener('change', function (e) {
        let countFiles = '';
        if (this.files && this.files.length >= 1)
          countFiles = this.files.length;

        if (countFiles)
          label.querySelector('.custom-file-upload span').innerText =
            'Выбрано файлов: ' + countFiles;
        else
          label.querySelector('.custom-file-upload span').innerText = labelVal;
      });
    });
  })();

  const tilt = $('.js-tilt').tilt();

  AOS.init();

  // * ==== Magnetic Button
  const magneticMouseEvent = {
    power: {
      x: 20,
      y: 20,
    },

    events: [],
    ing: false,
    target: null,

    onInit() {
      const _this = this;

      //===
      const events = document.querySelectorAll('.magnetic-btn');
      for (let i = 0; i < events.length; i++) {
        _this.events.push({
          el: events[i],
          enter: {
            func: null,
            event: null,
          },
          leave: {
            func: null,
            event: null,
          },
        });
      }

      //===
      for (let i = 0; i < this.events.length; i++) {
        const v = this.events[i];
        v.enter.func = function (e) {
          _this.target = e.target;
          _this.ing = true;
        };
        v.enter.event = v.el.addEventListener('mouseenter', v.enter.func);
        v.leave.func = function (e) {
          _this.onMouseLeave();
          _this.ing = false;
        };
        v.leave.event = v.el.addEventListener('mouseleave', v.leave.func);
      }
    },

    onMouseMove(e) {
      //===
      if (this.ing && this.target) {
        const x = e.clientX;
        const y = e.clientY;
        const rect = this.target.getBoundingClientRect();
        const ax = ((x - rect.left) / rect.width - 0.5) * 2; // -1 ~ 1
        const ay = ((y - rect.top) / rect.height - 0.5) * 2; // -1 ~ 1
        const dx = (ax * 180 * Math.PI) / 180;
        const dy = (ay * 180 * Math.PI) / 180;
        gsap.to(this.target, {
          duration: 0.4,
          rotation: dx,
          x: dx * this.power.x,
          y: dy * this.power.y,
        });
      }
    },

    onMouseLeave() {
      gsap.to(this.target, {
        duration: 0.8,
        rotation: 0,
        x: 0,
        y: 0,
        ease: 'power2.out',
      });
    },

    onDestroy() {
      //===
      for (let i = 0; i < this.events.length; i++) {
        const v = this.events[i];
        v.el.removeEventListener('mouseenter', v.enter.func);
        v.el.removeEventListener('mouseleave', v.leave.func);
      }
      this.events = [];

      //===
      this.ing = false;
    },
  };

  magneticMouseEvent.onInit();
  window.addEventListener('mousemove', (e) => {
    magneticMouseEvent.onMouseMove(e);
  });
  // !

  // function parallaxPromo() {
  //   const promo = document.querySelectorAll('.promo');

  //   promo.forEach((el) => {
  //     if (el) {
  //       parallaxMouse({
  //         elements: '.promo__preview',
  //         moveFactor: 5,
  //         wrap: '.promo',
  //         perspective: '100px',
  //       });
  //     }
  //   });

  //   const launch = document.querySelectorAll('.launch');

  //   launch.forEach((el) => {
  //     if (el) {
  //       parallaxMouse({
  //         elements: '.launch__img',
  //         moveFactor: 15,
  //         wrap: '.launch',
  //         perspective: '100px',
  //       });
  //     }
  //   });
  // }
  // parallaxPromo();

  function showProjects() {}
  showProjects();

  function textareaPlaceholder() {
    const textarea = document.querySelectorAll('textarea');
    textarea.forEach((el) => {
      el.addEventListener('input', (e) => {
        console.log(e.target.value);
        if (e.target.value) {
          e.target.nextElementSibling.style.display = 'none';
        }

        if (!e.target.value) {
          e.target.nextElementSibling.style.display = 'block';
        }
      });
    });
  }
  textareaPlaceholder();

  // * ===== Mask input
  $('input[type="tel"]').mask('+7 (999) 999-99-99');

  // * ===== Nice Select
  $('select').niceSelect();

  function multiStepForm() {
    const btnNext = document.querySelector('.form-order__next');
    const btnSubmit = document.querySelector('.btn-submit');
    const content = document.querySelectorAll('.form-order__inner');
    const inputs = document.querySelectorAll('.form-order__inner input');
    let count = 0;

    if (btnNext) {
      btnNext.addEventListener('click', (e) => {
        count++;
        content[count].previousElementSibling.classList.remove('active');
        content[count].classList.add('active');

        if (count === content.length - 1) {
          btnNext.style.display = 'none';
          btnSubmit.style.display = 'block';
        }
      });
    }
  }
  multiStepForm();

  // * ===== Slider
  (function slider() {
    const sliderEl = document.querySelector('.cases__slider');
    new Swiper(sliderEl, {
      slidesPerView: 1,
      navigation: {
        nextEl: '.cases__slider .swiper-button-next',
        prevEl: '.cases__slider .swiper-button-prev',
      },
    });
  })();

  // * ===== Accordion
  const toggleAccordion = (accordionControl, accordionContent, accordion) => {
    const filters = document.querySelectorAll(accordionControl);
    filters.forEach((el) => {
      if (el) {
        el.addEventListener('click', (e) => {
          const target = e.target.closest(accordion);
          const content = target.querySelector(accordionContent);
          target.classList.toggle('active');
          if (target.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
          } else {
            content.style.maxHeight = null;
          }
        });
      }
    });
  };
  toggleAccordion('.accordion-control', '.accordion-content', '.accordion');

  // * ===== Fixed Header
  (function fixedHeader() {
    function scrollHeader() {
      const nav = document.querySelector('header');
      if (this.scrollY >= 90) {
        nav.classList.add('scroll-header');
      } else {
        nav.classList.remove('scroll-header');
      }
    }

    window.addEventListener('scroll', scrollHeader);

    // ! Change
    function changeBg() {
      const header = document.querySelector('header');
      if (window.pageYOffset >= 90) {
        header.classList.add('scroll-header');
      }
    }

    changeBg();
  })();

  // * ===== Show Menu
  (function showMenu() {
    const menuBtn = document.querySelector('.header__toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuCloseBtn = document.querySelector('.mobile-menu__close');
    const body = document.querySelector('body');
    const overlay = document.querySelector('.overlay');

    menuBtn.addEventListener('click', (e) => {
      menu.classList.toggle('active');
      overlay.classList.toggle('active');
      body.classList.toggle('no-scroll');
    });

    overlay.addEventListener('click', (e) => {
      menu.classList.remove('active');
      overlay.classList.remove('active');
      body.classList.remove('no-scroll');
    });

    menuCloseBtn.addEventListener('click', (e) => {
      menu.classList.remove('active');
      overlay.classList.remove('active');
      body.classList.remove('no-scroll');
    });
  })();

  //   // * ===== Modal
  //   (function modals() {
  //     function bindModal(openBtn, modal, close) {
  //       const openBtnEl = document.querySelectorAll(openBtn);
  //       const modalEl = document.querySelector(modal);
  //       const closeEl = document.querySelectorAll(close);
  //       const body = document.querySelector('body');
  //       if (modalEl) {
  //         openBtnEl.forEach((el) => {
  //           el.addEventListener('click', (e) => {
  //             if (e.target) {
  //               e.preventDefault();
  //             }
  //             modalEl.classList.add('active');
  //             body.classList.add('no-scroll');
  //           });
  //         });
  //         closeEl.forEach((btn) => {
  //           btn.addEventListener('click', (e) => {
  //             modalEl.classList.remove('active');
  //             body.classList.remove('no-scroll');
  //           });
  //         });
  //         modalEl.addEventListener('click', (e) => {
  //           if (e.target === modalEl) {
  //             modalEl.classList.remove('active');
  //             body.classList.remove('no-scroll');
  //           }
  //         });
  //       }
  //     }
  //     bindModal('.online-booking-btn', '.popup--online-booking', '.popup__close');
  //   })();
});
