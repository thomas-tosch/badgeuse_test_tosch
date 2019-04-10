import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs-customers/edit-users/edit-users.dialog.html',
  styleUrls: ['../../dialogs-customers/edit-users/edit-users.dialog.scss']
})
export class EditDialogUsersComponent {

  constructor(public dialogRef: MatDialogRef<EditDialogUsersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: UserService) { }

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

  stopEdit(): void {
    this.dataService.updateUser(this.data);
  }
}
