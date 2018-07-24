import { Uploader } from "./uploader";
import { dispatchEvent } from "../helpers";

export class DirectUploadsController {

  /**
   * Constructs a new direct uploads controller.
   * @param url URL to upload to.
   * @param files Files to upload.
   */
  constructor(url, files) {
    this.url = url;
    this.files = files;
  }

  /**
   * Begins the process of uploading each file.
   * @param callback A callback function, that could contain error messages.
   */
  start(callback) {
    const uploaders = this._createUploaders();

    const startNextUploader = () => {
      const uploader = uploaders.shift();
      if (uploader) {
        uploader.start(error => {
          if (error) {
            callback(error);
          } else {
            startNextUploader();
          }
        })
      } else {
        callback();
      }
    };

    startNextUploader();
    this.dispatch("finished");
  }

  /**
   * Creates an uploader for each file added to the form.
   * @return {Array} An array of uploaders.
   * @private
   */
  _createUploaders() {
    const uploaders = [];
    Object.keys(this.files).forEach(key => {
      uploaders.push(new Uploader(key, this.files[key], this.url))
    });
    return uploaders;
  }

  dispatch(name, detail = {}) {
    detail.url = this.url;
    return dispatchEvent(document.body, `direct-upload:${name}`, { detail });
  }

}