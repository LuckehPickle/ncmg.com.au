(function (window) {
  "use strict";

  function defineLib() {
    var uModal = {};

    uModal.queue = [];
    uModal.currentlyDisplayed = false;


    /**
     * Creates a modal from HTML, and adds it to the modal queue.
     * @param html HTML that outlines a modal.
     */
    uModal.fromHTML = function (html) {
      uModal.queue.push({type: "html", source: html});
      poll();
    };


    /**
     * Check the state of the modal queue, and progress forward if possible.
     */
    function poll () {

      // Check if a new modal can be displayed
      if (uModal.queue.length !== 0 && !uModal.currentlyDisplayed) {
        var modal = uModal.queue.pop();
        renderModal(modal);
      }

    }


    /**
     * Renders the given modal.
     * @param modal A modal to render.
     */
    function renderModal (modal) {

      var overlay = document.querySelector(".modal-overlay");

      // Build overlay if it doesn't yet exist
      if (overlay === null) {
        overlay = buildOverlay();
      }

      // Display overlay if not currently shown
      if (!overlay.classList.contains("active")) {
        overlay.classList.add("active");
      }

      var m = buildModal(modal);
      overlay.appendChild(m);
      uModal.currentlyDisplayed = true;

    }


    /**
     * Constructs a new overlay
     */
    function buildOverlay () {
      var overlay = document.createElement("div");
      overlay.classList.add("modal-overlay");
      document.body.appendChild(overlay);
      return overlay;
    }


    /**
     * Constructs a modal
     * @param modal Modal to construct
     */
    function buildModal (modal) {
      switch (modal.type) {
        case "html":
          var template = document.createElement("template");
          template.innerHTML = modal.source.trim();
          return template.content.firstChild;
      }
    }


    return uModal;
  }

  if (typeof uModal === "undefined") {
    window.uModal = defineLib();
  } else {
    console.log("uModal is already defined.");
  }
})(window);