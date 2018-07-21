"use strict";

class FileController {

  /**
   * Constructs a new File Controller, responsible for grabbing files from drag and drop events, as well as file input
   * change events.
   * @param inputSelector A selector which matches a single file input, to watch for changes on.
   */
  constructor(inputSelector) {
    this.files = {};
    this.idCounter = 0;
    this.inputSelector = inputSelector;

    // Bind to drag and drop events
    document.addEventListener("dragenter", FileController._onDragEnter, false);
    document.addEventListener("dragover", FileController._onDragOver, false);
    document.addEventListener("dragexit", FileController._onDragExit, false);
    document.addEventListener("drop", this._onDrop.bind(this), false);

    // Bind to input change events
    document.addEventListener("change", this._onChange.bind(this));
  }


  /**
   * Adds a file or files to the controller.
   * @param files A FileList of files to add.
   */
  addFiles(files) {

    const validFiles = {};

    // Push valid files
    for (let file of files) {

      // Ensure file is an image
      if (!file.type.startsWith("image/")) {
        const event = new CustomEvent("files:error", {bubbles: true, detail: file});
        document.body.dispatchEvent(event);
        continue;
      }

      validFiles[this.idCounter] = file;
      this.files[this.idCounter] = file;
      this.idCounter++;

    }

    // Only fire event if there are valid files
    if (validFiles.length !== 0) {
      const event = new CustomEvent('files:added', {bubbles: true, detail: validFiles});
      document.body.dispatchEvent(event);
    }

  }


  /**
   * Removes a file from the file manager, if it exists.
   * @param id Id of file to remove.
   */
  removeFile(id) {
    delete this.files[id];
    console.log("Removing file");
    console.log(this.files);
  }


  /**
   * @return {boolean} Whether any files have been added yet.
   */
  isEmpty() {
    return Object.keys(this.files).length === 0 && this.files.constructor === Object;
  }


  /**
   * An event handler that is fired whenever a user drags something over the document body.
   * @param event Event object.
   * @private
   */
  static _onDragEnter(event) {
    event.stopPropagation();
    event.preventDefault();

    // Style the dropzone accordingly
    if (!document.body.classList.contains("dropzone")) {
      document.body.classList.add("dropzone");
    }
  }


  /**
   * An event handler that is fired repeatedly whilst an element is dragged over a valid drop zone.
   * @param event Event object.
   * @private
   */
  static _onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }


  /**
   * An event handler that is fired whenever an element leaves the drop zone.
   * @private
   */
  static _onDragExit() {
    // Remove dropzone styles
    if (document.body.classList.contains("dropzone")) {
      document.body.classList.remove("dropzone");
    }
  }


  /**
   * An event handler that is fired whenever an element is dropped within the drop zone.
   * @param event Event object.
   * @private
   */
  _onDrop(event) {
    event.stopPropagation();
    event.preventDefault();

    // Remove dropzone styles
    if (document.body.classList.contains("dropzone")) {
      document.body.classList.remove("dropzone");
    }

    // Add files to controller
    this.addFiles(event.dataTransfer.files);
  }


  /**
   * An delegated event handler that is fired whenever an input's value changes.
   * @param event Event object
   * @private
   */
  _onChange(event) {
    const target = event.target;

    // Ensure that we have the right element
    if (!target.hasAttribute("type") ||
        target.getAttribute("type") !== "file" ||
        !target.matches(this.inputSelector)) {
      return;
    }

    // Add new files
    this.addFiles(target.files);

    // Clear input
    target.value = "";
  }

}

export default FileController