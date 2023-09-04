import { Guid } from "guid-typescript";

export interface Promo {
    promoId: Guid;
    creatorUsername: string;
    productIdCompany: string;
    productName: string;
    declined:boolean;
    comment: string;
    dateStart: string | null;
    dateEnd: string | null;
    rebate: number;
    regularSale: number;
    type: string;
    estimatePromoSale: number;
    estimatePromoSaleCash: number;
    expenses: number;
    price: number;
    resultSale: number;
    ropi: number;
    estimateRopi:number,
    ropiCash:number,
    estimateRopiCash:number,
    retailerName: string;
    predefined: boolean;
    totalCount: number;
}