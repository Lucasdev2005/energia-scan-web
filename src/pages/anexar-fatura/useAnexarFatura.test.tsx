import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { IUseAPI } from '../../hooks/useAPI/types/iUseApi';
import { IUseLoading } from '../../components/loading/types/useLoading';
import { renderHook } from '@testing-library/react';
import useAnexarFatura from './useAnexarFatuta';
import { act } from 'react';

// Mocking de dependências
jest.mock('@chakra-ui/react', () => ({
  useToast: jest.fn(),
}));

describe('useAnexarFatura', () => {
  let startLoadingMock: jest.Mock;
  let stopLoadingMock: jest.Mock;
  let toastMock: jest.Mock;
  let apiPostMock: jest.Mock;

  const mockAPI: IUseAPI = {
    apiPost: jest.fn(),
    apiGet: jest.fn(),
    apiPut: jest.fn(),
    apiDelete: jest.fn(),
    apiPatch: jest.fn()
  };

  const mockLoading: IUseLoading = {
    startLoading: jest.fn(),
    stopLoading: jest.fn()
  };

  beforeEach(() => {
    startLoadingMock = mockLoading.startLoading as jest.Mock;
    stopLoadingMock = mockLoading.stopLoading as jest.Mock;
    toastMock = jest.fn();

    (useToast as jest.Mock).mockReturnValue(toastMock);

    apiPostMock = mockAPI.apiPost as jest.Mock;

    window.location = { reload: jest.fn() } as any;
  });

  it('deve fazer o upload do arquivo com sucesso', async () => {
    apiPostMock.mockResolvedValueOnce({});

    const { result } = renderHook(() => useAnexarFatura({ api: mockAPI, loading: mockLoading }));
    const file = new File(['dummy content'], 'example.pdf', { type: 'application/pdf' });
    window.location = { reload: jest.fn() } as any;

    await act(async () => {
      await result.current.uploadFatura(file);
    });

    expect(startLoadingMock).toHaveBeenCalledWith('Salvando fatura em nosso banco de dados...');
    expect(apiPostMock).toHaveBeenCalledWith({
      endPoint: 'fatura',
      payload: expect.any(FormData),
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });
    expect(stopLoadingMock).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
  });

});
