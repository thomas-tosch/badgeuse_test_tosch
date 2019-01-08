import { Component, OnInit } from '@angular/core';
import {faAddressCard, faChessQueen, faUserAstronaut} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  faChessQueen = faChessQueen;
  faUserAstronaut = faUserAstronaut;
  faAddressCard = faAddressCard

  constructor() { }

  ngOnInit() {
  }


}
