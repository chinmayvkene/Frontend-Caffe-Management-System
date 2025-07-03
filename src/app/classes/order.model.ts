export class Order {
    id: number = 0;
    customerName: string = '';
    email: string = '';
    categoryId: number = 0;
    categoryName: string = '';
    productId: number = 0;
    productName: string = '';
    productUnitPrice: number = 0;
    quantity: number = 0;
    totalAmount: number = 0;
    orderDate!: Date;
    username: string = '';
}