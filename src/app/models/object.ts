import { ObjectInfo } from "./objectInfo";
import { Retailer } from "./retailer";
import { User } from "./user.model";

export interface Obj {
    objectIdRetail: string;
    objectIdCompany: string;
    retailer: Retailer;
    objectFormat: string;
    objectName: string;
    city: string;
    address: string;
    kam: User;
    director: User;
    supervisor: User;
    commercialist: User;
    merchandiser: User;
    requisitionDays: string;
    merchandiserRevisionDays: string;
    objectInfo: ObjectInfo;
    totalCount: number;
  }

  export interface ObjectCreateDto {
    objectIdRetail: string;
    objectIdCompany: string;
    retailer: string;
    objectFormat: string;
    objectName: string;
    city: string;
    address: string;
    kam: string;
    director: string;
    supervisor: string;
    commercialist: string;
    merchandiser: string;
    requisitionDays: string;
    merchandiserRevisionDays: string;
    objectInfo: ObjectInfo;
  }
