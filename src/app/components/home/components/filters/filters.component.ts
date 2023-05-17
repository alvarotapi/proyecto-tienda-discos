import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { data_categories } from '@app/_data/categories';
import { StoreService } from 'src/app/_services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>();
  categories: string[] | undefined;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.categories = data_categories;
  }

  onShowCategory(category: string): void {
    this.showCategory.next(category);
  }

}
