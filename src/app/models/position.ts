import { Guid } from "guid-typescript";

export interface Position {
    secondaryPositionId: Guid,
    objectIdCompany: string,
    posClassName: string,
    posTypeName: string,
    valid: boolean;
}