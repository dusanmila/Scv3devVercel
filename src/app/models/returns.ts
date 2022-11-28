import { Guid } from "guid-typescript";

export interface Return {
    returnId:Guid;
    productName: string;
    productIdCompany:string;
    objectName:string;
    objectAddress:string
    objectCity:string;
    objectIdCompany:string;
    objectIdRetail:string;
    retailerName:string;
    quantity: number;
    expiryDate: string | null;
    discount: number;
    comment: number;
    totalCount: number;
}

