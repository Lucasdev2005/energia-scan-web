import { Box, Spinner } from '@chakra-ui/react'
import { ReactNode, createContext, useContext, useState } from "react";

const LoadingContext = createContext<{
    startLoading: (message?: string) => void;
    stopLoading: () => void;
}>({
    startLoading: (message?: string) => {
        throw new Error(
        "Você está chamando StartLoading fora de um <LoadingProvider>"
        );
    },
    stopLoading: () => {
        throw new Error(
            "Você está chamando stopLoading fora de um <LoadingProvider>"
        );
    }
});

export function useLoading() {
    return useContext(LoadingContext);
}

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    function startLoading(message?: string) {
        if (message) {
            setMessage(message);
        }

        setLoading(true);
    }

    function stopLoading() {
        setLoading(false);
        setMessage("");
    }
  
    return (
        <LoadingContext.Provider value={{ startLoading, stopLoading }}>
            {loading && (
                <Box
                    position="fixed"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    display="flex"
                    flexDirection={'column'}
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor="rgba(0, 0, 0, 0.5)"
                    zIndex={9999}
                    color={'white'}
                >
                    <Spinner 
                        width={20}
                        height={20}
                        color='white'
                    />
                    {message && <span className="text-white mt-4">{message}</span>}
                </Box>
            )}
            {children}
        </LoadingContext.Provider>
    );
  }