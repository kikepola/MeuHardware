import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent{

  @Input() productName: string | undefined;
  @Input() imgPath: string | undefined;
  @Input() route: string | undefined;

  constructor() { }

}
