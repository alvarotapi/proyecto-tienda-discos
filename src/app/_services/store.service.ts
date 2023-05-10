// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Product } from '../_models/product.model';
import { data_products } from '@app/_data/products';
import { data_categories } from '@app/_data/categories';

// const STORE_BASE_URL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(
    // private httpClient: HttpClient
  ) {}

  // getAllProducts(
  //   limit = '12',
  //   sort = 'desc',
  //   category?: string
  // ): Observable<Array<Product>> {
  //   return this.httpClient.get<Array<Product>>(
  //     `${STORE_BASE_URL}/products${
  //       category ? '/category/' + category : ''
  //     }?sort=${sort}&limit=${limit}`
  //   );
  // }

  getAllProducts(category?: string){
    if ( category === 'All'){
      return data_products;
    }
    else if(category){
      let filtradosCategoria = data_products.filter(producto => producto.category == category)
      return filtradosCategoria;
    } else {
      return data_products;
    }
  }

  // getAllCategories(): Observable<Array<string>> {
  //   return this.httpClient.get<Array<string>>(
  //     `${STORE_BASE_URL}/products/categories`
  //   );
  // }

  getAllCategories(): string[] {
    return data_categories
  }
}
