import { DirectUpload } from "activestorage"
import { dispatchEvent } from "../../helpers"

export class Uploader {

  /**
   * Constructs a new uploader.
   * @param elementId File's internal id (separate to the direct upload id).
   * @param file File to upload.
   * @param url URL to upload to.
   */
  constructor(elementId, file, url) {
    this.elementId = elementId;
    this.file = file;
    this.directUpload = new DirectUpload(file, url, this);
    this.dispatch("initialize");
  }


  /**
   * Attempts to upload the file, and returns the signed id of the blob. If the upload fails for any reason, the
   * function will return null.
   * @param callback A callback function that could contain errors.
   */
  start(callback) {
    this.dispatch("start");
    this.directUpload.create((error, blob) => {
      if (error) {
        this.dispatchError(error);
      } else {
        this.dispatch("success", { signedId: blob.signed_id } );
      }
      this.dispatch("end");
      callback(error);
    });
  }

  uploadRequestDidProgress(event) {
    const progress = event.loaded / event.total * 100;
    if (progress) {
      this.dispatch("progress", { progress })
    }
  }

  dispatch(name, detail = {}) {
    detail.elementId = this.elementId;
    detail.file = this.file;
    detail.uploadId = this.directUpload.id;
    return dispatchEvent(document.body, `direct-upload:${name}`, { detail });
  }

  dispatchError(error) {
    const event = this.dispatch("error", { error });
    if (!event.defaultPrevented) {
      alert(error);
    }
  }

  directUploadWillStoreFileWithXHR(request) {
    request.upload.addEventListener("progress", event => this.uploadRequestDidProgress(event))
  }

}