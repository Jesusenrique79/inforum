import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Client } from '../../../../models/client';
import { UserService } from '../../../services/user.service';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ UserService, ClientService]
})
export class ListComponent implements OnInit {

  public page_tittle: string;
  public clients: Array<Client>;
  public identity;
  public token;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _clientService: ClientService
  ) {
    this.page_tittle = 'Listado de clientes';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    let userId = this.identity._id;
    this._clientService.geClientsByUser(userId).subscribe(
      response => {
        if (response.clients) {
          this.clients = response.clients;
        }
      }, 
      error => {
        console.log(error);
      }
    );
  }

  deleteClient(id){
    this._clientService.delete(this.token, id).subscribe(
       response => {
        this.getClients(); 
      }, 
      error => {
        console.log(error);
      }
    );
  }

}
