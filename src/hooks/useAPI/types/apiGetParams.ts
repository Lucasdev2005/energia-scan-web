import { AxiosRequestConfig } from "axios";

export interface ApiGetParams {
    endPoint: string;
    config?: AxiosRequestConfig;
}