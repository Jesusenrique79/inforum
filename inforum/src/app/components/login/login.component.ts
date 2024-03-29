import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../models/user'; 
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_tittle: string;
  public user: User;
  public status: string;
  public identity;
  public token;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_tittle = 'Identificate';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
   }

  ngOnInit() {
  }

  onSubmit(form) {
     //Conseguir objeto completo de uduario logueado
     this._userService.signup(this.user).subscribe(
       response => {
        if (response.user && response.user._id) { 
           //Guardamos el usuario en una propiedad
             this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
                 //Conseguir el token de usuario logueado
                
                 this._userService.signup(this.user, true).subscribe(
                   response => {
                     if (response.token) { 
                       //Guardar el token del usuario en una propiedad
                       console.log(response);
                       this.token = response.token;
                       localStorage.setItem('token', this.token);
                       this.status = 'success';
                       this._router.navigate(['/inicio']);
                      
                    } else {
                      this.status = 'error';
                    }
                   },
                   error => {
                     this.status = 'error';
                   });
      


          form.reset();
        } else {
          this.status = 'error';
        }
       },
       error => {
         this.status = 'error';
       });
  }

}
