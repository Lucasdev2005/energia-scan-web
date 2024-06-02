import { AxiosRequestConfig } from "axios";

export interface ApiPatchParams {
    endPoint: string;
    payload: any;
    config?: AxiosRequestConfig;
}