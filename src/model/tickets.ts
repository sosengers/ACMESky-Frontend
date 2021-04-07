export interface Flight {
    flight_code: string;
    departureDatetime: string;
    arrivalDatetime: string;
    departureAirportCode: string;
    arrivalAirportCode: string;
    cost: number;
}

export interface Trip {
    outbound: Flight;
    comeback: Flight;
}

export interface Tickets {
    flights: Trip;
    transfers: [string];
}
