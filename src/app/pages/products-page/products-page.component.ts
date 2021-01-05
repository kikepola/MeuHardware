import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  products: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.http.get('https://meuhardware-backend.herokuapp.com' + this.router.url)
    .subscribe(response => {
      this.products = response;
      console.log(this.products);
    }, error => {
      console.log(error);
    });
  }

}
