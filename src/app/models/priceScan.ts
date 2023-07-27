import { Guid } from "guid-typescript";

export interface PriceScan {
    productPriceScannerId:Guid;
    productName:string;
    price:number;
    actionPrice:number;
    manufacturer:string;
    weight:number;
    
}

