import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../user/user';
import { CloudFileService } from '../cloud-file-service.service';
import { AppConfig } from '../../app-config/app-config';
import { EntityMapperService } from '../../entity/entity-mapper.service';
import { AlertService } from '../../alerts/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cloud-file-service-user-settings',
  templateUrl: './cloud-file-service-user-settings.component.html',
  styleUrls: ['./cloud-file-service-user-settings.component.scss'],
})
export class CloudFileServiceUserSettingsComponent implements OnInit {

  @Input() user: User;
  webdavUrl: string;
  processing: boolean;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private entityMapperService: EntityMapperService,
    private cloudFileService: CloudFileService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.webdavUrl = AppConfig.settings.webdav.remote_url;

    this.form = this.fb.group({
      cloudUser: [this.user.cloudUserName, Validators.required],
      cloudPassword: ['', Validators.required],
      userPassword: ['', Validators.required],
    });
  }

  /**
   * Sets the username and password for the cloud-service, provided the login password is correct
   */
  async updateCloudServiceSettings() {
    const password = this.form.controls.userPassword.value;
    if (!this.user.checkPassword(password)) {
      this.form.controls.userPassword.setErrors({ incorrectPassword: true });
      return;
    }

    this.processing = true;

    this.user.cloudUserName = this.form.controls.cloudUser.value;
    this.user.setCloudPassword(this.form.controls.cloudPassword.value, password);

    try {
      await this.cloudFileService.connect();
      const isConnected = await this.cloudFileService.checkConnection();
      if (!isConnected) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('Connection check failed.');
      }
    } catch (error) {
      this.form.controls.cloudPassword.setErrors({ connectionFailed: true });
      console.warn(error);
      this.processing = false;
      return;
    }

    await this.entityMapperService.save<User>(this.user);
    this.alertService.addSuccess('Successfully saved cloud service credentials.');
    this.processing = false;
  }
}
