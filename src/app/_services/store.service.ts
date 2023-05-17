import { Injectable } from '@angular/core';
import { data_products } from '@app/_data/products';
import { data_categories } from '@app/_data/categories';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}

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

  getAllCategories(): string[] {
    return data_categories
  }
}
