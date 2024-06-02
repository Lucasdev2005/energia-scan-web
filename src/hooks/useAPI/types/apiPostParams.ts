import { AxiosRequestConfig } from "axios";

export interface ApiPostParams {
    endPoint: string;
    payload?: any;
    config?: AxiosRequestConfig;
}