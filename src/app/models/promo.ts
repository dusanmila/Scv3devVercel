import { Guid } from "guid-typescript";

export interface Promo {
    promoId: Guid;
    creatorUsername: string;
    productIdCompany: string;
    productName: string;
    dateStart: string | null;
    dateEnd: string | null;
    rebate: number;
    isRebateCascade: boolean;
    regularSale: number;
    type: string;
    estimatePromoSale: number;
    estimatePromoSaleCash: number;
    expenses: number;
    price: number;
    resultSale: number;
    ropi: number;
    estimateRopi: number,
    ropiCash: number,
    estimateRopiCash: number,
    retailerName: string;
    currentEvaluator: string;
    predefined: boolean;
    declined: boolean;
    comment: string;
    gp: number;
    estimateGP:number;
    confirmed: boolean;
    totalCount: number;
}