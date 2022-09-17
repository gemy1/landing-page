/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

//store ul navigation into a variable
const navigation = document.getElementById("navbar__list");
// store allSections into  a variable
const allSections = document.getElementsByTagName("section");
// get header container
const headerContainer = document.getElementById("page-header");
// store the timer for scrolling
let isScrolling;
// store to top button
const toTopButton = document.querySelector(".to-top");
// store navigation collapse button for small screens
const navCollapseButton = document.querySelector("#navbar-collapse");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
// creat fragment container to store all list items
let navFragment = document.createDocumentFragment();

// loop through all sections
for (let l = 0; l < allSections.length; l++) {
  // createElement list item
  const li = document.createElement("li");
  li.innerHTML = `
        <a href='#' class ="menu__link" data-section="${allSections[l].attributes["data-nav"].nodeValue}">
            ${allSections[l].attributes["data-nav"].nodeValue} 
         </a>`;
  // append the li to the fragment container
  navFragment.appendChild(li);
}
// append the fragment container to the navigation ul
navigation.appendChild(navFragment);

// Scroll to anchor ID using scrollTO event

navigation.addEventListener("click", (event) => {
  // preventDefault behavior
  event.preventDefault();
  // store the value of  data-section attribute
  const dataSection = event.target.attributes["data-section"].nodeValue;

  // check if the target is a link
  if (event.target.nodeName === "A") {
    const elementToScrollTo = document.querySelector(
      `[data-nav='${dataSection}']`
    );
    // scroll to the target element
    elementToScrollTo.scrollIntoView({ behavior: "smooth" });
  }

  // add class active to list item
  for (let item of navigation.children) {
    item.firstElementChild.classList.remove("active");
  }
  event.target.classList.add("active");
});

/**
 * End Main Functions
 * Begin Events
 */

/*// Add class 'active' to section when near top of viewport 
and attach class active to active nav li */
const windowHeight = window.innerHeight;
function scrollHandeler(event) {
  for (let section of allSections) {
    let sectionDimensions = section.getBoundingClientRect();
    let activeNav;

    if (sectionDimensions.top < windowHeight - 200) {
      section.classList.add("active");

      if (sectionDimensions.top < 0) {
        section.classList.remove("active");
      }

      // this for add class active to li for active section
      // loop through all li elements and remove class active
      for (let item of navigation.children) {
        item.firstElementChild.classList.remove("active");
      }
      //then get the value of data-nav from the current active section
      let currentDataNav = section.attributes["data-nav"].nodeValue;
      //select the li element
      activeNav = document.querySelector(`[data-section='${currentDataNav}']`);
      // applay class active to li for active section
      activeNav.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  }

  /* make the nav disappear when stop scrolling */
  // if scrolling remove the timer
  clearTimeout(isScrolling);
  // if scrolling make the header visible
  headerContainer.style.top = "0";
  // if stop scrolling setTimeout to make the header disappear
  isScrolling = setTimeout(() => {
    headerContainer.style.top = "-53";
  }, 3000);

  /* display to top button */
  // get Y offset value
  const pageYOffset = window.pageYOffset;
  // if Y offset is greater than the current window height then display the button
  if (pageYOffset > window.innerHeight) {
    toTopButton.style.display = "block";
  } else {
    toTopButton.style.display = "none";
  }
}

// applay the event listener for scrolling
window.addEventListener("scroll", scrollHandeler);

// travel to top on click
toTopButton.addEventListener("click", (e) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// show the navigation for small screens
navCollapseButton.addEventListener("click", (e) => {
  navigation.classList.toggle("display-none");
});
