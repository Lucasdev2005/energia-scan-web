import { useToast } from "@chakra-ui/react";
import { useLoading } from "../../components/loading";
import { useAPI } from "../../hooks/useAPI";
import { AxiosError } from "axios";

export default function useAnexarFatura() {

    const { apiPost } = useAPI();
    const { startLoading, stopLoading } = useLoading();
    const toast = useToast();

    function uploadFatura(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        startLoading('Salvando fatura em nosso banco de dados...');
    
        apiPost({
            endPoint: "fatura",
            payload: formData,
            config: {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        }).then(() => {
            stopLoading();
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
            stopLoading();
        });
    }

    return {
        uploadFatura,
    }
}