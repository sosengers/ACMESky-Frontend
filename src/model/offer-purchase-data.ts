import { Address } from "./address";

export interface OffertPurchaseData {
    offer_code: string;
    address: Address;
    name: string;
    surname: string;
}