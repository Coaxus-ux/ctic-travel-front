export interface AxiosResponse {
    data:       Data;
    status:     number;
    statusText: string;
    headers:    AxiosResponseHeaders;
    config:     Config;
    request:    Request;
}

export interface Config {
    transitional:      Transitional;
    adapter:           string[];
    transformRequest:  null[];
    transformResponse: null[];
    timeout:           number;
    xsrfCookieName:    string;
    xsrfHeaderName:    string;
    maxContentLength:  number;
    maxBodyLength:     number;
    env:               Env;
    headers:           ConfigHeaders;
    method:            string;
    url:               string;
}

export interface Env {
}

export interface ConfigHeaders {
    Accept:        string;
    Authorization: string;
}

export interface Transitional {
    silentJSONParsing:   boolean;
    forcedJSONParsing:   boolean;
    clarifyTimeoutError: boolean;
}

export interface Data {
    message:    string;
    data:       { [key: string]: Datum };
    jwt:        null;
    successful: boolean;
}

export interface Datum {
    transportMethodType: string;
}

export interface AxiosResponseHeaders {
    "content-type": string;
}

export interface Request {
    __zone_symbol__xhrSync:                 boolean;
    __zone_symbol__xhrURL:                  string;
    __zone_symbol__loadendfalse:            ZoneSymbol[];
    __zone_symbol__abortfalse:              ZoneSymbol[];
    __zone_symbol__errorfalse:              ZoneSymbol[];
    __zone_symbol__timeoutfalse:            ZoneSymbol[];
    __zone_symbol__xhrScheduled:            boolean;
    __zone_symbol__xhrErrorBeforeScheduled: boolean;
    __zone_symbol__xhrTask:                 ZoneSymbol;
}

export interface ZoneSymbol {
    type:     string;
    state:    string;
    source:   string;
    zone:     string;
    runCount: number;
}
