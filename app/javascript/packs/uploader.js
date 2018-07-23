import * as ActiveStorage from "activestorage"
import { DirectUpload } from "activestorage"
import { dispatchEvent } from "./helpers"

ActiveStorage.start();

class Uploader {
  constructor(element, file, url) {
    this.element = element;
    this.file = file;
    this.directUpload = new DirectUpload(file, url, this);
    this.dispatch("initialize");
  }


  /**
   * Attempts to upload the file, and returns the signed id of the blob. If the upload fails for any reason, the
   * function will return null.
   */
  start() {
    this.dispatch("start");
    this.directUpload.create((error, blob) => {
      if (error) {
        this.dispatchError(error);
      }
      this.dispatch("end");
    });
  }

  uploadRequestDidProgress(event) {
    const progress = event.loaded / event.total * 100;
    if (progress) {
      this.dispatch("progress", { progress })
    }
  }

  dispatch(name, detail = {}) {
    detail.file = this.file;
    detail.element = this.element;
    detail.id = this.directUpload.id;
    return dispatchEvent(document.body, `direct-upload:${name}`, { detail });
  }

  dispatchError(error) {
    const event = this.dispatch("error", { error });
    if (!event.defaultPrevented) {
      uFlash.error(error);
    }
  }

  directUploadWillStoreFileWithXHR(request) {
    request.upload.addEventListener("progress", event => this.uploadRequestDidProgress(event))
  }

}

export default Uploader