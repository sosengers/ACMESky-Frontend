import { Address } from "./address";

export interface OfferPurchaseData {
    offer_code: string;
    address: Address;
    name: string;
    surname: string;
}