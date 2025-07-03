import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductDto } from '../../classes/product.model';
import { Category } from '../../classes/category.model';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  constructor(private _productservice: ProductService, private _categoryService: CategoryService, private _router: Router, private _builder: FormBuilder, private _toastr: ToastrService) { }

  productForm: any;
  response: any;
  productDto: ProductDto[] = [];
  categories: Category[] = [];
  product!: ProductDto;
  role: string = '';
  filterText: string = '';
  selectedFile!: File;
  fileName: string = '';
  uploadImage: any;

  ngOnInit() {
    this.role = localStorage.getItem('role') as string;

    this.productForm = this._builder.group({
      productId: this._builder.control(0),
      productName: this._builder.control('', Validators.required),
      description: this._builder.control(''),
      price: this._builder.control(0, Validators.required),
      categoryId: this._builder.control(0),
      categoryName: this._builder.control(''),
      image: this._builder.control(['']),
      imagePath: this._builder.control(''),
      status: this._builder.control(true),
    })

    this._categoryService.GetAllCategories().subscribe({
      next: (item) => {
        this.categories = item.data;
      },
      error: (err) => {
        this._toastr.error('Failed to load categories', err.error?.title || 'Error', { closeButton: true });
      }
    });

    this.FetchAllProducts();
  }

  PrepareNewProductForm() {
    this.productForm.reset({
      productId: 0,
      productName: '',
      description: '',
      price: 0,
      categoryId: 0,
      categoryName: '',
      imagePath: '',
      image: [''],
      status: true,
    });
  }

  FetchAllProducts() {
    debugger
    this._productservice.GetAllProductsWithCategoryNames().subscribe({
      next: (item) => {
        this.response = item;
        if (this.response.status === 1) {
          this.productDto = this.response.data;
          console.log(this.productDto)
          //this._toastr.success('Products fetched successfully', 'Success', { closeButton: true });
        } else {
          this._toastr.warning('No products found', 'Warning', { closeButton: true });
        }
      },
      error: (err) => {
        this._toastr.error('Failed to fetch products', err.error?.title || 'Error', { closeButton: true });
      }
    });
  }

  OnAddProductClick() {
    this.PrepareNewProductForm();
  }

  GetFileName(path: string) {
    return path ? path.split("/").pop() : '';
  }

  ConvertBase64ToImage(base64String: string): string {
    return 'data:image/png;base64,' + base64String;
  }

  OpenModalEdit(existingProduct: ProductDto) {
    //console.log(existingProduct)
    this._productservice.GetProdcutById(existingProduct.productId).subscribe(item => {
      this.response = item;
      this.product = item.data;


      //console.log(this.response.data)

      if (this.response.status === 1) {
        debugger
        this.productForm.patchValue({
          productId: existingProduct.productId,
          productName: existingProduct.productName,
          description: this.product.description,
          price: this.product.price,
          categoryId: this.product.categoryId,
          categoryName: existingProduct.categoryName,
          status: this.product.status,
          image: this.product.imagePath.split('/').pop(),
          imagePath: this.product.imagePath
        })
      }
    })
  }

  // OnFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  //   //console.log(this.selectedFile);
  //   this.fileName = this.selectedFile.name;
  //   //console.log('Filename',this.fileName);
  //   const filePath = 'Images/' + this.fileName;

  //   this.productForm.patchValue({
  //     imagePath: filePath
  //   })
  // }

  OnFileSelected(event: any) {
    //  if(event.target.files[0] != null){
    //   var reader = new FileReader();

    //   reader.onload = (e:any) => {
    //     this.uploadImage = e.target.result;
    //   }
    //   reader.readAsDataURL(event.target.files[0]);
    //  }
    this.selectedFile = event.target.files[0];
    //console.log(this.selectedFile);
    this.fileName = this.selectedFile.name;
    //console.log('Filename',this.fileName);
    const filePath = 'assets/' + this.fileName;

    this.productForm.patchValue({
      imagePath: filePath
    })
  }

  // AddProduct() {
  //   //this.PrepareNewProductForm();
  //   debugger
  //   if (this.productForm.valid) {
  //     this.productForm.value.productId = this.productForm.value.productId == null ? 0 : this.productForm.value.productId;
  //     const productData = this.productForm.getRawValue();
  //     this._productservice.AddProduct(productData).subscribe({
  //       next: (item) => {
  //         this.response = item;

  //         if (this.response.status === 1) {
  //           this._toastr.success('Product added successfully', 'Success', { closeButton: true });
  //           this.productForm.reset();
  //           this.FetchAllProducts();
  //         } else {
  //           this._toastr.warning('Product was not added', 'Warning', { closeButton: true });
  //         }

  //       },
  //       error: (err) => {
  //         this._toastr.error('Failed to add product', err?.error?.title, { closeButton: true });
  //       }
  //     });
  //   }
  // }

  AddProduct() {
    if (this.productForm.valid) {
      const formData = new FormData();

      const product = this.productForm.getRawValue();
      product.productId = product.productId ?? 0;

      // Append each property of the productDto
      Object.entries(product).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      // Append image file
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this._productservice.AddProduct(formData).subscribe({
        next: (item) => {
          this.response = item;
          if (this.response.status === 1) {
            this._toastr.success('Product added successfully', 'Success', { closeButton: true });
            this.productForm.reset();
            this.FetchAllProducts();
          } else {
            this._toastr.warning('Product was not added', 'Warning', { closeButton: true });
          }
        },
        error: (err) => {
          this._toastr.error('Failed to add product', err?.error?.title, { closeButton: true });
        }
      });
    }
  }
  //   AddProduct() {
  //   debugger;
  //   if (this.productForm.valid) {
  //     const formData = new FormData();

  //     const product = this.productForm.getRawValue();
  //     product.productId = product.productId == null ? 0 : product.productId;

  //     // Append product details as JSON string
  //     formData.append('product', JSON.stringify(product));

  //     // Append image file, if selected
  //     if (this.selectedFile) {
  //       formData.append('image', this.selectedFile);
  //     }

  //     this._productservice.AddProduct(formData).subscribe({
  //       next: (item) => {
  //         this.response = item;

  //         if (this.response.status === 1) {
  //           this._toastr.success('Product added successfully', 'Success', { closeButton: true });
  //           this.productForm.reset();
  //           this.FetchAllProducts();
  //         } else {
  //           this._toastr.warning('Product was not added', 'Warning', { closeButton: true });
  //         }
  //       },
  //       error: (err) => {
  //         this._toastr.error('Failed to add product', err?.error?.title, { closeButton: true });
  //       }
  //     });
  //   }
  // }

  EditProduct() {
    debugger
    const formData = new FormData()
    const productUpdate = { ...this.productForm.getRawValue() }

    // Append each property of the productUpdate
    // static method returns an array of object own enumerable with string - keyed property and key-valued pair 
    Object.entries(productUpdate).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    // Append image file
    if (this.selectedFile) {
      formData.append('image', this.selectedFile)
    }

    this._productservice.UpdateProduct(formData).subscribe(item => {
      this.response = item

      if (this.response.status === 1) {
        this._toastr.success('Product updated successfully', 'Success', { closeButton: true })
      } else {
        this._toastr.warning('Product not updated', 'Warning', { closeButton: true });
      }
      this.FetchAllProducts();
      this.PrepareNewProductForm();
    }, error => {
      this._toastr.error('Failed to update product', error.error.title, { closeButton: true })
    })
  }

  DeleteProduct(id: number) {
    if (confirm("Are you sure to delete category?")) {
      this._productservice.DeleteProduct(id).subscribe(data => {
        this.response = data.message
        this.FetchAllProducts();
      })
    }
  }
}