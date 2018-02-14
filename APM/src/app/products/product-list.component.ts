import { Component } from '@angular/core';
import { IProduct } from './product'
import { ProductService } from './product.service';
import { error } from 'selenium-webdriver';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']

})

export class ProductListComponent{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    _listFilter: string;
    filteredProducts: IProduct[];
    errorMessage: string;

    get listFilter() : string {
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    products: IProduct[] = [];

    constructor(private _productService : ProductService){

    }
    toggleImage(): void{
        this.showImage = !this.showImage;
    }
    performFilter(filterBy: string): IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product : IProduct)=>
                product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    onRatingClicked(message: string): void{
         this.pageTitle = 'Product List: '+message;
    }

    ngOnInit(){
        this._productService.getproducts()
            .subscribe(
                products => {
                    this.products = products;
                    this.filteredProducts = this.products;
                },
            
                error => this.errorMessage = <any>error
            );
        
    }
}