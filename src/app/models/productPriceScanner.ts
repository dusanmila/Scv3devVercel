import { Guid } from "guid-typescript";

export interface ProductPriceScanner {
    productPriceScannerId: Guid;
    objectIdCompany: string;
    productName: string;
    price: number;
    actionPrice: number;
    manufacturer: number;
    weight: number;
}