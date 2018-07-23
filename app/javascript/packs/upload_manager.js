"use strict";

import FileController from "./file_controller";
import Uploader from "./uploader";

const fileController = new FileController("input.auto-submit");


/**
 * An event handler that is fired whenever a remove button is clicked.
 * @param event Click event object.
 */
const onRemove = (event) => {
  const element = event.target.closest(".file");
  if (element === null) return;

  // Remove file from file manager, and delete element
  const id = file.getAttribute("data-id");
  fileController.removeFile(id);
  element.parentNode.removeChild(element);

  // Show empty states if no more files
  if (fileController.isEmpty()) {
    const fileArea = document.querySelector(".file-area");
    const emptyState = fileArea.querySelector(".empty-state");
    const uploadButton = document.querySelector("button.upload");
    fileArea.classList.add("empty");
    emptyState.style.display = null;
    uploadButton.setAttribute("disabled", "");
  }
};


/**
 * Constructs an element for previewing a specific file.
 * @param file File to create preview element for.
 * @param id File id.
 */
const constructPreview = (file, id) => {
  const fileArea = document.querySelector(".file-area");

  // Construct file
  const fileWrapper = document.createElement("div");
  fileWrapper.classList.add("file");
  fileWrapper.setAttribute("data-id", id);
  fileArea.appendChild(fileWrapper);

  // Construct image
  const image = document.createElement("div");
  image.classList.add("image");
  fileWrapper.appendChild(image);

  // Construct delete button
  const remove = document.createElement("button");
  remove.classList.add("remove-button");
  remove.innerHTML = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"  x=\"0px\" y=\"0px\" width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" enable-background=\"new 0 0 24 24\" xml:space=\"preserve\"><g id=\"Bounding_Boxes\"><path fill=\"none\" d=\"M0,0h24v24H0V0z\"/></g><g id=\"Rounded\"><path d=\"M18.3,5.71L18.3,5.71c-0.39-0.39-1.02-0.39-1.41,0L12,10.59L7.11,5.7c-0.39-0.39-1.02-0.39-1.41,0l0,0 c-0.39,0.39-0.39,1.02,0,1.41L10.59,12L5.7,16.89c-0.39,0.39-0.39,1.02,0,1.41h0c0.39,0.39,1.02,0.39,1.41,0L12,13.41l4.89,4.89\n\t\tc0.39,0.39,1.02,0.39,1.41,0l0,0c0.39-0.39,0.39-1.02,0-1.41L13.41,12l4.89-4.89C18.68,6.73,18.68,6.09,18.3,5.71z\"/></g></svg>";
  remove.innerHTML += "<span>Remove</span>";
  remove.addEventListener("click", onRemove);
  image.appendChild(remove);

  // Construct body
  const body = document.createElement("div");
  fileWrapper.appendChild(body);

  // Construct title input
  const title = document.createElement("input");
  title.setAttribute("type", "text");
  title.setAttribute("placeholder", "Untitled Image");
  title.classList.add("title");
  body.appendChild(title);

  // Construct label input
  const labels = document.createElement("input");
  labels.setAttribute("type", "text");
  labels.setAttribute("placeholder", "Labels");
  labels.classList.add("labels");
  body.appendChild(labels);

  // Load image asynchronously
  const reader = new FileReader();
  reader.onload = ((img) => {
    return (event) => {
      img.style.backgroundImage = `url(${event.target.result})`;
    };
  })(image);
  reader.readAsDataURL(file);
};


/**
 * Constructs the form fields required for submitting a particular. file
 * @param signed_id Signed id of the blob.
 * @param index An index for the image being uploading.
 */
const constructField = (signed_id, index) => {
  const form = document.querySelector("form.file-upload-form");

  // Create file
  const fileField = document.createElement("input");
  fileField.setAttribute("type", "hidden");
  fileField.setAttribute("value", signed_id);
  fileField.name = `images[${index}][file]`;
  form.appendChild(fileField);

  // Add title
  const titleField = document.createElement("input");
  titleField.setAttribute("type", "hidden");
  titleField.setAttribute("value", "Untitled Image");
  titleField.name = `images[${index}][title]`;
  form.appendChild(titleField);

  // Create fields for labels


};


/**
 * Begin the process of uploading the images.
 */
const beginUpload = () => {
  // Ensure there are actually files to upload
  if (fileController.isEmpty()) return;

  // Ensure that entered information is valid
  if (!validateImages()) return;

  const input = document.querySelector("input.auto-submit");
  const url = input.dataset.directUploadUrl;
  const files = fileController.files;
  let index = 0;

  Object.keys(files).forEach(key => {
    // Upload each file
    const element = document.querySelector(`.file[data-id='${key}']`);
    const uploader = new Uploader(element, files[key], url);
    uploader.start();
  })

};


/**
 * Validate the images, their titles, and labels once the user clicks upload. This method also shows flash messages
 * where appropriate.
 * @return {boolean} Whether the images are valid.
 */
const validateImages = () => {

  // Iterate over fields, ensuring title's have been added
  const files = document.querySelectorAll(".file-area .file");
  let valid = true;
  files.forEach(file => {
    // Find title input
    const input = file.querySelector(".title");
    valid = valid && input.value.trim() !== "";
  });

  if (!valid) {
    uFlash.error("Upload cancelled. Please give every image a title.");
  }

  return valid;

};


// Listen for files being added to the file controller
addEventListener("files:added", (event) => {
  // Iterate over and render files
  const files = event.detail;
  Object.keys(files).forEach(key => constructPreview(files[key], key));

  const fileArea = document.querySelector(".file-area");
  if (fileArea.classList.contains("empty")) {
    fileArea.classList.remove("empty");
  }

  // Hide empty state
  const emptyState = fileArea.querySelector(".empty-state");
  emptyState.style.display = "none";

  // Enable upload button
  const uploadButton = document.querySelector("button.upload");
  uploadButton.removeAttribute("disabled");
});


// Handle files adding errors
addEventListener("files:error", (event) => {
  const type = event.detail.type.length === 0 ? "other" : event.detail.type;
  uFlash.error(
      "Unsupported file type",
      `The file type ${type} is not supported. Please only upload image files (such as .png, .jpg, .jpeg, etc).`
  );
});


// Bind to upload button click
document.addEventListener("turbolinks:load", function () {
  const uploadButton = document.querySelector("button.upload");
  if (uploadButton !== null) {
    uploadButton.addEventListener("click", beginUpload)
  }
});


// Bind to upload init
addEventListener("direct-upload:initialize", event => {
  const { id, element } = event.detail;

  // Disable inputs
  const inputs = element.querySelectorAll("input");
  inputs.forEach(input => input.setAttribute("disabled", ""));
  element.querySelector(".remove-button").style.display = "none";
  element.querySelector(".image").style.filter = "grayscale(100%)";

  // Create progress bar
  const progressBar = document.createElement("div");
  progressBar.classList.add(`direct-upload-${id}`, "direct-upload-progress");
  element.appendChild(progressBar);
});


// Bind to direct upload progress
addEventListener("direct-upload:progress", event => {
  const { id, progress, element } = event.detail;
  const progressElement = document.querySelector(`.direct-upload-${id}`);
  progressElement.style.transform = `scaleX(${progress / 100})`;
  element.querySelector(".image").style.filter = `grayscale(${100 - progress}%)`;
});

// Bind to direct upload completion
addEventListener("direct-upload:end", event => {
  const { id, element } = event.detail;
  const image = element.querySelector(".image");
  const tick = document.createElement("div");
  tick.classList.add("success");
  image.appendChild(tick);
});