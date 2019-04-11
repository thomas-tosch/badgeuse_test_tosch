import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs-customers/add-users/add-users.dialog.html',
  styleUrls: ['../../dialogs-customers/add-users/add-users.dialog.scss']
})

export class AddDialogUsersComponent {
  constructor(public dialogRef: MatDialogRef<AddDialogUsersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: UserService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(callback, id_user): void {
    this.dataService.addUserinList(callback, id_user);
  }
}
