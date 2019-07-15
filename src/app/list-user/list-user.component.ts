import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../user-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})

export class ListUserComponent implements OnInit {
  animal: string;
  name: string;

  constructor(private userService: UserService, public dialog: MatDialog) { }
 
  displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name', 'avatar', 'update', 'delete'];
  dataSource = [];
  getUsers(): void {
     this.userService.getUsers()
      .subscribe(users => this.dataSource = users.data);
  }
  ngOnInit() {
    this.getUsers();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

@Component({
  selector: 'create-user-dialog',
  templateUrl: 'create-user-dialog.html',
})
export class CreateUserDialog {
  
  profileForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required]
  });
  constructor(  
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<CreateUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.warn(this.profileForm.value);
    this.userService.createUser(this.profileForm.value)
    .subscribe(
      // user => datasource.push(user)
    );
  }

}

