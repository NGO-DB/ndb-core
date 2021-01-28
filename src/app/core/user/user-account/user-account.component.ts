/*
 *     This file is part of ndb-core.
 *
 *     ndb-core is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     ndb-core is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with ndb-core.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Component, OnInit } from "@angular/core";
import { User } from "../user";
import { SessionService } from "../../session/session-service/session.service";
import { EntityMapperService } from "../../entity/entity-mapper.service";
import { WebdavModule } from "../../webdav/webdav.module";
import { UserAccountService } from "./user-account.service";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { AppConfig } from "../../app-config/app-config";

/**
 * User account form to allow the user to view and edit information.
 */
@Component({
  selector: "app-user-account",
  templateUrl: "./user-account.component.html",
  styleUrls: ["./user-account.component.scss"],
})
export class UserAccountComponent implements OnInit {
  /** user to be edited */
  user: User;

  /** whether webdav integration is configured and the cloud settings section should be displayed */
  webdavEnabled = WebdavModule.isEnabled;

  /** whether password change is disallowed because of demo mode */
  disabledForDemoMode: boolean;
  disabledForOfflineMode: boolean;

  // Requires at least 8 letters, one capital letter and one symbol or number
  passwordPattern =
    "^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$";
  passwordErrorMessage = "";

  passwordForm = this.fb.group({
    currentPassword: ["", Validators.required],
    newPassword: this.fb.group(
      {
        newPassword: [
          "",
          [Validators.required],                      // TODO include Validators.pattern(this.passwordPattern)
        ],
        confirmPassword: ["", [Validators.required]],
      },
      { validator: this.passwordMathValidator }
    ),
  });

  constructor(
    private entityMapperService: EntityMapperService,
    private sessionService: SessionService,
    private userAccountService: UserAccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.checkIfPasswordChangeAllowed();
    this.user = this.sessionService.getCurrentUser();
  }

  checkIfPasswordChangeAllowed() {
    this.disabledForDemoMode = false;
    this.disabledForOfflineMode = false;
    this.passwordForm.enable();

    if (AppConfig.settings.database.useTemporaryDatabase) {
      this.disabledForDemoMode = true;
      this.passwordForm.disable();
    } else if (!navigator.onLine) {
      this.disabledForOfflineMode = true;
      this.passwordForm.disable();
    }
  }

  changePassword() {
    const currentPassword = this.passwordForm.get('currentPassword').value;
    const newPassword = this.passwordForm.get('newPassword').get('newPassword').value;
    this.userAccountService
      .changePassword(this.user, currentPassword, newPassword)
      .then(() => this.sessionService.login(this.user.name, newPassword))
      .then(() => this.passwordErrorMessage = "")
      .catch((err) => (this.passwordErrorMessage = err));
  }

  private passwordMathValidator(group: FormGroup): ValidationErrors | null {
    const newPassword: string = group.get("newPassword").value;
    const confirmPassword: string = group.get("confirmPassword").value;
    if (newPassword !== confirmPassword) {
      return { confirm: true };
    }
    return null;
  }
}
