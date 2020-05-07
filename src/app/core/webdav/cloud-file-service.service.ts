import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config';
import webdav from 'webdav';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SessionService } from '../session/session-service/session.service';

/**
 * Connect and access a remote cloud file system like Nextcloud
 * to upload and download files.
 *
 * Connection requires setup of the server in the AppConfig
 * as well as valid user credentials for that server in the currently logged in user entity.
 */
@Injectable()
export class CloudFileService {

  // TODO Check connection/login success?
  private client: any;
  private basePath: string;
  private fileList: string;
  private currentlyGettingList: Promise<boolean>;

  /**
   * Construct the service and immediately attempt to connect to the server with the current user.
   * @param domSanitizer
   * @param sessionService
   */
  constructor(
    private domSanitizer: DomSanitizer,
    private sessionService: SessionService,
  ) {
      this.connect();
  }

  /**
   * (Re)-initialize the client connecting to the webdav server.
   * @param username Optional webdav username, otherwise the one set in the current user entity is used.
   * @param password Optional webdav password, otherwise the one set in the current user entity is used.
   */
  public async connect(username: string = null, password: string = null) {
    if (!AppConfig.settings.webdav || !this.sessionService.getCurrentUser()) {
      return;
    }

    this.reset();

    const currentUser = this.sessionService.getCurrentUser();
    this.basePath = currentUser.cloudBaseFolder;

    if (username === null && password == null) {
      username = currentUser.cloudUserName;
      password = currentUser.cloudPasswordDec;
    }

    if (!username || !password) {
      // abort if account is not configured
      this.client = null;
      return;
    }

    this.client = await webdav.createClient(
      AppConfig.settings.webdav.remote_url,
      {
        username: username,
        password: password,
      },
    );
  }

  /**
   * Reset the current state and requests.
   * e.g. clear promise that retrieves the root dir
   */
  private reset() {
    this.currentlyGettingList = null;
    this.fileList = null;
  }

  /**
   * checkConnection
   *
   * tries to upload and redownload a file.
   */
  public async checkConnection(): Promise<boolean> {
    // delete 'tmp.txt' if it exists
    const fileName: string = this.basePath + '/test.txt';
    if (await this.doesFileExist(fileName)) {
      await this.client.deleteFile(fileName);
    }

    await this.client.putFileContents(fileName, 'TestString');
    const buffer = await this.client.getFileContents(fileName);
    const tmpContent = String.fromCharCode.apply(null, new Uint8Array(buffer));
    await this.client.deleteFile(fileName);

    if (tmpContent === 'TestString') {
      return true;
    }
    return false;
  }

  /**
   * Returns the content path.
   * @param path File path relative to the base path, without leading slash; example 'folder1'
   */
  public async getDir(path: string): Promise<string> {
    const contents = await this.client.getDirectoryContents(this.basePath + path);
    return JSON.stringify(contents, undefined, 4);
  }

  /**
   * Checks if the file exists in the root directory.
   * @param name file name to check
   */
  public async doesFileExist(name: string): Promise<boolean> {
    // TODO: doesFileExist seems to have problems at least with nested files?

    if (!this.fileList && !this.currentlyGettingList) {
      // create promise that resolves when the file list is loaded
      // if this function gets called mulitple times this ensures that the list will only be loaded once
      this.currentlyGettingList = new Promise(resolve => {
        this.getDir('').then(list => {
          this.fileList = list;
          resolve(true);
        });
      });
    }
    if (!this.fileList) {
      await this.currentlyGettingList;
    }
    // hacky way of checking if file exists, subject to change
    // TODO fix this
    if (this.fileList.includes('"basename": "' + name.split('/').pop() + '"')) {
      return true;
    }
    return false;
  }

  /**
  * creates new directory
  * @param path path to directory to be created, without leading slash; e.g. 'new-folder'
  */
  public async createDir(path: string) {
    this.client.createDirectory(this.basePath + path);
  }

  /**
   * Uploads a given file to the nextcloud server.
   * @param file The file to be stored
   * @param filePath the filename and path to which the file will be uploaded, no leading slash
   */
  public async uploadFile(file: any, filePath: string): Promise<void> {
    return this.client.putFileContents(
      this.basePath + filePath,
      file,
      // { onUploadProgress: progress => {  console.log(`Uploaded ${progress.loaded} / ${progress.total} bytes`); } },
    );
  }

  /**
   * Returns a Promise which resolves as an ArrayBuffer of the file located at the given path
   * @param filePath the filename and path relative to the base path without leading slash; e.g. 'photos/105.png'
   */
  public async getFile(filePath: string): Promise<SafeUrl> {
    let file;
    try {
      file = await this.client.getFileContents(this.basePath + filePath);
      return this.bufferArrayToBase64(file);
    } catch (err) {
      return Promise.reject('Could not load file.');
    }
  }

  /**
   * converts an ArrayBuffer to a SafeUrl and returns it
   * @param arrayBuffer ArrayBuffer to be converted
   */
  private bufferArrayToBase64(arrayBuffer: ArrayBuffer): SafeUrl {
    const base64String = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => {
        return data + String.fromCharCode(byte); }, ''),
      );
    return this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + base64String);
  }

  /**
   * Check whether the client is connected and therefore this service is able to execute its remote actions.
   */
  public isConnected() {
    return !!this.client;
  }
}
