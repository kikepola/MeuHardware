import { Component, Input, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.css']
})
export class ProductsCardComponent implements OnInit {

  @Input() img_path: string | undefined;
  @Input() link: string | undefined;
  @Input() name: string | undefined;
  @Input() price: number | undefined;
  @Input() store_name: string | undefined;

  resizedText: string | undefined;
  scrWidth:any;

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.scrWidth = window.innerWidth;
    this.resizeNameText();
  }

  resizeNameText(){
    let textNum: number = this.scrWidth/10
    console.log(textNum);
    if(this.name && this.name.length > textNum){
      this.resizedText = this.name.slice(0,textNum) + " ...";
    }else{
      this.resizedText = this.name
    }
  }

  constructor() {
    this.getScreenSize();
  }

  ngOnInit() {
    this.resizeNameText();
  }
}
