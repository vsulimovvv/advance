window.addEventListener('DOMContentLoaded', () => {


  (function dotsAnim() {
    const canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;
    const c = canvas.getContext('2d');

    let mouse = {
      x: undefined,
      y: undefined,
    };

    let maxRadius = 5;
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
      this.radius = Math.ceil(Math.random() * 1) + 1;
      this.minRadius = Math.ceil(Math.random() * 1) + 1;

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
    let num = Math.ceil(Math.random() * 50) + 1500;
    let circleArr = [];
    console.log(circleArr);
    function init() {
      circleArr = [];
      for (let i = 1; i < num; i++) {
        let x = Math.floor(Math.random() * window.innerWidth);
        let y = Math.floor(Math.random() * window.innerHeight);
        let incrementX = (Math.random() - 0.5) * 5;
        let incrementY = (Math.random() - 0.5) * 5;
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
  })();

  // (function dotsAnim() {
  //   var dotMargin = 25;
  //   var numRows = 10;
  //   var numCols = 25;

  //   var colors = ['#57383b'];

  //   var directions = ['+', '-'];
  //   var speeds = [0.2, 0.5, 1, 1.4, 2, 2.4, 3];

  //   var canvas = $('canvas.hero-dots');
  //   var context = canvas[0].getContext('2d');
  //   var canvasWidth = canvas.width();
  //   var canvasHeight = canvas.height(); // this one is new
  //   canvas.attr({ height: canvasHeight, width: canvasWidth });

  //   var dotWidth = (canvasWidth - 2 * dotMargin) / numCols - dotMargin;
  //   var dotHeight = (canvasHeight - 2 * dotMargin) / numRows - dotMargin;

  //   if (dotWidth > dotHeight) {
  //     var dotDiameter = dotHeight;
  //     var xMargin =
  //       (canvasWidth - (2 * dotMargin + numCols * dotDiameter)) / numCols;
  //     var yMargin = dotMargin;
  //   } else {
  //     var dotDiameter = dotWidth;
  //     var xMargin = dotMargin;
  //     var yMargin =
  //       (canvasHeight - (2 * dotMargin + numRows * dotDiameter)) / numRows;
  //   }

  //   var dots = [];

  //   var dotRadius = dotDiameter * 0.05;

  //   for (var i = 0; i < numRows; i++) {
  //     for (var j = 0; j < numCols; j++) {
  //       var x =
  //         j * (dotDiameter + xMargin) + dotMargin + xMargin / 2 + dotRadius;
  //       var y =
  //         i * (dotDiameter + yMargin) + dotMargin + yMargin / 2 + dotRadius;

  //       var color = colors[Math.floor(Math.random() * colors.length)];
  //       var xMove = directions[Math.floor(Math.random() * directions.length)];
  //       var yMove = directions[Math.floor(Math.random() * directions.length)];
  //       var speed = speeds[Math.floor(Math.random() * speeds.length)];

  //       var dot = {
  //         x: x,
  //         y: y,
  //         radius: dotRadius,
  //         xMove: xMove,
  //         yMove: yMove,
  //         color: color,
  //         speed: speed,
  //       };
  //       dots.push(dot);
  //       drawDot(dot);
  //     }
  //   }

  //   for (i = 0; i < dots.length; i++) {
  //     drawDot(dots[i]);
  //   }

  //   window.requestAnimationFrame(moveDot);

  //   function moveDot() {
  //     context.clearRect(0, 0, canvasWidth, canvasHeight);

  //     for (i = 0; i < dots.length; i++) {
  //       if (dots[i].xMove == '+') {
  //         dots[i].x += dots[i].speed;
  //       } else {
  //         dots[i].x -= dots[i].speed;
  //       }
  //       if (dots[i].yMove == '+') {
  //         dots[i].y += dots[i].speed;
  //       } else {
  //         dots[i].y -= dots[i].speed;
  //       }

  //       drawDot(dots[i]);

  //       if (dots[i].x + dots[i].radius >= canvasWidth + 100) {
  //         dots[i].xMove = '-';
  //       }
  //       if (dots[i].x - dots[i].radius <= -100) {
  //         dots[i].xMove = '+';
  //       }
  //       if (dots[i].y + dots[i].radius >= canvasHeight + 100) {
  //         dots[i].yMove = '-';
  //       }
  //       if (dots[i].y - dots[i].radius <= -100) {
  //         dots[i].yMove = '+';
  //       }
  //     }

  //     window.requestAnimationFrame(moveDot);
  //   }

  //   function drawDot(dot) {
  //     context.globalAlpha = 0.9;
  //     context.beginPath();
  //     context.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI, false);
  //     context.fillStyle = dot.color;
  //     context.fill();
  //   }
  // })();

  // (function dotsAnim() {
  //   var dotMargin = 25;
  //   var numRows = 20;
  //   var numCols = 50;
  //   // 10 - 20
  //   // Set the colors you want to support in this array

  //   var colors = ['#57383b'];

  //   var directions = ['+', '-'];
  //   var speeds = [0.2, 0.5, 1, 1.4, 2, 2.4, 3];

  //   var canvas = $('canvas');
  //   var context = canvas[0].getContext('2d');
  //   var canvasWidth = canvas.width();
  //   var canvasHeight = canvas.height(); // this one is new
  //   canvas.attr({ height: canvasHeight, width: canvasWidth });

  //   var dotWidth = (canvasWidth - 2 * dotMargin) / numCols - dotMargin;
  //   var dotHeight = (canvasHeight - 2 * dotMargin) / numRows - dotMargin;

  //   if (dotWidth > dotHeight) {
  //     var dotDiameter = dotHeight;
  //     var xMargin =
  //       (canvasWidth - (2 * dotMargin + numCols * dotDiameter)) / numCols;
  //     var yMargin = dotMargin;
  //   } else {
  //     var dotDiameter = dotWidth;
  //     var xMargin = dotMargin;
  //     var yMargin =
  //       (canvasHeight - (2 * dotMargin + numRows * dotDiameter)) / numRows;
  //   }

  //   // Start with an empty array of dots.
  //   var dots = [];

  //   var dotRadius = dotDiameter * 0.05;

  //   for (var i = 0; i < numRows; i++) {
  //     for (var j = 0; j < numCols; j++) {
  //       var x =
  //         j * (dotDiameter + xMargin) + dotMargin + xMargin / 2 + dotRadius;
  //       var y =
  //         i * (dotDiameter + yMargin) + dotMargin + yMargin / 2 + dotRadius;
  //       // Get random color, direction and speed.
  //       var color = colors[Math.floor(Math.random() * colors.length)];
  //       var xMove = directions[Math.floor(Math.random() * directions.length)];
  //       var yMove = directions[Math.floor(Math.random() * directions.length)];
  //       var speed = speeds[Math.floor(Math.random() * speeds.length)];
  //       // Set the object.
  //       var dot = {
  //         x: x,
  //         y: y,
  //         radius: dotRadius,
  //         xMove: xMove,
  //         yMove: yMove,
  //         color: color,
  //         speed: speed,
  //       };
  //       // Save it to the dots array.
  //       dots.push(dot);
  //       drawDot(dot);
  //     }
  //   }

  //   // Draw each dot in the dots array.
  //   for (i = 0; i < dots.length; i++) {
  //     drawDot(dots[i]);
  //   }

  //   window.requestAnimationFrame(moveDot);

  //   function moveDot() {
  //     context.clearRect(0, 0, canvasWidth, canvasHeight);

  //     for (i = 0; i < dots.length; i++) {
  //       if (dots[i].xMove == '+') {
  //         dots[i].x += dots[i].speed;
  //       } else {
  //         dots[i].x -= dots[i].speed;
  //       }
  //       if (dots[i].yMove == '+') {
  //         dots[i].y += dots[i].speed;
  //       } else {
  //         dots[i].y -= dots[i].speed;
  //       }

  //       drawDot(dots[i]);

  //       if (dots[i].x + dots[i].radius >= canvasWidth + 100) {
  //         dots[i].xMove = '-';
  //       }
  //       if (dots[i].x - dots[i].radius <= -100) {
  //         dots[i].xMove = '+';
  //       }
  //       if (dots[i].y + dots[i].radius >= canvasHeight + 100) {
  //         dots[i].yMove = '-';
  //       }
  //       if (dots[i].y - dots[i].radius <= -100) {
  //         dots[i].yMove = '+';
  //       }
  //     }

  //     window.requestAnimationFrame(moveDot);
  //   }

  //   function drawDot(dot) {
  //     context.globalAlpha = 0.9;
  //     context.beginPath();
  //     // context.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI, false);
  //     context.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI, false);
  //     context.fillStyle = dot.color;
  //     context.fill();
  //   }
  // })();

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
