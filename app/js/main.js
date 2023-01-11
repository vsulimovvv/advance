window.addEventListener('DOMContentLoaded', () => {
  // * ===== MultiStep Form
  (function multiStep() {
    const prevBtns = document.querySelectorAll('.btn-prev');
    const nextBtns = document.querySelectorAll('.btn-next');
    const formSteps = document.querySelectorAll('.form-submit__step');
    const submitBtn = document.querySelector('.submit-btn');
    const formInputs = document.querySelectorAll('.form-submit__input');
    const formSelect = document.querySelector('.form-submit__select');
    const formEnd = document.querySelector('.form-submit__end');
    const formInner = document.querySelector('.form-submit__inner');

    formSteps.forEach((el) => {
      if (el) {
        submitBtn.addEventListener('click', (e) => {
          e.preventDefault();
          formEnd.style.display = 'block';
          formInner.style.display = 'none';
        });

        let formStepsNum = 0;

        nextBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
            formStepsNum++;
            updateFormSteps();
          });
        });

        prevBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
            formStepsNum--;
            updateFormSteps();
          });
        });

        function updateFormSteps() {
          formSteps.forEach((formStep) => {
            formStep.classList.contains('active') &&
              formStep.classList.remove('active');
          });

          formSteps[formStepsNum].classList.add('active');
        }
      }
    });
  })();

  (function parallaxAnim() {
    function parallaxIt(e, target, movement) {
      var $this = $('.additionally');
      var relX = e.pageX - $this.offset().left;
      var relY = e.pageY - $this.offset().top;

      TweenMax.to(target, 1, {
        x: ((relX - $this.width() / 2) / $this.width()) * movement,
        y: ((relY - $this.height() / 2) / $this.height()) * movement,
      });
    }

    $('.additionally').mousemove(function (e) {
      parallaxIt(e, '.logo-multi-1', -20);
      parallaxIt(e, '.logo-multi-2', 10);
      parallaxIt(e, '.logo-multi-3', 10);
    });
  })();

  (function parallaxAnim() {
    function parallaxIt(e, target, movement) {
      var $this = $('.about-page__top');
      var relX = e.pageX - $this.offset().left;
      var relY = e.pageY - $this.offset().top;

      TweenMax.to(target, 1, {
        x: ((relX - $this.width() / 2) / $this.width()) * movement,
        y: ((relY - $this.height() / 2) / $this.height()) * movement,
      });
    }

    $('.about-page__top').mousemove(function (e) {
      parallaxIt(e, '.about-title__img--small', -20);
      parallaxIt(e, '.about-title__img--big', 10);
      parallaxIt(e, '.about-title', 10);
    });
  })();

  (function parallaxAnim() {
    function parallaxIt(e, target, movement) {
      var $this = $('.promo__wrapper');
      var relX = e.pageX - $this.offset().left;
      var relY = e.pageY - $this.offset().top;

      TweenMax.to(target, 1, {
        x: ((relX - $this.width() / 2) / $this.width()) * movement,
        y: ((relY - $this.height() / 2) / $this.height()) * movement,
      });
    }

    $('.promo__wrapper').mousemove(function (e) {
      parallaxIt(e, '.ellipse', 10);
      parallaxIt(e, '.sphere', 10);
      parallaxIt(e, '.lines', -10);
    });
  })();

  (function parallaxAnim() {
    function parallaxIt(e, target, movement) {
      var $this = $('.about');
      var relX = e.pageX - $this.offset().left;
      var relY = e.pageY - $this.offset().top;

      TweenMax.to(target, 1, {
        x: ((relX - $this.width() / 2) / $this.width()) * movement,
        y: ((relY - $this.height() / 2) / $this.height()) * movement,
      });
    }

    $('.about').mousemove(function (e) {
      parallaxIt(e, '.about__link--e-commerce', 60);
      parallaxIt(e, '.about__link--b2b', -60);
      parallaxIt(e, '.about__link--finance', 60);
      parallaxIt(e, '.about__link--medicine', -60);
    });
  })();

  (function parallaxAnim() {
    function parallaxIt(e, target, movement) {
      var $this = $('.scheme-chart');
      var relX = e.pageX - $this.offset().left;
      var relY = e.pageY - $this.offset().top;

      TweenMax.to(target, 1, {
        x: ((relX - $this.width() / 2) / $this.width()) * movement,
        y: ((relY - $this.height() / 2) / $this.height()) * movement,
      });
    }

    $('.scheme-chart').mousemove(function (e) {
      parallaxIt(e, '.circles', 50);
    });
  })();

  (function parallaxAnim() {
    function parallaxIt(e, target, movement) {
      var $this = $('.services');
      var relX = e.pageX - $this.offset().left;
      var relY = e.pageY - $this.offset().top;

      TweenMax.to(target, 1, {
        x: ((relX - $this.width() / 2) / $this.width()) * movement,
        y: ((relY - $this.height() / 2) / $this.height()) * movement,
      });
    }

    $('.services').mousemove(function (e) {
      parallaxIt(e, '.arrow-circle', 50);
    });
  })();

  (function dotsAnim() {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.width = window.innerWidth - 100;
      canvas.height = window.innerHeight - 100;
      const c = canvas.getContext('2d');

      let mouse = {
        x: undefined,
        y: undefined,
      };

      // При наведении мыши
      let maxRadius = 3;
      window.addEventListener('mousemove', function (e) {
        mouse.x = e.x;
        mouse.y = e.y;
      });
      window,
        addEventListener('resize', function (e) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        });
      function Circle(x, y, incrementX, incrementY, radius) {
        this.x = x;
        this.y = y;
        this.incrementX = incrementX;
        this.incrementY = incrementY;
        // Размеры дотов
        this.radius = Math.ceil(Math.random() * 1) + 0.8;
        this.minRadius = Math.ceil(Math.random() * 1) + 0.8;

        this.draw = function () {
          c.beginPath();
          c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          let grd = c.createRadialGradient(
            this.x,
            this.y,
            this.radius - 1,
            this.x - 1,
            this.y - 1,
            this.radius / 5
          );

          grd.addColorStop(0, `#57383b`);
          c.fillStyle = grd;
          c.fill();
        };

        this.update = function () {
          this.x += this.incrementX;
          this.y += this.incrementY;
          if (this.x > innerWidth - this.radius) {
            this.incrementX = -Math.random() * 5;
          }
          if (this.x < this.radius) {
            this.incrementX = Math.random() * 5;
          }
          if (this.y > innerHeight - this.radius) {
            this.incrementY = -Math.random() * 5;
          }
          if (this.y < this.radius) {
            this.incrementY = Math.random() * 5;
          }
          if (
            mouse.x - this.x < 50 &&
            mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 &&
            mouse.y - this.y > -50
          ) {
            if (this.radius < maxRadius) {
              this.radius++;
            }
          } else if (this.radius > this.minRadius) {
            this.radius--;
          }
          this.draw();
        };
      }
      //  + 1000
      let num = Math.ceil(Math.random() * 50) + 1000;
      let circleArr = [];
      console.log(circleArr);
      function init() {
        circleArr = [];
        for (let i = 1; i < num; i++) {
          let x = Math.floor(Math.random() * window.innerWidth);
          let y = Math.floor(Math.random() * window.innerHeight);
          let incrementX = (Math.random() - 0.5) * 1;
          let incrementY = (Math.random() - 0.5) * 1;
          let radius = Math.ceil(Math.random() * 5) + 4;
          circleArr.push(new Circle(x, y, incrementX, incrementY, radius));
        }
      }
      init();
      function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < circleArr.length; i++) {
          circleArr[i].update();
        }
      }
      animate();
    }
  })();

  (function loadForm() {
    let inputs = document.querySelectorAll('.input-file__input');
    Array.prototype.forEach.call(inputs, function (input) {
      let label = input.previousElementSibling,
        labelVal = label.querySelector(
          '.input-file .input-file__count'
        ).innerText;

      input.addEventListener('change', function (e) {
        let countFiles = '';
        if (this.files && this.files.length >= 1)
          countFiles = this.files.length;

        if (countFiles)
          label.querySelector('.input-file .input-file__count').innerText =
            'Выбрано файлов: ' + countFiles;
        else
          label.querySelector('.input-file .input-file__count').innerText =
            labelVal;
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
  //   const scene = document.querySelectorAll('.parallax-scene');
  //   scene.forEach((el) => {
  //     if (el) {
  //       const parallaxInstance = new Parallax(el);
  //     }
  //   });
  // }
  // parallaxPromo();

  // function parrallaxTitle() {
  //   const scene = document.querySelectorAll('.about-title__imgs');
  //   scene.forEach((el) => {
  //     if (el) {
  //       const parallaxInstance = new Parallax(el);
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

  // * ===== Show Contacts Form
  (function showMenu() {
    const menuBtn = document.querySelectorAll('.btn-show-contacts');
    const menu = document.querySelector('.contacts-right');
    const menuCloseBtn = document.querySelector('.contacts-right__close');
    const body = document.querySelector('body');
    const overlay = document.querySelector('.overlay');

    if (menu) {
      menuBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          menu.classList.toggle('active');
          overlay.classList.toggle('active');
          body.classList.toggle('no-scroll');
        });
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
    }
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
