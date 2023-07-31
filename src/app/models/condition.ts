import { Guid } from "guid-typescript";

export interface Condition {
    conditionId:Guid;
    retailerId: Guid;
    productCategoryId:Guid;
    on:number;
    off:number;
    fix:number;
    
}

