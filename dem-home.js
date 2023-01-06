document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("start-tour").addEventListener("click", function () {
    document.getElementById("tour-overlay").style.display = "none";
    document.getElementById("tour-blur").style.filter = "none";
  });

  /********/
  //number count up animation for the stat section
  function createCounter(
    selector,
    start,
    end,
    duration,
    delay,
    once,
    repeat,
    decimals,
    legacy,
    filesizing,
    currency,
    separator
  ) {
    return new PureCounter({
      selector: selector,
      start: start,
      end: end,
      duration: duration,
      delay: delay,
      once: once,
      repeat: repeat,
      decimals: decimals,
      legacy: legacy,
      filesizing: filesizing,
      currency: currency,
      separator: separator
    });
  }

  createCounter(
    ".webinar-conversions",
    0,
    3,
    1,
    10,
    true,
    false,
    0,
    true,
    false,
    false,
    false
  );
  createCounter(
    ".attendance-rate",
    0,
    15,
    1,
    10,
    true,
    false,
    0,
    true,
    false,
    false,
    false
  );
  createCounter(
    ".conversion-rate",
    0,
    60,
    1,
    10,
    true,
    false,
    0,
    true,
    false,
    false,
    false
  );

  /********/
  let fancyParagraph = new SplitText(".fancy-paragraph", {
    type: "words"
  });

  gsap.from(fancyParagraph.words, {
    color: "#3A5666",
    opacity: 0.5,
    stagger: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".fancy-paragraph-wrapper",
      start: "top +=10%",
      end: "+=100%",
      /*markers: true,*/
      scrub: 1,
      pin: ".section_fancy-paragraph"
    }
  });
  /********/
  //makes the features overview sidebar sticky in relation to the section's content. only on tablet and up.
  // Check the current screen width
  if (window.innerWidth >= 768) {
    // If the screen width is 768px or greater, create the scroll trigger
    let stickySection = ScrollTrigger.create({
      trigger: ".sticky-scroll_content-col",
      pin: ".sticky-scroll_sticky-col",
      /*markers: true,*/
      start: "top top",
      end: "bottom bottom-=100"
    });
  }

  //control the background color on the sticky link section
  // Get all of the .sticky-scroll_sticky-link elements
  const links = document.querySelectorAll(".sticky-scroll_sticky-link");

  // Get the .section_features-overview element
  const section = document.querySelector(".section_features-overview");

  // Create a MutationObserver to observe changes to the .sticky-scroll_sticky-link elements
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      // Check if the .w-active class was added or removed
      if (mutation.type === "attributes") {
        // Find the element with the .w-active class
        const activeLink = document.querySelector(
          ".sticky-scroll_sticky-link.w--current"
        );

        // Find the position of the element with the .w-active class
        const activeIndex = Array.prototype.indexOf.call(links, activeLink);

        // Check if the position is even or odd
        if (activeIndex % 2 === 0) {
          // If the position is even, set the background color to blue
          section.style.backgroundColor = "#eff7fd";
        } else {
          // If the position is odd, set the background color to red
          section.style.backgroundColor = "#fff";
        }
      }
    });
  });

  // Observe changes to the .sticky-scroll_sticky-link elements
  observer.observe(document.body, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true
  });

  /********/
  //animation for the large testimonial on scroll. changes text color & opacity of the
  //paragraphs and gives a sticky effect while the animation is happening.
  let fancyTestimonial = new SplitText(".fancy-testimonial", {
    type: "words"
  });

  gsap.from(fancyTestimonial.words, {
    color: "#3A5666",
    opacity: 0.5,
    stagger: 1,
    ease: "none",
    /*id: "fancy testimonial",*/
    scrollTrigger: {
      trigger: ".section_fancy-testimonial",
      /*markers: true,*/
      start: "top +=10vh",
      end: "+=100%",
      scrub: 1,
      pin: ".section_fancy-testimonial"
    }
  });

  /********/
  //this is for the fans/testimonials slider pagination
  const sliderParent = document.querySelector(".fans-slider_mask");
  const firstSlide = document.querySelector(".fans-slider_slide");
  const slides = document.querySelectorAll(".fans-slider_slide");
  const totalSlideText = document.querySelector("#totalSlideText");
  const currentSlideText = document.querySelector("#currentSlideText");
  const nextBtn = document.querySelector("#fans-slider-next");
  const prevBtn = document.querySelector("#fans-slider-previous");

  // Set the height of the slider mask to the height of the first slide
  sliderParent.style.height = `${firstSlide.clientHeight}px`;
  totalSlideText.innerText = slides.length;
  let currentSlide = 1;
  currentSlideText.innerText = currentSlide;

  // Increment current slide and update slider mask height on next button click
  nextBtn.addEventListener("click", () => {
    setTimeout(() => {
      currentSlide = currentSlide === slides.length ? 1 : currentSlide + 1;
      currentSlideText.innerText = currentSlide;
      let activeSlide = setActiveSlide(slides);
      if (activeSlide) {
        let slideHeight = activeSlide.clientHeight;
        sliderParent.style.height = `${slideHeight}px`;
      }
    }, 500);
  });

  // Decrement current slide on previous button click
  prevBtn.addEventListener("click", () => {
    setTimeout(() => {
      currentSlide = currentSlide === 1 ? slides.length : currentSlide - 1;
      currentSlideText.innerText = currentSlide;
      let activeSlide = setActiveSlide(slides);
      if (activeSlide) {
        let slideHeight = activeSlide.clientHeight;
        sliderParent.style.height = `${slideHeight}px`;
      }
    }, 500);
  });

  function setActiveSlide(slides) {
    let activeSlide;
    slides.forEach((slide) => {
      if (slide.getAttribute("aria-hidden") !== "true") {
        activeSlide = slide;
      }
    });
    return activeSlide;
  }
  ScrollTrigger.refresh();
});
/*end first dom loaded function*/

/********/
//this is for the medals slider (only on mobile)
//which uses the splide library
window.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 480) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href =
      "https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css";
    document.head.appendChild(link);
  }
});

const splideConfig = {
  type: "loop",
  perPage: 3,
  focus: "center",
  duplicate: false
};

document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 480) {
    const splide = new Splide(".splide", splideConfig).mount();

    const nextArrow = document.querySelector(".splide__arrow--next");
    nextArrow.setAttribute("fs-mirrorclick-element", "target-5");

    const prevArrow = document.querySelector(".splide__arrow--prev");
    prevArrow.setAttribute("fs-mirrorclick-element", "target-6");
  }
});
