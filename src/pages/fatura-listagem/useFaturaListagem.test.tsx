import { ChartListType } from '../../enum/chatListType.enum';
import useFaturaListagem from './useFaturaListagem';
import { act, renderHook } from '@testing-library/react';


const mockApiGet = jest.fn();
const mockApiPost = jest.fn();
const mockApiPut = jest.fn();
const mockApiDelete = jest.fn();
const mockApiPatch = jest.fn();

function renderUseFatura () {
    mockApiGet.mockImplementation((params) => {
        if (params.endPoint === 'fatura') {
            return new Promise((resolve) => {
                resolve({ 
                    data: [
                        {
                            FTR_Id: 1,
                            FTR_NumeroCliente: "1233455",
                            FTR_Consumo_Energia: 1,
                            FTR_Valor_Total: 1,
                            FTR_Economia_GD: 1,
                            FTR_Data_Referente: "1233455"
                        }
                    ]
                })
            });
        }
        if (params.endPoint === 'chart') {
            return new Promise((resolve) => {
                resolve({ 
                    data: {
                        consumoPorMes: [{
                            valor: 1123
                        }], 
                        valorTotalPorMes: [{
                            valor: 123
                        }]
                    }
                })
            });
        }
    });

    return renderHook(() => useFaturaListagem({
        useAPI: {
            apiGet: mockApiGet,
            apiPost: mockApiPost,
            apiPut: mockApiPut,
            apiDelete: mockApiDelete,
            apiPatch: mockApiPatch,
        },
        useLoading: {
            startLoading: jest.fn(),
            stopLoading: jest.fn()
        }
    }))
}

describe('useFaturaListagem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

    it('deve ser feito o fetch das faturas e do gráfico', async () => {
        renderUseFatura();

        expect(mockApiGet).toHaveBeenNthCalledWith(1, expect.objectContaining({
            endPoint: 'fatura',
            config: expect.objectContaining({
                params: expect.objectContaining({page: 1, pageSize: 5})
            })
        }));

        expect(mockApiGet).toHaveBeenNthCalledWith(2, expect.objectContaining({
            endPoint: 'chart',
            config: expect.objectContaining({})
        }));
    });

    it('ao clicar no botão de tipo de gráfico, deve alterar tipo de dado listado no gráfico', () => {
        const { result } = renderUseFatura();
    
        act(async () => {
            await result.current.handleSetChartType();
            expect(result.current.chartListType).toEqual(ChartListType.CONSUMO_MENSAL);
        });
    
      });
});
