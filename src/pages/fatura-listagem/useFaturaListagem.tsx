import { useCallback, useEffect, useState } from "react";
import { useAPI } from "../../hooks/useAPI/useAPI";
import { AxiosError, AxiosResponse } from "axios";
import { Fatura } from "../../types/Fatura";
import { useLoading } from "../../components/loading/loading";
import { ChartListType } from "../../enum/chatListType.enum";
import { toast } from "react-toastify";

export default function useFaturaListagem() {
    
    const { apiGet } = useAPI();
    const { startLoading, stopLoading } = useLoading();

    const [paginate, setPaginate] = useState({page: 1, pageSize: 5});
    const [mount, setMount] = useState(false);
    const [limitPage, setLimitPage] = useState<number>(5);
    const [numeroCliente, setNumeroCliente] = useState<string>();
    const [faturas, setFaturas] = useState<Fatura[]>([]);
    const [chart, setChart] = useState<{consumoPorMes: any[], valorTotalPorMes: any[]}>();
    const [chartListType, setChartListType] = useState<ChartListType>(ChartListType.CONSUMO_MENSAL);

    const getFaturas = useCallback(() => {
        const params = {...paginate, FTR_NumeroCliente: numeroCliente};
        if (!params.FTR_NumeroCliente) {
            delete(params.FTR_NumeroCliente);
        }
        startLoading();
        apiGet({ 
            endPoint: "fatura",
            config: { params }
        }).then((response: AxiosResponse) => {
            setFaturas(response.data.data);
            setLimitPage(response.data.metaData.limit);
            stopLoading();
        }).catch((error: AxiosError) => {
            toast.error(error.message);
        });
    }, [apiGet, paginate, numeroCliente, startLoading, stopLoading]);

    const getChart = useCallback(() => {
        const params = {FTR_NumeroCliente: numeroCliente};
        if (!params.FTR_NumeroCliente) {
            delete(params.FTR_NumeroCliente);
        }
        startLoading();
        apiGet({ 
            endPoint: "chart",
            config: { params }
        }).then((response: AxiosResponse) => {
            setChart(response.data);
            stopLoading();
        }).catch((error: AxiosError) => {
            toast.error(error.message);
        });
    }, [apiGet, numeroCliente, startLoading, stopLoading]);

    useEffect(() => {
        if (!mount) {
            getFaturas();
            getChart();
            setMount(true);
        }
    }, [mount, getFaturas, getChart]);

    function formataFaturaData(date: string) {
        const formatedDate = new Date(date);
        const month = formatedDate.getUTCMonth() + 1;
        const year = formatedDate.getUTCFullYear();
        return `${month}/${year}`;
    }

    function handleFilterByNumeroCliente() {
        getFaturas();
        getChart();
    }

    function handleSetChartType() {
        if (chartListType === ChartListType.CONSUMO_MENSAL) {
            setChartListType(ChartListType.VALOR_TOTAL);
        } else {
            setChartListType(ChartListType.CONSUMO_MENSAL);
        }
    }

    return {
        faturas,
        limitPage,
        setPaginate,
        setNumeroCliente,
        handleFilterByNumeroCliente,
        formataFaturaData,
        chart,
        chartListType,
        handleSetChartType
    }
}