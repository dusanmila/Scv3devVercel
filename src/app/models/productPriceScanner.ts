import { Guid } from "guid-typescript";

export interface ProductPriceScanner {
    productPriceScannerId: Guid;
    productName: string;
    price: number;
    actionPrice: number;
    manufacturer: number;
    weight: number;
}