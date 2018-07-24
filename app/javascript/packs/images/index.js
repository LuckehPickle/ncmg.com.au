"use strict";

import * as ActiveStorage from "activestorage"
import { FileController } from "./file_controller"
import { DragAndDrop } from "./drag_and_drop"
import { BrowseButton } from "./browse_button";
import { DirectUploadsController } from "./direct_uploads_controller";
import { Flash } from "../flashes/flash";

let fileController;
let directUploadURL;
let success = true;
let processed = 0;

/**
 * Shows an empty state in the file area.
 * @private
 */
const _showEmptyState = () => {
  const uploadButton = document.querySelector("button.upload");
  const fileArea = document.querySelector(".file-area");
  const emptyState = fileArea.querySelector(".empty-state");
  fileArea.classList.add("empty");
  emptyState.style.display = null;
  uploadButton.setAttribute("disabled", "");
};

/**
 * Fired whenever the remove image button on a preview is clicked.
 * @param event Click event.
 */
const _onPreviewRemove = event => {
  const { target } = event;
  const element = target.closest(".file");
  if (element === null) return;

  // Destroy element, and delete from file controller
  const id = element.dataset.id;
  fileController.remove(id);
  element.parentNode.removeChild(element);

  // Show empty state if there are no more files left
  if (!document.querySelector(".file")) _showEmptyState();
};

/**
 * Constructs the elements required for previewing a file, and adds them to the file area.
 * @param file File that was added.
 * @param id The file's internal file id.
 */
const constructFilePreview = (file, id) => {
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
  remove.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve"><g id="Bounding_Boxes"><path fill="none" d="M0,0h24v24H0V0z"/></g><g id="Rounded"><path d="M18.3,5.71L18.3,5.71c-0.39-0.39-1.02-0.39-1.41,0L12,10.59L7.11,5.7c-0.39-0.39-1.02-0.39-1.41,0l0,0 c-0.39,0.39-0.39,1.02,0,1.41L10.59,12L5.7,16.89c-0.39,0.39-0.39,1.02,0,1.41h0c0.39,0.39,1.02,0.39,1.41,0L12,13.41l4.89,4.89 c0.39,0.39,1.02,0.39,1.41,0l0,0c0.39-0.39,0.39-1.02,0-1.41L13.41,12l4.89-4.89C18.68,6.73,18.68,6.09,18.3,5.71z"/></g></svg>`;
  remove.innerHTML += "<span>Remove</span>";
  remove.addEventListener("click", _onPreviewRemove);
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
  reader.onload = (img => {
    return event => img.style.backgroundImage = `url(${event.target.result})`
  })(image);
  reader.readAsDataURL(file);
};

/**
 * Fired whenever an image is successfully added to the file controller.
 * @param file File that was added.
 * @param elementId The file's internal file id.
 */
const onAdd = (file, elementId) => {
  constructFilePreview(file, elementId);

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
};

/**
 * Validates all image fields.
 * @return {boolean} Whether the image fields are valid.
 */
const validateFields = () => {
  return true;
};

/**
 * An event handler that is fired when the upload button is clicked.
 * @param event Click event
 */
const onUploadButtonClick = event => {
  const { target } = event;
  if (target.hasAttribute("disabled") || fileController.isEmpty() || !validateFields()) return;

  // Disable inputs
  const browseButton = document.querySelector("input.auto-submit");
  target.setAttribute("disabled", "");
  browseButton.setAttribute("disabled", "");
  browseButton.previousElementSibling.setAttribute("disabled", "");

  // Begin uploading files
  const uploadsController = new DirectUploadsController(directUploadURL, fileController.files);
  uploadsController.start((error) => {
    if (error) {
      new Flash("error", "Could not upload file", error).show();
    }
  });
};

/**
 * Retrieves the file element of a specific file
 * @param elementId Target file's id.
 */
const getFileElement = (elementId) => {
  return document.querySelector(`.file[data-id='${elementId}']`)
};

/**
 * Constructs form fields for a given file.
 * @param signedId Signed ID of the file's blob.
 * @param uploadId Direct upload's file id.
 * @param elementId Id of file's preview element.
 */
