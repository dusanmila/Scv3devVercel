import { ObjectStoreCheck } from "./objectStoreCheck";

export interface StoreCheck {
    username: string;
    date: Date;
    finished: boolean;
    objectStoreChecks: ObjectStoreCheck[];
}