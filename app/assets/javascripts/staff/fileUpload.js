"use strict";

function inputChangeHandler (event) {

  var input = event.target;

  // Ensure input is a file input
  if (!input.hasAttribute("type") ||
      input.getAttribute("type") !== "file" ||
      !input.classList.contains("auto-submit")) {
    return;
  }

  // Store files and add thumbnails

  constructAdditionalInputs(input.files);
  input.value = "";

}


/**
 * Constructs n extra file inputs, where n is the number of files uploaded.
 * @param files Files uploaded.
 */
function constructAdditionalInputs (files) {

  var form = document.querySelector(".file-upload-form");

  // Iterate over files in list
  for (var i = 0; i < files.length; i++) {
    var input = document.createElement("input");
    input.setAttribute("name", "images[" + i + "][file]");
    input.setAttribute("id", "images_" + i + "_file");
    input.setAttribute("type", "file");
    input.files[0] = files[i];
    form.appendChild(input);
  }

}