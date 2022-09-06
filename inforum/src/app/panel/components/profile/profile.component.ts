import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../../models/user';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../../models/client';
import { global } from '../../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, ClientService]
})
export class ProfileComponent implements OnInit {


  public user: User;
  public clients: Client[];
  public url: string;

  constructor(
    private _userService: UserService,
    private _clientService: ClientService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { 

    this.url = global.url;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let userId = params['id'];
      this.getUser(userId);
      this.getClients(userId);
    });
  }

  getUser(userId) {
    this._userService.getUser(userId).subscribe(
      response => {
        if (response.user) {
          this.user = response.user;
        } else {
          
        }
      },
      error => {
         console.log(error);
      }
    );
  }

  getClients(userId) {
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

}
