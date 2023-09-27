import { Guid } from "guid-typescript";

export interface Condition {
    conditionId: Guid;
    retailerId: Guid;
    retailerName: string;
    productCategoryId: Guid;
    productCategoryName: string;
    on: number;
    off: number;
    fix: number;
    totalCount: number;
}

