export interface IUseLoading {
    startLoading: (message?: string) => void,
    stopLoading: () => void;
}