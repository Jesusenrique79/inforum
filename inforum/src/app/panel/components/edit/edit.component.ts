import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Client } from '../../../../models/client';
import { UserService } from '../../../services/user.service';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../add/add.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ UserService, ClientService]
})
export class EditComponent implements OnInit {

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
    this.pageTittle = 'Editar cliente';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.client = new Client('', '', '', '', '', '', '', '', '', this.identity._id, null);
    this.is_edit = true;
  }

  ngOnInit() {
    this.getClient();
  }

  getClient() {
    this._route.params.subscribe(params => {
      let id = params['id'];

        this._clientService.getClient(id).subscribe(
          response => {
            if (!response.client) {
              this._router.navigate(['/panel']);
            } else {
              this.client = response.client;
            }
        },
          error => {
            console.log(error);
          });
    });
  }

  onSubmit(form) {
    const id = this.client._id;
    this._clientService.update(this.token, id, this.client).subscribe(
      response => {
        if (response.client) {
          this.status = 'success';
          this.client = response.client;
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
