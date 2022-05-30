import { Guid } from "guid-typescript";

export interface Position {
    secondaryPositionId: Guid,
    objectName: string,
    posClassName: string,
    posTypeName: string,
    valid: boolean;
}