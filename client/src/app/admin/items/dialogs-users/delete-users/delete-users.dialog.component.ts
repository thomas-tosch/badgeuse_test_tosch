import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { UserService } from '../../../../services/user.service';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs-customers/delete-users/delete-users.dialog.html',
  styleUrls: ['../../dialogs-customers/delete-users/delete-users.dialog.scss']
})
export class DeleteDialogUsersComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogUsersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: UserService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteUser(this.data.id_user);
  }
}
