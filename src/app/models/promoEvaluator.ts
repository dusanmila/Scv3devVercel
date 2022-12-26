import { Guid } from "guid-typescript";

export interface PromoEvaluator{
    EvaluatorId:Guid;
    Username:string;
    Rabate:number;
}