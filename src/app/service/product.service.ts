import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.url}/producto`);
  }
}
