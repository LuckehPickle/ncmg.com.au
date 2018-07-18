(function (window) {
  "use strict";

  function defineLib() {
    var uFile = {};

    uFile.files = [];
    uFile.newFiles = [];


    /**
     * A delegated input change handler, that searches for appropriate file inputs.
     * @param event Change event.
     */
    var inputChangeHandler = function (event) {

      var input = event.target;

      // Ensure input is a file input
      if (!input.hasAttribute("type") ||
          input.getAttribute("type") !== "file" ||
          !input.classList.contains("auto-submit")) {
        return;
      }

      var length = input.files.length; // Cache length
      for (var i = 0; i < length; i++) {
        uFile.newFiles.push(input.files[i]);
      }

      input.value = "";
      renderPreviews();

    };


    /**
     * Attempts to render previews for new files.
     */
    var renderPreviews = function () {

      var length = uFile.newFiles.length; // Cache length
      for (var i = 0; i < length; i++) {
        var file = uFile.newFiles[i];

        // Ensure file is an image
        if (!file.type.startsWith("image/")) {
          var type = file.type.length === 0 ? "other" : file.type;
          uFlash.error("Unsupported file type: " + type + ". Only images are supported.");
          continue;
        }

        renderPreview(file);
        uFile.files.push(file);
      }

      // Clear array
      uFile.newFiles = [];

    };


    /**
     * Renders a single file's preview
     * @param file
     */
    var renderPreview = function (file) {

      var preview = document.querySelector(".image-preview");

      // Construct wrapper
      var wrapper = document.createElement("div");
      wrapper.classList.add("preview");
      preview.appendChild(wrapper);

      // Construct image
      var image = document.createElement("div");
      image.classList.add("image");
      wrapper.appendChild(image);

      // Load image asynchronously
      var reader = new FileReader();
      reader.onload = (function (img) { return function (e) { img.style.backgroundImage = "url(" + e.target.result + ")"; }; })(image);
      reader.readAsDataURL(file);

    };


    /**
     * An event handler that is fired whenever an element is dragged into the dropzone.
     * @param event Drag enter event
     */
    var dragEnterHandler = function (event) {
      event.stopPropagation();
      event.preventDefault();

      // Add active styles
      var dropzone = document.querySelector(".dropzone");
      if (!dropzone.classList.contains("active")) {
        dropzone.classList.add("active");
      }
    };


    /**
     * An event handler that is fired whenever an element is dragged over the dropzone.
     * @param event Drag over event
     */
    var dragOverHandler = function (event) {
      event.stopPropagation();
      event.preventDefault();
    };


    var dragLeaveHandler = function(event) {
      // Remove active styles
      var dropzone = document.querySelector(".dropzone");
      if (dropzone.classList.contains("active")) {
        dropzone.classList.remove("active");
      }
    };


    /**
     * An event handler that is fired whenever an element is dropped in the dropzone.
     * @param event Drop event.
     */
    var dropHandler = function (event) {
      event.stopPropagation();
      event.preventDefault();

      var files = event.dataTransfer.files;

      // Add files to new queue
      var length = files.length; // Cache length
      for (var i = 0; i < length; i++) {
        uFile.newFiles.push(files[i]);
      }

      if (length > 0) {
        renderPreviews();
      }

    };

    document.addEventListener("turbolinks:load", function() {
      var dropzone = document.querySelector(".dropzone");
      dropzone.addEventListener("dragenter", dragEnterHandler, false);
      dropzone.addEventListener("dragover", dragOverHandler, false);
      dropzone.addEventListener("dragleave", dragLeaveHandler, false);
      dropzone.addEventListener("drop", dropHandler, false);
    });

    document.addEventListener("change", inputChangeHandler);

    return uFile;
  }

  if (typeof uFile === "undefined") {
    window.uFile = defineLib();
  } else {
    console.log("uFile is already defined.");
  }
})(window);