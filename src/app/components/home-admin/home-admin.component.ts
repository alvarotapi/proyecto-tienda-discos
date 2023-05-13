import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';
import { FormControl, FormGroup } from '@angular/forms';
import { data_products } from '@app/_data/products';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
})
export class HomeAdminComponent implements OnInit {
    loading = false;
    users?: User[];

    form: FormGroup;

    constructor(
      private userService: UserService,
      private _snackBar: MatSnackBar,
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
          id: new FormControl(data_products.length + 1),
          title: new FormControl(null),
          price: new FormControl(null),
          category: new FormControl(null),
          description: new FormControl(null),
          image: new FormControl(null),
        });
        this.form.get('id').disable();
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }

    onSubmit(){
      data_products.push(this.form.value);
      this._snackBar.open('New item added to store.', 'Ok', { duration: 3000 });
    }
}
