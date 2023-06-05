import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  productos: Product[] = [];
  currentFilter = '';
  selectedProduct?: Product;

  constructor(private readonly productSvc: ProductService) {}

  setFilter(filter: string): void {
    this.currentFilter = filter;
  }

  selectProduct(product: Product) {
    console.log(product);
    this.selectedProduct = product;
    console.log(this.selectedProduct);
  }

  ngOnInit(): void {
    this.productSvc.getProducts().subscribe((productos) => {
      this.productos = productos.data;
      console.log(productos);
    });
  }
}
