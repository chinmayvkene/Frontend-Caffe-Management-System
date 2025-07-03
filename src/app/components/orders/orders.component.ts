import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Order } from '../../classes/order.model';
import { APIResponse } from '../../classes/APIResponse';
import { Category } from '../../classes/category.model';
import { CategoryService } from '../../services/category.service';
import { ProductDto } from '../../classes/product.model';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  constructor(private _orderService: OrderService,
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private _userService: UserService,
    private _builder: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService) { }

  orderForm: any;
  response: any;
  orders: Order[] = [];
  categories: Category[] = [];
  products: ProductDto[] = [];
  username: string = '';
  date!: Date;
  productQuantity: number = 0;
  unitPrice: number = 0;
  existingOrder!: Order;
  filterText:string = '';

  ngOnInit() {
    this.FetchAllOrders();

    if (typeof window !== 'undefined' && localStorage) {
      this.username = localStorage.getItem('username') as string;
    }

    //console.log(this.username)

    this.orderForm = this._builder.group({
      id: this._builder.control(0),
      customerName: this._builder.control('', Validators.required),
      email: this._builder.control('', Validators.required),
      categoryId: this._builder.control(0),
      productId: this._builder.control(0),
      productUnitPrice: this._builder.control(0),
      quantity: this._builder.control(0),
      totalAmount: this._builder.control(0),
      orderDate: this._builder.control(''),
      username: this._builder.control({ value: this.username, disabled: true })
    })
  }

  OpenModalEdit(order: Order) {
    this.PrepareNewOrderForm();
    this._orderService.GetOrderById(order.id).subscribe(item => {
      if (item.status === 1) {
        this.existingOrder = item.data;

        this.categories = [];
        this.GetAllCategory(); // Ensure categories are loaded
        this.products = [];
        // Get products for the existing category
        this._productService.GetProductsBasedOnCategoryId(this.existingOrder.categoryId).subscribe(productRes => {
          this.products = productRes.data;
        });

        this._productService.GetUnitPriceBasedOnProductId(this.existingOrder.productId).subscribe(item => {
          this.unitPrice = Number(item.data)
          this.orderForm.patchValue({
            productUnitPrice: item.data,
          })
        })

        this.orderForm.patchValue({
          id: this.existingOrder.id,
          customerName: this.existingOrder.customerName,
          email: this.existingOrder.email,
          categoryId: this.existingOrder.categoryId,
          productId: this.existingOrder.productId,  // Now this will be in the dropdown
          productUnitPrice: this.existingOrder.productUnitPrice,
          quantity: this.existingOrder.quantity,
          totalAmount: this.existingOrder.totalAmount,
          orderDate: this.existingOrder.orderDate,
          username: this.existingOrder.username
        });
      }
    });
  }

  PrepareNewOrderForm() {
    this.orderForm.reset({
      id: 0,
      customerName: '',
      email: '',
      categoryId: 0,
      productId: 0,
      productUnitPrice: 0,
      quantity: 0,
      totalAmount: 0,
      orderDate: '',
      username: this.username
    })
  }

  AddOrder() {
    debugger
    if (this.orderForm.valid) {
      this.orderForm.value.id = this.orderForm.value.id == null ? 0 : this.orderForm.value.id;
      let orderdata = { ...this.orderForm.getRawValue() }
      this._orderService.AddOrder(orderdata).subscribe({
        next: (item) => {
          if (item.status === 1) {
            this._toastr.success('Order generated successfully', 'Success', { closeButton: true })
            this.FetchAllOrders();
          } else {
            this._toastr.warning('Order not generated successfully', 'Warning', { closeButton: true })
          }
        }, error: (err) => {
          this._toastr.error('Failed to generate order', err.err.title, { closeButton: true })
        }
      })
    }
  }

  UpdateOrder() {
      if (this.orderForm.valid) {
        const orderData = { ...this.orderForm.getRawValue() }
        this._orderService.UpdateOrder(orderData).subscribe({
          next: (item) => {
            if (item.status === 1) {
              this._toastr.success('Order updated successfully', 'Success', { closeButton: true })
              this.FetchAllOrders();
            }
            else {
              this._toastr.warning('Order not updated', 'Warning', { closeButton: true })
            }
          }, error: (err) => {
            this._toastr.error('Failed to update order', err.err.title, { closeButton: true })
          }
        })
      }
  }

  GetProductsBasedOnCategoryId(categoryId: any) {
    this._productService.GetProductsBasedOnCategoryId(categoryId.target.value).subscribe(item => {
      this.products = item.data
    })
  }

  GetProductUnitPriceBasedOnCategoryId(productId: any) {
    this._productService.GetUnitPriceBasedOnProductId(productId.target.value).subscribe(item => {
      this.unitPrice = Number(item.data)
      this.orderForm.patchValue({
        productUnitPrice: item.data,
        quantity: 0,
        totalAmount:0
      })
    })
  }

  CalculateTotalPrice() {
    let totalPrice = this.productQuantity * this.unitPrice;
    this.orderForm.patchValue({
      totalAmount: totalPrice
    })
  }

  DeleteOrder(id: number) {
    if (confirm("Are you sure to delete order?")) {
      this._orderService.DeleteOrder(id).subscribe(data => {
        this.response = data.message
        this.FetchAllOrders();
      })
    }
  }

  OnAddOrderClick() {
    this.PrepareNewOrderForm();
    this.orderForm.patchValue({
      orderDate: formatDate(new Date(), 'yyyy-MM-dd', 'en_US')
    })

    this.GetAllCategory();
  }

  GetAllCategory() {
    this._categoryService.GetAllCategories().subscribe(item => {
      this.response = item

      if (this.response.status === 1) {
        this.categories = this.response.data
      }
    })
  }

  FetchAllOrders() {
    this._orderService.GetAllOrders().subscribe({
      next: (item: APIResponse<Order[]>) => {
        if (item.status === 1) {
          this.orders = item.data
        }

        this.orders.forEach(o => {
          if (typeof o.orderDate === 'string') {
            o.orderDate = new Date(o.orderDate);
          }
        })
      }, error: (err) => {
        console.error("Failed to fetch orders:", err);
      }
    })
  }
}
