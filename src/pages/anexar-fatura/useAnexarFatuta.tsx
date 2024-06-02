import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { IUseAPI } from "../../hooks/useAPI/types/iUseApi";
import { IUseLoading } from "../../components/loading/types/useLoading";

interface useAnexarFaturaProps {
    api: IUseAPI,
    loading: IUseLoading
}

export default function useAnexarFatura({ api, loading }: useAnexarFaturaProps) {

    const toast = useToast();

    function uploadFatura(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        loading.startLoading('Salvando fatura em nosso banco de dados...');

        api.apiPost({
            endPoint: "fatura",
            payload: formData,
            config: {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        }).then(() => {
            loading.stopLoading();
            window.location.reload();
        }).catch((error: AxiosError) => {
            console.log("[uploadFatura] error: ", error);
            toast({
                title: 'error.',
                description: error.response?.data as string || "",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            loading.stopLoading();
        });
    }

    return {
        uploadFatura,
    }
}