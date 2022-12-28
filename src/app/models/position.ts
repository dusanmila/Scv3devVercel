import { Guid } from "guid-typescript";

export interface Position {
    secondaryPositionId: Guid;
    objectIdCompany: string;
    posClassName: string;
    posTypeName: string;
  //  productCategory: string;
    supplier: string;
    location: string;
    comment:string;
    img:string;
    img2:string;
    img3:string;
    isImgHorizontal:boolean;
    isImg2Horizontal:boolean;
    isImg3Horizontal:boolean;
    valid: boolean;
}
