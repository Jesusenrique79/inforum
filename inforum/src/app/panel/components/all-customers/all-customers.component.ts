import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Client } from '../../../../models/client';
import { UserService } from '../../../services/user.service';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css'],
  providers: [ClientService, UserService]
})
export class AllCustomersComponent implements OnInit {

  public page_tittle: string;
  public clients: Client[];
  public identity;
  public token;
  public status;
  public totalPages;
  public page;
  public next_page;
  public prev_page;
  public number_pages;

   constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _clientService: ClientService
  ) {
     this.page_tittle = 'Todos los Clientes';
     this.identity = this._userService.getIdentity();
     this.token = this._userService.getToken();
    
   }

  ngOnInit() {
  
     this._route.params.subscribe(params => {
      let page = params['page'];
          if (!page || page == null || page == false  || page == undefined) {
          page = 1;
          this.prev_page = 1;
          this.next_page = 2;
          }
       this.getClients(page);
    });

  }

  getClients(page = 1) {
    this._clientService.getClients(page).subscribe(
      response => {
        if (response.clients) {
          this.clients = response.clients;

          //Navegación de paginación
          this.totalPages = response.totalPages;

          let number_pages = [];
          for (let i = 1; i <= this.totalPages; i++){
            number_pages.push(i);
          }
          this.number_pages = number_pages;
          if (page >= 2){
            this.prev_page = page - 1;
          } else {
            this.prev_page = 1;
          }

          if (page < this.totalPages) {
            this.next_page = page + 1; 
          } else {
            this.next_page = this.totalPages;
          }
        } else {
          this._router.navigate(['/inicio']);
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
