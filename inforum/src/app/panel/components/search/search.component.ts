import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Client } from '../../../../models/client';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-search',
  templateUrl: '../customers/customers.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ClientService]
})
export class SearchComponent implements OnInit {

  public page_tittle: string;
  public clients: Client[];
  public no_paginate;
 
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _clientService: ClientService
  ) {
    this.page_tittle = 'Buscar:';
    this.no_paginate = true;
    
   }

  ngOnInit() {
    
     this._route.params.subscribe(params => {
      let search = params['search'];
       this.page_tittle = this.page_tittle + ' ' + search;
       this.getClients(search);
    });
  }

  getClients(search) {
    this._clientService.search(search).subscribe(
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
