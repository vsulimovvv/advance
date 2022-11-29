window.addEventListener('DOMContentLoaded', () => {
  const tilt = $('.js-tilt').tilt();

  AOS.init();

  //
  const lerp = (current, target, factor) =>
    current * (1 - factor) + target * factor;

  let mousePosition = { x: 0, y: 0 };
  window.addEventListener('mousemove', (e) => {
    mousePosition.x = e.pageX;
    mousePosition.y = e.pageY;
  });

  const calculateDistance = (x1, y1, x2, y2) => {
    return Math.hypot(x1 - x2, y1 - y2);
  };

  // ------------------------------------------------------------------------
  // class MagneticObject {
  //   constructor(domElement) {
  //     this.domElement = domElement;
  //     this.boundingClientRect = this.domElement.getBoundingClientRect();
  //     this.triggerArea = 200;
  //     this.interpolationFactor = 0.8;

  //     this.lerpingData = {
  //       x: { current: 0, target: 0 },
  //       y: { current: 0, target: 0 },
  //     };

  //     this.render();
  //     this.resize();
  //   }

  //   resize() {
  //     window.addEventListener('resize', () => {
  //       this.boundingClientRect = this.domElement.getBoundingClientRect();
  //     });
  //   }

  //   render() {
  //     const distanceFromMouseToCenter = calculateDistance(
  //       mousePosition.x,
  //       mousePosition.y,
  //       this.boundingClientRect.left + this.boundingClientRect.width / 2,
  //       this.boundingClientRect.top + this.boundingClientRect.height / 2
  //     );

  //     let targetHolder = { x: 0, y: 0 };

  //     if (distanceFromMouseToCenter < this.triggerArea) {
  //       this.domElement.classList.add('focus');
  //       targetHolder.x =
  //         (mousePosition.x -
  //           (this.boundingClientRect.left +
  //             this.boundingClientRect.width / 2)) *
  //         0.2;
  //       targetHolder.y =
  //         (mousePosition.y -
  //           (this.boundingClientRect.top +
  //             this.boundingClientRect.height / 2)) *
  //         0.2;
  //       console.log(targetHolder);
  //     } else {
  //       this.domElement.classList.remove('focus');
  //     }
  //     this.lerpingData['x'].target = targetHolder.x;
  //     this.lerpingData['y'].target = targetHolder.y;

  //     for (const item in this.lerpingData) {
  //       this.lerpingData[item].current = lerp(
  //         this.lerpingData[item].current,
  //         this.lerpingData[item].target,
  //         this.interpolationFactor
  //       );
  //     }

  //     this.domElement.style.transform = `translate(${this.lerpingData['x'].current}px, ${this.lerpingData['y'].current}px)`;

  //     window.requestAnimationFrame(() => this.render());
  //   }
  // }

  // const buttons = document.querySelectorAll('button');
  // buttons.forEach((button) => {
  //   return button;
  // });
  // new MagneticObject(button);
  //
  // !
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
  // * ==== Magnetic Button
  // var magnets = document.querySelectorAll('button ');
  // var strength = 50;

  // magnets.forEach((magnet) => {
  //   magnet.addEventListener('mousemove', moveMagnet);
  //   magnet.addEventListener('mouseout', function (event) {
  //     TweenMax.to(event.currentTarget, 1, { x: 0, y: 0, ease: Power4.easeOut });
  //   });
  // });

  // function moveMagnet(event) {
  //   var magnetButton = event.currentTarget;
  //   var bounding = magnetButton.getBoundingClientRect();

  //   TweenMax.to(magnetButton, 1, {
  //     x:
  //       ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.11) *
  //       strength,
  //     y:
  //       ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.11) *
  //       strength,
  //     ease: Power4.easeOut,
  //   });

  // magnetButton.style.transform = 'translate(' + (((( event.clientX - bounding.left)/(magnetButton.offsetWidth))) - 0.5) * strength + 'px,'+ (((( event.clientY - bounding.top)/(magnetButton.offsetHeight))) - 0.5) * strength + 'px)';
  // }
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

    // const additionally = document.querySelectorAll('.additionally');

    // additionally.forEach((el) => {
    //   if (el) {
    //     parallaxMouse({
    //       elements: '.additionally__preview',
    //       moveFactor: 0.0000001,
    //       wrap: '.additionally',
    //       perspective: '11px',
    //     });
    //   }
    // });

    const additionally = document.querySelectorAll('.about-page__top');

    additionally.forEach((el) => {
      if (el) {
        parallaxMouse({
          elements: '.about-page__top img',
          moveFactor: 0.0000001,
          wrap: '.about-page__top',
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
  // tl.from('.header__logo', .7, {
  //   y: -20,
  //   opacity: 0,
  // });
  // tl.from('.header__link', 0.4, {
  //   y: -20,
  //   opacity: 0,
  // });
  // tl.from('.header-contacts', 0.4, {
  //   y: -20,
  //   opacity: 0,
  // });

  // tl.from('nav', 0.4, {
  //   y: -20,
  //   opacity: 0,
  // });

  // tl.from('.promo__title', 0.4, {
  //   y: -20,
  //   opacity: 0,
  // });
  // tl.from('.promo__text', 0.4, {
  //   y: -20,
  //   opacity: 0,
  // });

  // tl.from('.promo__preview', 1, {
  //   y: -20,
  //   opacity: 0,
  // });

  function showProjects() {}
  showProjects();

  // gsap.to('.projects', 1, {
  //   opacity: 0,
  //   delay: 0.3,
  //   scale: 1,
  //   // y: -100,
  //   stagger: {
  //     amount: 8,
  //   },
  //   ease: 'elastic.out(.5,1)',
  //   scrollTrigger: {
  //     trigger: '.projects-card',
  //     scrub: true,
  //     start: 'top top',
  //     end: '+-100%',
  //   },
  // });

    // * ===== Mask input
    $('input[type="tel"]').mask('+7 (999) 999-99-99');

  //   // * ===== Nice Select
  //   // $('select').niceSelect();

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

  //   // * ===== Slider
  //   (function slider() {
  //     const sliderEl = document.querySelector('.price-list-top__slider');
  //     new Swiper(sliderEl, {
  //       slidesPerView: 'auto',
  //       centeredSlides: true,
  //       slideToClickedSlide: true,
  //       initialSlide: 4,
  //       spaceBetween: 20,
  //       navigation: {
  //         nextEl: '.price-list-top__slider .swiper-button-next',
  //         prevEl: '.price-list-top__slider .swiper-button-prev',
  //       },
  //     });
  //   })();

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

  //   // * ===== Toggle Tabs
  //   function someTabs(headerSelector, tabSelector, contentSelector, activeClass) {
  //     const header = document.querySelectorAll(headerSelector);
  //     const tab = document.querySelectorAll(tabSelector);
  //     const content = document.querySelectorAll(contentSelector);

  //     header.forEach((el) => {
  //       if (el) {
  //         hideTabContent();
  //         showTabContent();
  //         function hideTabContent() {
  //           content.forEach((item) => {
  //             item.classList.remove('active');
  //           });
  //           tab.forEach((item) => {
  //             item.classList.remove(activeClass);
  //           });
  //         }
  //         function showTabContent(i = 0) {
  //           content[i].classList.add('active');
  //           tab[i].classList.add(activeClass);
  //         }
  //         header.forEach((item) => {
  //           if (item) {
  //             item.addEventListener('click', (e) => {
  //               const target = e.target;
  //               if (target.classList.contains(tabSelector.replace(/\./, ''))) {
  //                 tab.forEach((item, i) => {
  //                   if (target == item || target.parentNode == item) {
  //                     hideTabContent();
  //                     showTabContent(i);
  //                   }
  //                 });
  //               }
  //             });
  //           }
  //         });
  //       }
  //     });
  //   }
  //   someTabs('.contacts', '.contacts-top__item', '.contacts__content', 'active');

  //   function toggleTabs(
  //     headerSelector,
  //     tabSelector,
  //     contentSelector,
  //     activeClass
  //   ) {
  //     const header = document.querySelectorAll(headerSelector);
  //     const tab = document.querySelectorAll(tabSelector);
  //     const content = document.querySelectorAll(contentSelector);

  //     header.forEach((el) => {
  //       if (el) {
  //         hideTabContent();
  //         showTabContent();
  //         function hideTabContent() {
  //           content.forEach((item) => {
  //             item.classList.remove('active');
  //           });
  //           tab.forEach((item) => {
  //             item.classList.remove(activeClass);
  //           });
  //         }
  //         function showTabContent(i = 4) {
  //           content[i].classList.add('active');
  //           tab[i].classList.add(activeClass);
  //         }
  //         header.forEach((item) => {
  //           if (item) {
  //             item.addEventListener('click', (e) => {
  //               const target = e.target;
  //               if (target.classList.contains(tabSelector.replace(/\./, ''))) {
  //                 tab.forEach((item, i) => {
  //                   if (target == item || target.parentNode == item) {
  //                     hideTabContent();
  //                     showTabContent(i);
  //                   }
  //                 });
  //               }
  //             });
  //           }
  //         });
  //       }
  //     });
  //   }
  //   toggleTabs(
  //     '.price-list',
  //     '.price-list-top__btn',
  //     '.price-list__content',
  //     'active'
  //   );
});
