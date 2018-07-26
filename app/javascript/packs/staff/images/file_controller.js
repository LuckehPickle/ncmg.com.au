"use strict";


export class FileController {

  /**
   * Constructs a new file controller.
   */
  constructor(onAdd) {
    this.files = {};
    this.onAdd = onAdd;
    this.idCounter = 0;
  }

  /**
   * Adds a file or files to the controller.
   * @param files A FileList.
   * @param callback Error callback.
   */
  add(files, callback) {
    for (let file of files) {
      // Ensure file is an image
      if (!file.type.startsWith("image/")) {
        callback(`File '${file.name}' is not a valid image (content type: ${file.type === '' ? 'other' : file.type}).`);
        continue;
      }

      this.files[this.idCounter] = file;
      this.onAdd(file, this.idCounter);
      this.idCounter++;
    }
  }

  /**
   * Removes a file from the controller.
   * @param id The target file's id.
   */
  remove(id) {
    delete this.files[id];
  }

  /**
   * @return {boolean} Whether any files are currently being tracked.
   */
  isEmpty() {
    return Object.keys(this.files).length === 0 && this.files.constructor === Object;
  }

  get size() {
    return Object.keys(this.files).length;
  }

}