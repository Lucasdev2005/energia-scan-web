import axios from "axios";
import { ApiGetParams } from "./types/apiGetParams";
import { ApiPostParams } from "./types/apiPostParams";
import { ApiPutParams } from "./types/apiPutParams";
import { ApiDeleteParams } from "./types/apiDeleteParams";
import { ApiPatchParams } from "./types/apiPatchParams";
import { IUseAPI } from "./types/iUseApi";

// Configurando a instância do axios
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export function useAPI(): IUseAPI {

    async function apiPost({ endPoint, payload, config }: ApiPostParams) {
        return axiosInstance.post(endPoint, payload, {
            headers: {
                ...config?.headers,
            },
            params: config?.params
        });
    }

    async function apiGet({ endPoint, config }: ApiGetParams) {
        return axiosInstance.get(endPoint, {
            headers: {
                ...config?.headers,
            },
            params: config?.params
        });
    }

    async function apiPut({ endPoint, payload, config }: ApiPutParams) {
        return axiosInstance.put(endPoint, payload, {
            headers: {
                ...config?.headers,
            }
        });
    }

    async function apiDelete({ endPoint, config }: ApiDeleteParams) {
        return axiosInstance.delete(endPoint, {
            headers: {
                ...config?.headers,
            }
        });
    }

    async function apiPatch({ endPoint, payload, config }: ApiPatchParams) {
        return axiosInstance.patch(endPoint, payload, {
            headers: {
                ...config?.headers,
            }
        });
    }

    return {
        apiPost,
        apiGet,
        apiPut,
        apiDelete,
        apiPatch
    };
}
