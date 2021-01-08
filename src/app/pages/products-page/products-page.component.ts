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
  result: any;
  isLoading: boolean = false;
  filters: any = [
    {
      option: 0,
      text: "Preço decrescente"
    },
    {
      option: 1,
      text: "Preço crescente"
    }
  ]

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.isLoading = true;
    this.http.get('https://meuhardware-backend.herokuapp.com' + this.router.url)
    .subscribe(response => {
      this.result = response;
      this.products =this.result;

      this.isLoading = false;
    }, error => {
      console.log(error);
    });
  }


  orderBy(option: any){
    this.products = this.products.sort((product1:any, product2:any) => {
        var referenceNumber: number = 0;

        if(product1.price > product2.price){
          referenceNumber = 1;
        }else if(product1.price < product2.price){
          referenceNumber =  -1;
        }

        if(option.target.value == 0){
          referenceNumber = referenceNumber * -1
        }

        return referenceNumber;
      }
    )
  }

  filterBy(textfild: any){
    var searchText: String = textfild.target.value;

    if(searchText.length > 0){
      this.products = this.result.filter(
        (product:any) => {
          return product.name.toUpperCase().includes(searchText.toUpperCase())
        }
      );
    }else{
      this.products = this.result;
    }
  }

}
