import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { global } from '../../../services/global';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [UserService]
})
export class MainComponent implements OnInit, DoCheck {

  public identity;
  public token;
  public url;
  public search;

 constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

   ngOnInit() {
    console.log(this.identity);
    console.log(this.token);
   }
  
  ngDoCheck() {
       this.identity = this._userService.getIdentity();
  }

  goSearch() {
    this._router.navigate(['/panel/buscar', this.search]);
  }

    logOut() {
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/inicio']);
  }

}
