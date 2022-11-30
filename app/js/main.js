window.addEventListener('DOMContentLoaded', () => {
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

  function parallaxPromo() {
    const promo = document.querySelectorAll('.promo');

    promo.forEach((el) => {
      if (el) {
        parallaxMouse({
          elements: '.promo__preview',
          moveFactor: 5,
          wrap: '.promo',
          perspective: '100px',
        });
      }
    });

    const launch = document.querySelectorAll('.launch');

    launch.forEach((el) => {
      if (el) {
        parallaxMouse({
          elements: '.launch__img',
          moveFactor: 15,
          wrap: '.launch',
          perspective: '100px',
        });
      }
    });
  }
  parallaxPromo();

  const tl = new TimelineMax();
  // const mySplitText = new SplitText('.promo__title', {
  //   type: 'chars',
  // });
  // const chars = mySplitText.chars;
  // tl.staggerFrom(
  //   chars,
  //   0.45,
  //   {
  //     opacity: 0,
  //   },
  //   0.1
  // );
  // ! Header and Promo
  tl.from('.header__logo', 0.7, {
    y: -20,
    opacity: 0,
  });
  tl.from('.header__link', 0.4, {
    y: -20,
    opacity: 0,
  });
  tl.from('.header-contacts', 0.4, {
    y: -20,
    opacity: 0,
  });
  tl.from('nav', 0.4, {
    y: -20,
    opacity: 0,
  });

  tl.from(
    ['.hero__offer', '.promo__text', '.promo__title', '.promo__btn'],
    0.4,
    {
      y: -20,
      opacity: 0,
    }
  )
  .from(['.hero__preview', '.promo__preview'], 0.4, {
      y: -20,
      opacity: 0,
    })
    .from('.hero__download', 0.2, {
      y: -20,
      opacity: 0,
    })
    .to('.hero__download', 0.2, {
      y: 0,
      opacity: 1,
    })
    .to('.promo__btn', 0.2, {
      y: 0,
      opacity: 1,
    });

  function showProjects() {}
  showProjects();

  // * ===== Mask input
  $('input[type="tel"]').mask('+7 (999) 999-99-99');

  //   // * ===== Nice Select
  //   // $('select').niceSelect();

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
