export class ProductDto {
    productId: number = 0;
    productName: string = '';
    description: string = '';
    price: number = 0;
    categoryId: number = 0;
    categoryName: string = '';
    status!: boolean;
    imagePath:string = '';
    image!:string;
}