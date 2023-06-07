import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';

export interface ProductResponse {
  data: Product[];
}
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = environment.api;
  //Lista carrito
  private myList: Product[] = [];

  //Carrito Observable
  private myCart = new BehaviorSubject<Product[]>([]);
  mycart$ = this.myCart.asObservable();

  constructor(private http: HttpClient) {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.myList = JSON.parse(storedCart);
      this.myCart.next(this.myList);
    }
  }

  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.url}/producto`);
  }

  addProduct(product: Product) {
    if (this.myList.length === 0) {
      product.stock = 1;
      this.myList.push(product);
      this.myCart.next(this.myList);
    } else {
      const productMod = this.myList.find((el) => {
        return el.sku === product.sku;
      });
      if (productMod) {
        productMod.stock = productMod.stock + 1;
        this.myCart.next(this.myList);
      } else {
        product.stock = 1;
        this.myList.push(product);
        this.myCart.next(this.myList);
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.myList));
  }

  updateProductInCart(product: Product) {
    const index = this.myList.findIndex(
      (p) => p.id_producto === product.id_producto
    );
    if (index !== -1) {
      this.myList[index] = product;
      this.myCart.next(this.myList);
      localStorage.setItem('cart', JSON.stringify(this.myList));
    }
  }

  deleteProduct(id: number) {
    this.myList = this.myList.filter((p) => {
      return p.id_producto != id;
    });
    this.myCart.next(this.myList);
    localStorage.setItem('cart', JSON.stringify(this.myList));
  }

  findProductById(id: number) {
    return this.myList.find((el) => {
      return el.id_producto === id;
    });
  }

  totalCart() {
    const total = this.myList.reduce((acc, prod) => {
      return acc + prod.stock * prod.precio;
    }, 0);
    return total;
  }

  clearCart() {
    this.myList = [];
    this.myCart.next(this.myList);
    localStorage.removeItem('cart');
  }
}
