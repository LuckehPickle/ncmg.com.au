let previousButton;
let nextButton;
let counter = 1;
let slider;
let sliderImages;
let imageSize;

/**
 * Clones an image and returns the new element.
 * @param image Image to clone.
 * @return {*} Image clone.
 */
const cloneImage = (image) => {
  const clone = document.createElement("img");
  clone.setAttribute("src", image.getAttribute("src"));
  return clone;
};

/**
 * Attempts to progress the slider forward one image.
 */
const nextImage = () => {
  if (counter >= sliderImages.length - 1) return;
  counter++;
  slider.style.transition = "transform 500ms ease-in-out";
  slider.style.transform = `translateX(${-counter * imageSize}px)`;
  updateStateVisualiser();
};

/**
 * Attempts to progress the slider backward one image.
 */
const previousImage = () => {
  if (counter <= 0) return;
  counter--;
  slider.style.transition = "transform 500ms ease-in-out";
  slider.style.transform = `translateX(${-counter * imageSize}px)`;
  updateStateVisualiser();
};

/**
 * A function which is called whenever a CSS transition ends.
 */
const onTransitionEnd = () => {
  if (sliderImages.item(counter).classList.contains("js-last-clone")) {
    slider.style.transition = "none";
    counter = sliderImages.length - 2;
    slider.style.transform = `translateX(${-counter * imageSize}px)`;
  } else if (sliderImages.item(counter).classList.contains("js-first-clone")) {
    slider.style.transition = "none";
    counter = 1;
    slider.style.transform = `translateX(${-counter * imageSize}px)`;
  }
  updateStateVisualiser();
};

/**
 * Updates the state visualiser according to which image is currently active.
 */
const updateStateVisualiser = () => {
  const counters = document.querySelectorAll(".count-visualiser > div");
  counters.forEach(c => c.removeAttribute("active"));
  if (counters.item(counter - 1) !== null) {
    counters.item(counter - 1).setAttribute("active", "");
  }
};

/**
 * Initialise variables. Should be called once the page has loaded.
 */
const init = () => {
  // Ensure that this page actually has a slider on it
  slider = document.querySelector(".slide");
  if (slider === null) return;

  // Retrieve elements
  previousButton = document.querySelector(".js-previous-button");
  nextButton = document.querySelector(".js-next-button");

  // Construct state visualiser
  const countVisualiser = document.querySelector(".count-visualiser");
  slider.querySelectorAll("img").forEach(() => {
    const c = document.createElement("div");
    countVisualiser.appendChild(c);
  });
  updateStateVisualiser();

  // Clone first and last images
  const firstImageClone = cloneImage(slider.firstElementChild);
  const secondImageClone = cloneImage(slider.lastElementChild);
  firstImageClone.classList.add("js-first-clone");
  slider.appendChild(firstImageClone);
  secondImageClone.classList.add("js-last-clone");
  slider.insertBefore(secondImageClone, slider.firstChild);
  sliderImages = slider.querySelectorAll("img");

  // Calculate image size and move to starting position
  imageSize = slider.firstElementChild.clientWidth;
  slider.style.transform = `translateX(${-counter * imageSize}px)`;

  // Bind to click events on previous and next buttons
  previousButton.addEventListener("click", previousImage);
  nextButton.addEventListener("click", nextImage);

  // Bind to transition end
  slider.addEventListener("transitionend", onTransitionEnd);
};

addEventListener("turbolinks:load", init);