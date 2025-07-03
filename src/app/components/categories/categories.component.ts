import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../classes/category.model';
import { APIResponse } from '../../classes/APIResponse';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  constructor(private _categoryService: CategoryService, private _builder: FormBuilder, private _toastr: ToastrService) { }

  response: any;
  categories: Category[] = [];
  categoryForm: any;
  categoryEdit!: Category;
  role:string = '';
  filterText:string = '';

  ngOnInit() {
    this.role = localStorage.getItem('role') as string;
    this.FetchAllCategories()

    this.categoryForm = this._builder.group({
      categoryId: this._builder.control(0),
      categoryName: this._builder.control('', Validators.required)
    })
  }


  FetchAllCategories() {
    this._categoryService.GetAllCategories().subscribe({
      next: (data: APIResponse<Category[]>) => {
        if (data.status === 1) {
          this.categories = data.data;
          console.log(this.categories)
        }
      },
      error: (err) => {
        console.error("Failed to fetch categories:", err);
      }
    });
  }

  DeleteCategory(id: number) {
    if (confirm("Are you sure to delete category?")) {
      this._categoryService.DeleteCategory(id).subscribe(data => {
        this.response = data.message
        this.FetchAllCategories();
      })
    }
  }

  PrepareCategoryForm(){
    this.categoryForm.reset({
      categoryId: 0,
      categoryName:''
    })
  }

  OpenModal() {
    const myDiv = document.getElementById('myModal');
    if (myDiv != null) {
      myDiv.style.display = 'block';
    }
    this.PrepareCategoryForm();
  }

  OpenModalEdit(category: any) {
    this.categoryForm = this._builder.group({
      categoryId: this._builder.control(category.categoryId),
      categoryName: this._builder.control(category.categoryName, Validators.required)
    });
    this.categoryEdit = category.value;
    const editElement = document.getElementById('myModalEdit');
    if (editElement != null) {
      editElement.style.display = 'block';
    }
  }

  CloseModal() {
    const myDiv = document.getElementById('myModal');
    if (myDiv != null) {
      myDiv.style.display = 'none';
    }
  }

  CloseModalEdit() {
    const editElement = document.getElementById('myModalEdit');
    if (editElement != null) {
      editElement.style.display = 'none';
    }
  }

  AddCategory() {
    if (this.categoryForm.valid) {
     this.categoryForm.value.categoryId = this.categoryForm.value.categoryId == null ? 0: this.categoryForm.value.categoryId;
      const categoryadd = this.categoryForm.value;
      console.log('categoryadd' + categoryadd);
      this._categoryService.AddCategory(categoryadd).subscribe({
        next: (item) => {
          this.response = item;
          console.log('response is' + this.response);
          if (this.response.status === 1) {
            this._toastr.success('Category added successfully', 'Success', { closeButton: true });
            this.categoryForm.reset();
            this.FetchAllCategories();
          }
        },
        error: (error) => {
          this._toastr.error('Failed to add category', 'Error', { closeButton: true });
          console.error('AddCategory error:', error);
        }
      });
    }
  }


  EditCategory() {
    if (this.categoryForm.valid) {
      const updateCategory = this.categoryForm.value
      console.log(updateCategory);
      this._categoryService.UpdateCategory(updateCategory).subscribe({
        next: (item) => {
          this.response = item;
          console.log('response is' + this.response);
          if (this.response.status === 1) {
            this._toastr.success('Category updated successfully', 'Success', { closeButton: true });
            this.categoryForm.reset();
            this.FetchAllCategories();
          }
        },
        error: (error) => {
          this._toastr.error('Failed to update category', 'Error', { closeButton: true });
          //console.error('AddCategory error:', error);
        }
      });
    }
  }
}