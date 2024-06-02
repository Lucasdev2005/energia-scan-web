import { AxiosRequestConfig } from "axios";

export interface ApiPutParams {
    endPoint: string;
    payload: any;
    config?: AxiosRequestConfig;
}