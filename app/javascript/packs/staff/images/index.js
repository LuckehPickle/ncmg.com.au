"use strict";

/**
 * Handles all clicks on images.
 * @param image Image that was clicked.
 */
function onClick (image) {
  console.log(image);
}

// Bind to click events
addEventListener("click", event => {
  const { target } = event;
  const link = target.closest("a");
  if (link !== null && link.matches("a.image-wrapper[data-remote='true']:not([disabled])")) {
    onClick(target);
  }
});