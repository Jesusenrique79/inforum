import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  providers: [UserService]
})
export class RegisterUserComponent implements OnInit {

  public page_tittle: string;
  public user: User;
  public status: string;

   constructor(
    private _userService: UserService
  ) { 
    this.page_tittle = 'Registrar Usuario';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
  }

   ngOnInit() {
    console.log(this._userService.prueba());
  }

  onSubmit(form) {
    this._userService.register(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          this.status = 'success';
          form.reset();
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }

}
