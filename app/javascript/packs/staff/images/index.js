"use strict";

let loading = false;

/**
 * A listener bound to the beforeSend event of an AJAX request.
 * @param event beforeSend event.
 */
function onBeforeSend(event) {
  if (loading) {
    event.preventDefault();
    return;
  }

  loading = true;
}

/**
 * A listener bound to the success event of an AJAX request.
 * @param event Success event.
 */
function onSuccess(event) {

}

/**
 * A listener bound to the completion of an AJAX request.
 * @param event Complete event.
 */
function onComplete() {
  loading = false;
}

addEventListener("turbolinks:load", () => {
  const images = document.querySelectorAll("a.image-wrapper[data-remote='true']");
  images.forEach(image => {
    image.addEventListener("ajax:beforeSend", onBeforeSend);
    image.addEventListener("ajax:success", onSuccess);
    image.addEventListener("ajax:complete", onComplete);
  });
});