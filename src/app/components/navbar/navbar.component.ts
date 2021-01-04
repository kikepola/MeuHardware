import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isMenuHide: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  abrirDropDownMenu(){
    this.isMenuHide = !this.isMenuHide;
  }

}
