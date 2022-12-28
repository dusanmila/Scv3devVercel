import { Guid } from "guid-typescript";

export interface Promo {
    promoId: Guid;
    creatorUsername: string;
    productIdCompany: string;
    productName: string;
    dateStart: string | null;
    dateEnd: string | null;
    rebate: number;
    regularSale: number;
    type: string;
    adsCost: number;
    promoSale: number;
    promoCost: number;
    price: number;
    resultSale: number;
    retailerName: string;
    objectIdCompany: string;
    objectName: string;
    objectIdRetail: string;
    totalCount: number;
}