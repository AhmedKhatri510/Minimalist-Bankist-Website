'use strict';

const header = document.querySelector('.header');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabcontainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////
//Button scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height and weight of viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //old school way of doing scrolling
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top+ window.pageYOffset);

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //modern way of doing this
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////
//Page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//Event Delegation above method of scrolling through the section is inefficient.
//1. add event listener to common parent element
//2. Determine which element originated the event.

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //Matching strategies
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed components

tabcontainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //guard clause
  if (!clicked) return;

  //remove classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabContent.forEach(c => c.classList.remove('operations__content--active'));

  //active tab
  clicked.classList.add('operations__tab--active');

  //activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

//passing arguments into Handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//sticky navigation bar
const initialCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', function () {
  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});

//sticky navigation : Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOps = {
//   root: null,
//   threshold: 0.2,
// };

// const observer = new IntersectionObserver(obsCallback, obsOps);
// observer.observe(section1);
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

/////////////////////////////////
//Revealing Elements
//1. adding the observer to all sections
//2. for that you need to select the section
//3. to reveal the section, hide the section first by adding the section hiddem class, and need to set the threshold and invoke the call back function to remove the section hidden class

const sections = document.querySelectorAll('.section');
sections.forEach(section => {
  section.classList.add('section--hidden');
});

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach(section => {
  sectionObserver.observe(section);
});

///////////////////////////////////////
///////////////////////////////////////
//////////////////////////////////////

/* 
//selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');

console.log(document.querySelector('.header'));

const allSections = document.querySelectorAll('.section');
console.log(allSections);

console.log(document.getElementById('section--1'));
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); //returns html collection

console.log(document.getElementsByClassName('btn')); //returns html collection

//creating and inserting elements
// .insertAdjacentHTML()

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'we use cookies for improved functionality and analytics. <button class="btn btn-close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);

//delete element
document
  .querySelector('.btn-close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  }); */

/* 
//styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//it prints what is we explicitly define in style attribute of an element, it does'nt show on console which is not style attribute of an element.
console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

//Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
console.log(logo.alt);
console.log(logo.className);

//non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
console.log(logo.setAttribute('company', 'Bankist'));

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');

console.log(link.href);
console.log(link.getAttribute('href'));

//data attribute
console.log(logo.dataset.versionNumber);

//classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); //not includes

//don't use this
//as it will overwrite every class present init.
logo.className = 'jonas'; */

/* const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height and weight of viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //old school way of doing scrolling
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top+ window.pageYOffset);

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //modern way of doing this
  section1.scrollIntoView({ behavior: 'smooth' });
}); */
/* 
//Event handling
const h1 = document.querySelector('h1');

const alertH1 = function () {
  alert('addEventListener: Great! you are reading the heading :D');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(function () {
  h1.removeEventListener('mouseenter', alertH1);
}, 3000);
 */
// h1.onmouseenter = function () {
//   alert('addEventListener: Great! you are reading the heading :D');
// };

/* 
//event propagation
const randInt = (max, min) => Math.floor(Math.random() * (max - min) + 1 + min);

const randColor = () =>
  `rgb(${randInt(255, 0)}, ${randInt(255, 0)}, ${randInt(255, 0)}`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randColor();

  console.log('link', e.target, e.currentTarget);

  //stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randColor();
  console.log('container', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randColor();
  console.log('nav', e.target, e.currentTarget);
});
 */
//
/* 
//DOM traversing

const h1 = document.querySelector('h1');

//going downwards
console.log(h1);
console.log(h1.querySelectorAll('.highlight')); //it will select all highlight element no matter how deep it is in h1 element

console.log(h1.childNodes);
console.log(h1.children); //it returns all child elements init in the form of html collection

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

//going upwards
console.log(h1.parentElement);
console.log(h1.parentNode);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

//going sideway siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(el => {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});
 */
