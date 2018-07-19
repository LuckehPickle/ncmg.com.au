(function (window) {
  "use strict";

  function defineLib() {
    var uFlash = {};

    uFlash.error = function (message) {
      renderFlash("error", message);
    };

    uFlash.info = function (message) {
      renderFlash("info", message);
    };


    /**
     * Renders a flash message.
     * @param key Flash key.
     * @param value Flash value (message).
     */
    var renderFlash = function (key, value) {

      var wrapper = document.querySelector(".flashes");

      // Construct flash
      var flash = document.createElement("div");
      flash.classList.add("flash", "flash-" + key);
      wrapper.appendChild(flash);

      // Construct inner content
      var content = document.createElement("p");
      content.innerText = value;
      flash.appendChild(content);

      // Construct close button
      var button = document.createElement("button");
      button.classList.add("flash-close");
      button.innerHTML = "<svg class=\"material-icons\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" enable-background=\"new 0 0 24 24\" xml:space=\"preserve\"><g id=\"Bounding_Boxes\"><path fill=\"none\" d=\"M0,0h24v24H0V0z\"/></g><g id=\"Rounded\"><path d=\"M18.3,5.71L18.3,5.71c-0.39-0.39-1.02-0.39-1.41,0L12,10.59L7.11,5.7c-0.39-0.39-1.02-0.39-1.41,0l0,0\n\t\tc-0.39,0.39-0.39,1.02,0,1.41L10.59,12L5.7,16.89c-0.39,0.39-0.39,1.02,0,1.41h0c0.39,0.39,1.02,0.39,1.41,0L12,13.41l4.89,4.89\n\t\tc0.39,0.39,1.02,0.39,1.41,0l0,0c0.39-0.39,0.39-1.02,0-1.41L13.41,12l4.89-4.89C18.68,6.73,18.68,6.09,18.3,5.71z\"/></g></svg>";
      flash.appendChild(button);

    };


    /**
     * Listens for click events on flashes.
     * @param event Click event.
     */
    var clickListener = function (event) {

      var target = event.target;

      // We are only looking for flash close buttons
      if (!target.classList.contains("flash-close")) {
        return;
      }

      var flash = target.closest(".flash");
      flash.parentNode.removeChild(flash);

    };


    document.addEventListener("click", clickListener);
    return uFlash;
  }

  if (typeof uFlash === "undefined") {
    window.uFlash = defineLib();
  } else {
    console.log("uFlash is already defined.");
  }
})(window);