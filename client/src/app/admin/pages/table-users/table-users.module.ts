import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from "@angular/common";


import { TableUsersComponent } from './table-users.component';
import { HttpClientModule } from '@angular/common/http';
import {
  MatFormFieldModule, MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule,
  MatTableModule, MatToolbarModule,
} from '@angular/material';
import { UserService } from '../../../services/user.service';
import { AddDialogUsersComponent } from '../../items/dialogs-users/add-users/add-users.dialog.component';
import { EditDialogUsersComponent } from '../../items/dialogs-users/edit-users/edit-users.dialog.component';
import { DeleteDialogUsersComponent } from '../../items/dialogs-users/delete-users/delete-users.dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TableUsersComponent,
    AddDialogUsersComponent,
    EditDialogUsersComponent,
    DeleteDialogUsersComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddDialogUsersComponent,
    EditDialogUsersComponent,
    DeleteDialogUsersComponent
  ],
  providers: [
    UserService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [TableUsersComponent]
})
export class TableUsersModule { }
