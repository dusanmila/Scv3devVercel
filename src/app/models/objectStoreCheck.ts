import { Obj } from "./object";
import { StoreCheck } from "./storeCheck";

export interface ObjectStoreCheck {
    storeCheck: StoreCheck;
    object: Obj;
    pdf: string;
    username: string;

}

export interface ObjectStoreCheckCreateDto {
    objectIdCompany: string;
    username: string;
    pdf: string;
}
