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
    promoSale: number;
    expenses: number;
    price: number;
    resultSale: number;
    ropi: number;
    ropiCash: number;
    retailerName: string;
    predefined: boolean;
    totalCount: number;
}