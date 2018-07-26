"use strict";

import { Flash } from "../../flashes/flash";

export class DragAndDrop {

  /**
   * Constructs a new DragAndDrop Listener.
   * @param fileController File controller to add files to.
   */
  constructor(fileController) {
    this.fileController = fileController;
    addEventListener("dragenter", DragAndDrop._onDragEnter, false);
    addEventListener("dragover", DragAndDrop._onDragOver, false);
    addEventListener("dragexit", DragAndDrop._onDragExit, false);
    addEventListener("drop", this._onDrop.bind(this), false);
  }

  /**
   * An event handler that is fired whenever a user drags something over the document body.
   * @param event Event object.
   * @private
   */
  static _onDragEnter(event) {
    event.stopPropagation();
    event.preventDefault();
    DragAndDrop._addDropzoneStyle();
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
    DragAndDrop._removeDropzoneStyle()
  }

  /**
   * An event handler that is fired whenever an element is dropped within the drop zone.
   * @param event Event object.
   * @private
   */
  _onDrop(event) {
    event.stopPropagation();
    event.preventDefault();
    DragAndDrop._removeDropzoneStyle();
    this.fileController.add(event.dataTransfer.files, (error) => {
      if (error) {
        new Flash("error", "Could not add file", error).show();
      }
    });
  }

  /**
   * Add the dropzone outline.
   * @private
   */
  static _addDropzoneStyle() {
    if (!document.body.classList.contains("dropzone")) {
      document.body.classList.add("dropzone");
    }
  }

  /**
   * Remove the dropzone outline.
   * @private
   */
  static _removeDropzoneStyle() {
    if (document.body.classList.contains("dropzone")) {
      document.body.classList.remove("dropzone");
    }
  }

}