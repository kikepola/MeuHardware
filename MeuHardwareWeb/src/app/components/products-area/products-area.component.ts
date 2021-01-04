import { Component} from '@angular/core';

@Component({
  selector: 'app-products-area',
  templateUrl: './products-area.component.html',
  styleUrls: ['./products-area.component.css']
})
export class ProductsAreaComponent{

  products: any = [
    {
      productId: 1,
      productName: "Processador",
      imgPath: "../../../assets/cpu.png",
      route: "/processor"
    },
    {
      productId: 2,
      productName: "Placa de Vídeo",
      imgPath: "../../../assets/gpu.png",
      route: "/graphiccard"
    },
    {
      productId: 3,
      productName: "Placa Mãe",
      imgPath: "../../../assets/mother_board.png",
      route: "/motherboard"
    },
    {
      productId: 4,
      productName: "Memórias Ram",
      imgPath: "../../../assets/memory.png",
      route: "/memory"
    }
  ];

  constructor() { }

}
