export interface Promo {
    creatorUsername: string;
    productIdCompany: string;
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