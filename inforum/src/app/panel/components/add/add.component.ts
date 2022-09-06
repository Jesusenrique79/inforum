import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Client } from '../../../../models/client';
import { UserService } from '../../../services/user.service';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [ UserService, ClientService]
})
export class AddComponent implements OnInit {
  public pageTittle: string;
  public client: Client;
  public identity;
  public token;
  public status;
  public is_edit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _clientService: ClientService
  ) {
    this.pageTittle = 'Crear un nuevo cliente';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.client = new Client('', '', '', '', '', '', '', '', '', this.identity._id, null);
    this.is_edit = false;
  }

  ngOnInit() {
    console.log(this._clientService.prueba());
  }

   onSubmit(form) {
    this._clientService.addClient(this.token, this.client).subscribe(
      response => {
        if (response.client) {
          this.status = 'success';
          this.client = response.client;
          this._router.navigate(['/panel']);
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

}
