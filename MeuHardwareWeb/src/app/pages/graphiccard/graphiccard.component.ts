import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-graphiccard',
  templateUrl: './graphiccard.component.html',
  styleUrls: ['./graphiccard.component.css']
})
export class GraphiccardComponent implements OnInit {

  products: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.http.get('http://52.87.191.191:8080/processor')
    .subscribe(response => {
      this.products = response;
      console.log(this.products);
    }, error => {
      console.log(error);
    });
  }

}
