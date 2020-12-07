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
      imgPath: "../../../assets/cpu.png"
    },
    {
      productId: 2,
      productName: "Placa de Vídeo",
      imgPath: "../../../assets/gpu.png"
    },
    {
      productId: 3,
      productName: "Placa Mãe",
      imgPath: "../../../assets/mother_board.png"
    },
    {
      productId: 4,
      productName: "Memórias Ram",
      imgPath: "../../../assets/memory.png"
    }
  ];

  constructor() { }

}