const constructFileFields = (signedId, uploadId, elementId) => {
  const form = document.querySelector("form.file-upload-form");
  const element = getFileElement(elementId);
  const titleInput = element.querySelector("input.title");
  const labelInput = element.querySelector("input.labels");

  // Create file
  const fileField = document.createElement("input");
  fileField.setAttribute("type", "hidden");
  fileField.setAttribute("value", signedId);
  fileField.name = `images[][file]`;
  form.appendChild(fileField);

  // Add title
  const titleField = document.createElement("input");
  titleField.setAttribute("type", "hidden");
  titleField.setAttribute("value", titleInput.value);
  titleField.name = `images[][title]`;
  form.appendChild(titleField);

  // Create fields for labels
  // const labelField = document.createElement("input");
  // labelField.setAttribute("type", "hidden");
  // labelField.setAttribute("value", labelInput.value);
  // labelField.name = `images[][labels]`;
  // form.appendChild(labelField);
};

/**
 * Performs various initialisation steps in order to enable file uploading.
 */
function initImageUploader() {
  // Init active storage and file controller
  ActiveStorage.start();
  fileController = new FileController(onAdd);

  // Init drag-and-drop, plus file browser
  new DragAndDrop(fileController);
  new BrowseButton(fileController);

  // Init upload button
  const uploadButton = document.querySelector("button.upload");
  uploadButton.addEventListener("click", onUploadButtonClick);

  // Retrieve direct upload url
  const input = document.querySelector("input[type='file'][data-direct-upload-url]:not([disabled])");
  directUploadURL = input.dataset.directUploadUrl;
}

// Bind to page load
addEventListener("turbolinks:load", () => {
  if (document.body.classList.contains("dropable")) initImageUploader();
});

// Bind to file upload init
addEventListener("direct-upload:initialize", event => {
  const { elementId, uploadId } = event.detail;
  const element = getFileElement(elementId);

  // Disable inputs
  const inputs = element.querySelectorAll("input");
  inputs.forEach(input => input.setAttribute("disabled", ""));
  element.querySelector(".remove-button").style.display = "none";
  element.querySelector(".image").style.filter = "grayscale(100%)";

  // Create progress bar
  const progressBar = document.createElement("div");
  progressBar.classList.add(`direct-upload-${uploadId}`, "direct-upload-progress");
  element.appendChild(progressBar);

  // Create state identifier
  const image = element.querySelector(".image");
  const stateWrapper = document.createElement("div");
  stateWrapper.classList.add("state-wrapper");
  image.appendChild(stateWrapper);

});

// Bind to file upload progress
addEventListener("direct-upload:progress", event => {
  const { uploadId, progress, elementId } = event.detail;
  const element = getFileElement(elementId);
  const progressElement = document.querySelector(`.direct-upload-${uploadId}`);

  // Update progress bar and grayscale
  progressElement.style.transform = `scaleX(${progress / 100})`;
  element.querySelector(".image").style.filter = `grayscale(${100 - progress}%)`;

  // Update state icon if necessary
  if (progress === 100) {
    const stateWrapper = element.querySelector(".state-wrapper");
    stateWrapper.innerText = "Processing...";
  }
});

// Bind to success
addEventListener("direct-upload:success", event => {
  const { elementId, signedId, uploadId } = event.detail;
  const element = getFileElement(elementId);

  // Update state icon
  const stateWrapper = element.querySelector(".state-wrapper");
  stateWrapper.innerText = "Done";

  constructFileFields(signedId, uploadId, elementId);
});

// Bind to failure
addEventListener("direct-upload:error", event => {
  const { elementId } = event.detail;
  const element = getFileElement(elementId);

  // Update state icon
  const stateWrapper = element.querySelector(".state-wrapper");
  stateWrapper.innerText = "Failed";
  success = false;
});

// Bind to upload completion
addEventListener("direct-upload:end", event => {
  processed++;
  if (processed !== fileController.size) return;
  const form = document.querySelector("form.file-upload-form");
  form.submit();
  console.log("done");
});