import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Client } from '../../../../models/client';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css'],
  providers: [ClientService]
})
export class CustomerDetailComponent implements OnInit {

   public client: Client;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _clientService: ClientService
  ) {
    
   } 

  ngOnInit() {
    this.getClient();
  }

  getClient() {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._clientService.getClient(id).subscribe(
        response => {
          if (response.client) {
            this.client = response.client;
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

}
