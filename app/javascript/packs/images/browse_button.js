"use strict";

import { Flash } from "../flashes/flash";

export class BrowseButton {

  /**
   * Constructs a new browse button listener.
   * @param fileController File controller to add new files to.
   * @param selector Browse button selector.
   */
  constructor(fileController, selector = "input[type='file'][data-direct-upload-url]:not([disabled])") {
    this.fileController = fileController;
    this.selector = selector;
    addEventListener("change", this._onChange.bind(this));
  }

  /**
   * Handles all input change events on the document. Delegated, so that only the target selector is listened to.
   * @param event Change event.
   * @private
   */
  _onChange(event) {
    const { target } = event;
    if (!target.matches(this.selector)) return;
    this.fileController.add(target.files, error => {
      if (error) {
        new Flash("error", "Could not add file", error).show();
      }
    });
    target.value = "";
  }

}