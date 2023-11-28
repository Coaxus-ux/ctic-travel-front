export interface TransportI {
    message:    string;
    data:       { [key: string]: Datum };
    jwt:        null;
    successful: boolean;
}

export interface Datum {
    transportMethodType: string;
}
