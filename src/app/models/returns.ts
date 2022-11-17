import { Guid } from "guid-typescript";
import { Obj } from "./object";
import { Product } from "./product";

export interface Return {
    ReturnId:Guid;
    Object:Obj;
    Product: Product;
    Quantity: number;
    ExpiryDate: Date;
    Discount: number;
    Comment: number;
    totalCount: number;
}