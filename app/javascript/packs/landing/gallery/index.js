let gallery;
let links;

/**
 * Attempts to retrieve the lightbox. If it doesn't yet exist, one is created.
 */
const getOrCreateLightbox = () => {
  let lightbox = document.querySelector(".lightbox");
  let lightboxBackground = document.querySelector(".lightbox-background");

  // Create lightbox if it doesn't yet exist.
  if (lightbox === null) {
    lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    lightbox.addEventListener("click", onLightboxClick);
    document.body.appendChild(lightbox);
  }

  return { lightbox, lightboxBackground };
};

/**
 * A click handler that should be fired whenever the lightbox is clicked.
 */
const onLightboxClick = () => {
  const { lightbox, lightboxBackground } = getOrCreateLightbox();
  lightbox.removeAttribute("active");
  lightboxBackground.removeAttribute("active");
  document.body.classList.remove("no-scroll");
};

/**
 * A click handler that should be fired whenever a link in the gallery is clicked.
 */
const onLinkClick = () => {
  const { lightbox, lightboxBackground } = getOrCreateLightbox();
  if (!lightbox.hasAttribute("active")) {
    lightbox.innerHTML = ``;
    lightbox.setAttribute("active", "");
    lightboxBackground.setAttribute("active", "");
    document.body.classList.add("no-scroll");
  }
};

// Bind to page load event
addEventListener("turbolinks:load", () => {
  gallery = document.querySelector(".gallery-wrapper");
  if (gallery === null) return;
  links = gallery.querySelectorAll("a");
  links.forEach(link => link.addEventListener("click", onLinkClick));
});