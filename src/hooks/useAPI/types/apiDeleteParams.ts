import { AxiosRequestConfig } from "axios";

export interface ApiDeleteParams {
    endPoint: string;
    config?: AxiosRequestConfig;
}