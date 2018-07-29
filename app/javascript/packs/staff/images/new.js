"use strict";

import * as ActiveStorage from "activestorage"
import { FileController } from "./file_controller"
import { DragAndDrop } from "./drag_and_drop"
import { BrowseButton } from "./browse_button";
import { DirectUploadsController } from "./direct_uploads_controller";
import { Flash } from "../../flashes/flash";

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
  stateWrapper.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="material-icons" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve"><g id="Bounding_Boxes"><g id="ui_x5F_spec_x5F_header_copy_2"></g><path fill="none" d="M0,0h24v24H0V0z"/></g><g id="Rounded"><g id="ui_x5F_spec_x5F_header_copy_6"></g><path d="M14,1h-4C9.45,1,9,1.45,9,2v0c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1v0C15,1.45,14.55,1,14,1z M12,14L12,14c0.55,0,1-0.45,1-1V9c0-0.55-0.45-1-1-1h0c-0.55,0-1,0.45-1,1v4C11,13.55,11.45,14,12,14z M19.03,7.39l0.75-0.75c0.38-0.38,0.39-1.01,0-1.4c0,0-0.01-0.01-0.01-0.01c-0.39-0.39-1.01-0.38-1.4,0l-0.75,0.75C16.07,4.74,14.12,4,12,4c-4.8,0-8.88,3.96-9,8.76C2.87,17.84,6.94,22,12,22c4.98,0,9-4.03,9-9C21,10.88,20.26,8.93,19.03,7.39z M12,20c-3.87,0-7-3.13-7-7s3.13-7,7-7s7,3.13,7,7S15.87,20,12,20z"/></g></svg><span>Waiting...</span>`;
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
  const stateWrapper = element.querySelector(".state-wrapper");
  if (progress === 100) {
    stateWrapper.innerHTML = `<svg class="material-icons rotating" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve"><g id="Header_x2F_BG" display="none"><rect x="-270" y="-182" display="inline" fill="#F1F1F2" width="520" height="520"/></g><g id="Bounding_Boxes"><g id="ui_x5F_spec_x5F_header_copy_3"></g><path fill="none" d="M0,0h24v24H0V0z"/></g><g id="Rounded"><g id="ui_x5F_spec_x5F_header_copy_5"></g><path d="M18.65,8.35l-2.79,2.79C15.54,11.46,15.76,12,16.21,12H18c0,3.31-2.69,6-6,6c-0.79,0-1.56-0.15-2.25-0.44 c-0.36-0.15-0.77-0.04-1.04,0.23h0c-0.51,0.51-0.33,1.37,0.34,1.64C9.96,19.8,10.96,20,12,20c4.42,0,8-3.58,8-8h1.79 c0.45,0,0.67-0.54,0.35-0.85l-2.79-2.79C19.16,8.16,18.84,8.16,18.65,8.35z M6,12c0-3.31,2.69-6,6-6c0.79,0,1.56,0.15,2.25,0.44 c0.36,0.15,0.77,0.04,1.04-0.23l0,0c0.51-0.51,0.33-1.37-0.34-1.64C14.04,4.2,13.04,4,12,4c-4.42,0-8,3.58-8,8H2.21 c-0.45,0-0.67,0.54-0.35,0.85l2.79,2.79c0.2,0.2,0.51,0.2,0.71,0l2.79-2.79C8.46,12.54,8.24,12,7.79,12H6z"/></g></svg><span>Processing...</span>`;
  } else if (!stateWrapper.classList.contains("uploading")) {
    stateWrapper.classList.add("uploading");
    stateWrapper.innerHTML = `<svg class="material-icons uploading" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve"><g id="Bounding_Boxes"><path fill="none" d="M0,0h24v24H0V0z"/></g><g id="Rounded"><path d="M13,19V7.83l4.88,4.88c0.39,0.39,1.03,0.39,1.42,0l0,0c0.39-0.39,0.39-1.02,0-1.41l-6.59-6.59c-0.39-0.39-1.02-0.39-1.41,0L4.7,11.29c-0.39,0.39-0.39,1.02,0,1.41l0,0c0.39,0.39,1.02,0.39,1.41,0L11,7.83V19c0,0.55,0.45,1,1,1h0C12.55,20,13,19.55,13,19z"/></g></svg><span>Uploading...</span>`;
  }
});

// Bind to success
addEventListener("direct-upload:success", event => {
  const { elementId, signedId, uploadId } = event.detail;
  const element = getFileElement(elementId);

  // Update state icon
  const stateWrapper = element.querySelector(".state-wrapper");
  stateWrapper.innerHTML = `<svg version="1.1" class="material-icons" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve"><g id="Bounding_Boxes"><g id="ui_x5F_spec_x5F_header_copy_3"></g><path fill="none" d="M0,0h24v24H0V0z"/></g><g id="Rounded"><g id="ui_x5F_spec_x5F_header_copy_5"></g><path d="M9,16.2l-3.5-3.5c-0.39-0.39-1.01-0.39-1.4,0l0,0c-0.39,0.39-0.39,1.01,0,1.4l4.19,4.19c0.39,0.39,1.02,0.39,1.41,0 L20.3,7.7c0.39-0.39,0.39-1.01,0-1.4l0,0c-0.39-0.39-1.01-0.39-1.4,0L9,16.2z"/></g></svg><span>Complete</span>`;

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
});