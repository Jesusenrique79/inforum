import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public page_tittle: string;
  public user: User;
  public identity;
  public token;
  public status;
  public afuConfig;
  public url;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_tittle = 'Ajustes de usuario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = global.url;
    
    /*
    this.afuConfig = {
      multiple: false,//un solo archivo
      formatsAllowed: '.jpg, .jpeg, .png, .gif',//formatos permitidos
      maxSize: '50',//maximo de 50 megas
      uploadAPI: {
        url: this.url + 'upload-avatar',
        headers: {
          Authorization: this.token,
        },
        params: {
          page: '1',
        },
        responseType: 'json',
      },
      theme: 'attachPin',
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      attachPinText: 'Subir archivo',
      replaceTexts: {
        selectFileBtn: 'Seleccione un archivo',
        resetBtn: 'Reiniciar',
        uploadBtn: 'Subir',
        dragNDropBox: 'Arrastre y suelte',
        attachPinBtn: 'Sube tu avatar',
        afterUploadMsg_success: 'Subida exitosa !',
        afterUploadMsg_error: 'Subida erronea !',
        sizeLimit: 'peso exeido',
      },
    };

    }
    avatarUpload(data) {
    const dataObj = data.body;
    this.user.image = dataObj.user.image;
    console.log(this.user);
    */
    }

    ngOnInit() {
    }

  onSubmit() {
    this._userService.update(this.user).subscribe(
      response => {
        if (!response.user) {
          this.status = 'error';
        } else {
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
        }
      },
      error => {
        this.status = 'error';
      }
    );
    }

  }

