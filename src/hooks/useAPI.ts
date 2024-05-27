import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, HttpStatusCode } from "axios";


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export function useAPI() {
    
    async function apiPost({endPoint, payload, config}: {endPoint: string, payload?: any, config?: AxiosRequestConfig}) {
        return axiosInstance.post(endPoint, payload, {
            headers: {
                ...config?.headers,
            },
            params: config?.params
        })
    }

    async function apiGet({endPoint, config}: {endPoint: string, config?: AxiosRequestConfig}) {
        return axiosInstance.get(endPoint, {
            headers: {
                ...config?.headers,
            },
            params: config?.params
        })
    }

    async function apiPut({endPoint, payload, config}: {endPoint: string, payload: any, config?: AxiosRequestConfig}) {
        return axiosInstance.put(endPoint, payload, {headers: {
            ...config?.headers,
        }})
    }

    async function apiDelete({endPoint, config}: {endPoint: string, config?: AxiosRequestConfig}) {
        return axiosInstance.delete(endPoint, {headers: {
            ...config?.headers,
        }})
    }

    async function apiPatch({endPoint, payload, config}: {endPoint: string, payload: any, config?: AxiosRequestConfig}) {
        return axiosInstance.patch(endPoint, payload, {headers: {
            ...config?.headers,
        }});
    }

    return {
        apiPost,
        apiGet,
        apiPut,
        apiDelete,
        apiPatch
    }
}
