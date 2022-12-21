export interface Promo {
    promoId: string;
    creatorUsername: string;
    productId: string;
    dateStart: Date;
    dateEnd: Date;
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
}