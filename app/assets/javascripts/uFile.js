(function (window) {
  "use strict";

  function defineLib() {
    var uFile = {};

    uFile.files = {};
    uFile.newFiles = [];
    uFile.counter = 0;


    /**
     * @return {boolean} Whether any images have been added yet.
     */
    function isEmpty () {
      return (Object.keys(uFile.files).length === 0 && uFile.files.constructor === Object);
    }


    /**
     * A delegated input change handler, that searches for appropriate file inputs.
     * @param event Change event.
     */
    function inputChangeHandler (event) {

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

    }


    /**
     * Attempts to remove an image. Fired from click listeners.
     * @param event Click event.
     */
    function removeImage (event) {

      var file = event.target.closest(".file");

      // Ensure file is not null
      if (file === null) return;

      // Remove file and delete element
      var id = file.getAttribute("data-id");
      delete uFile.files[id];
      file.parentNode.removeChild(file);

      if (isEmpty()) {

        // Show empty state
        var fileArea = document.querySelector(".file-area");
        fileArea.classList.add("empty");

        var emptyState = fileArea.querySelector(".empty-state");
        emptyState.style.display = null;

        // Disabled button
        var uploadButton = document.querySelector("button.upload");
        uploadButton.setAttribute("disabled", "");

      }

    }


    /**
     * Attempts to render previews for new files.
     */
    function renderPreviews () {

      var length = uFile.newFiles.length; // Cache length
      for (var i = 0; i < length; i++) {
        var file = uFile.newFiles[i];

        // Ensure file is an image
        if (!file.type.startsWith("image/")) {
          var type = file.type.length === 0 ? "other" : file.type;
          uFlash.error("Unsupported file type: " + type + ". Only images are supported.");
          continue;
        }

        renderPreview(file, uFile.counter);
        uFile.files[uFile.counter] = file;
        uFile.counter++;
      }

      // If there are files
      if (!isEmpty()) {

        // Remove empty class
        var fileArea = document.querySelector(".file-area");
        if (fileArea.classList.contains("empty")) {
          fileArea.classList.remove("empty");
        }

        // Hide empty state
        var emptyState = fileArea.querySelector(".empty-state");
        emptyState.style.display = "none";

        // Enable upload button
        var uploadButton = document.querySelector("button.upload");
        uploadButton.removeAttribute("disabled");

      }

      // Clear array
      uFile.newFiles = [];

    }


    /**
     * Renders a single file's preview
     * @param file File to render preview for
     * @param id File's unique id.
     */
    function renderPreview (file, id) {

      var fileArea = document.querySelector(".file-area");

      // Construct file
      var fileWrapper = document.createElement("div");
      fileWrapper.classList.add("file");
      fileWrapper.setAttribute("data-id", id);
      fileArea.appendChild(fileWrapper);

      // Construct image
      var image = document.createElement("div");
      image.classList.add("image");
      fileWrapper.appendChild(image);

      // Construct delete button
      var remove = document.createElement("button");
      remove.classList.add("remove-button");
      remove.innerHTML = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"  x=\"0px\" y=\"0px\" width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" enable-background=\"new 0 0 24 24\" xml:space=\"preserve\"><g id=\"Bounding_Boxes\"><path fill=\"none\" d=\"M0,0h24v24H0V0z\"/></g><g id=\"Rounded\"><path d=\"M18.3,5.71L18.3,5.71c-0.39-0.39-1.02-0.39-1.41,0L12,10.59L7.11,5.7c-0.39-0.39-1.02-0.39-1.41,0l0,0 c-0.39,0.39-0.39,1.02,0,1.41L10.59,12L5.7,16.89c-0.39,0.39-0.39,1.02,0,1.41h0c0.39,0.39,1.02,0.39,1.41,0L12,13.41l4.89,4.89\n\t\tc0.39,0.39,1.02,0.39,1.41,0l0,0c0.39-0.39,0.39-1.02,0-1.41L13.41,12l4.89-4.89C18.68,6.73,18.68,6.09,18.3,5.71z\"/></g></svg>";
      remove.innerHTML += "<span>Remove</span>";
      remove.addEventListener("click", removeImage);
      image.appendChild(remove);

      // Construct body
      var body = document.createElement("div");
      fileWrapper.appendChild(body);

      // Construct title input
      var title = document.createElement("input");
      title.setAttribute("type", "text");
      title.setAttribute("placeholder", "Untitled Image");
      title.classList.add("title");
      body.appendChild(title);

      // Construct label input
      var labels = document.createElement("input");
      labels.setAttribute("type", "text");
      labels.setAttribute("placeholder", "Labels");
      labels.classList.add("labels");
      body.appendChild(labels);

      // Load image asynchronously
      var reader = new FileReader();
      reader.onload = (function (img) {
        return function (event) {
          img.style.backgroundImage = "url(" + event.target.result + ")";
        };
      })(image);
      reader.readAsDataURL(file);

    }


    /**
     * An event handler that is fired whenever an element is dragged into the dropzone.
     * @param event Drag enter event
     */
    function dragEnterHandler (event) {
      event.stopPropagation();
      event.preventDefault();

      // Add active styles
      var dropzone = document.querySelector(".uFile-dropzone");
      if (!dropzone.classList.contains("active")) {
        dropzone.classList.add("active");
      }
    }


    /**
     * An event handler that is fired whenever an element is dragged over the dropzone.
     * @param event Drag over event
     */
    function dragOverHandler (event) {
      event.stopPropagation();
      event.preventDefault();
    }


    var dragExitHandler = function(event) {
      // Remove active styles
      var dropzone = document.querySelector(".uFile-dropzone");
      if (dropzone.classList.contains("active")) {
        dropzone.classList.remove("active");
      }
    }


    /**
     * An event handler that is fired whenever an element is dropped in the dropzone.
     * @param event Drop event.
     */
    function dropHandler (event) {
      event.stopPropagation();
      event.preventDefault();

      var dropzone = document.querySelector(".uFile-dropzone");
      if (dropzone.classList.contains("active")) {
        dropzone.classList.remove("active");
      }

      var files = event.dataTransfer.files;

      // Add files to new queue
      var length = files.length; // Cache length
      for (var i = 0; i < length; i++) {
        uFile.newFiles.push(files[i]);
      }

      if (length > 0) {
        renderPreviews();
      }

    }


    /**
     * Attempts to construct input fields for a particular file.
     * @param form Form to add inputs to.
     * @param file File to create inputs for.
     * @param index File index.
     */
    function constructFieldsForFile (form, file, index) {

      var fileField = document.createElement("input");
      fileField.setAttribute("name", "images[" + index + "][file]");
      fileField.setAttribute("id", "images_" + index + "_file");
      fileField.setAttribute("type", "file");
      fileField.setAttribute("data-direct-upload-url", Routes.rails_direct_uploads_path());
      fileField.files[0] = file;
      form.appendChild(fileField);

    }


    /**
     * Attempts to construct a hidden form for submitting the images and their content.
     */
    function constructForm () {
      var form = document.querySelector(".file-upload-form");

      // Remove existing inputs
      form.querySelectorAll("input").forEach(function (child) {
        // Skip over hidden fields, such as CSRF protection and UTF-8 field.
        if (child.hasAttribute("type") && child.getAttribute("type") === "hidden") return;
        // Remove element
        child.parentNode.removeChild(child);
      });

      // Construct fields for each image
      var i = 0;
      for (var key in uFile.files) {
        // Skip if the property is from prototype
        if (!uFile.files.hasOwnProperty(key)) continue;
        constructFieldsForFile(form, uFile.files[key], i);
        i++;
      }

    }


    /**
     * Attempt to begin the upload process.
     */
    function beginUpload () {

      // Ensure there are actually files to upload
      if (isEmpty()) { return; }

      // Iterate over fields, ensuring title's have been added
      var files = document.querySelectorAll(".file-area .file");
      var callback = { valid: true };
      files.forEach(function (file) {
        // Find title input
        var input = file.querySelector(".title");
        this.valid = this.valid && input.value.trim() !== "";
      }, callback);

      // Handle missing titles
      if (!callback.valid) {
        uFlash.error("Upload cancelled. Please give every image a title.");
        return;
      }

      constructForm();

    }


    document.addEventListener("dragenter", dragEnterHandler, false);
    document.addEventListener("dragover", dragOverHandler, false);
    document.addEventListener("dragexit", dragExitHandler, false);
    document.addEventListener("drop", dropHandler, false);

    document.addEventListener("change", inputChangeHandler);

    document.addEventListener("turbolinks:load", function() {
      var uploadButton = document.querySelector("button.upload");
      if (uploadButton !== null) {
        uploadButton.addEventListener("click", beginUpload);
      }
    });

    return uFile;
  }

  if (typeof uFile === "undefined") {
    window.uFile = defineLib();
  } else {
    console.log("uFile is already defined.");
  }
})(window);