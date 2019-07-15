import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user-service.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
   user: any;

   profileForm = this.fb.group({
    
    id: ['', Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required]
  });
 
  constructor( 
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getUser();
   
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(id)
      .subscribe(res =>  {
        this.user = res.data;
        this.profileForm.patchValue({
          id: res.data.id,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          email: res.data.email        
        })
      }); 

  }

  onSubmit() {
    console.warn(this.profileForm.value);
    this.userService.updateUser(this.profileForm.value)
    .subscribe();
  }

}
