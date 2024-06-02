import { AxiosResponse } from "axios";
import { ApiPostParams } from "./apiPostParams";
import { ApiGetParams } from "./apiGetParams";
import { ApiPutParams } from "./apiPutParams";
import { ApiDeleteParams } from "./apiDeleteParams";
import { ApiPatchParams } from "./apiPatchParams";

export interface IUseAPI {
    apiPost: (params: ApiPostParams) => Promise<AxiosResponse>;
    apiGet: (params: ApiGetParams) => Promise<AxiosResponse>;
    apiPut: (params: ApiPutParams) => Promise<AxiosResponse>;
    apiDelete: (params: ApiDeleteParams) => Promise<AxiosResponse>;
    apiPatch: (params: ApiPatchParams) => Promise<AxiosResponse>;
}