export class APIResponse<T>{
    status:number = 0;
    data!: T ;
    message:string = '';
}