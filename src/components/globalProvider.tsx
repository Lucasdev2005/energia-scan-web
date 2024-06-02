import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { LoadingProvider } from "./loading/loading";

export default function GlobalProvider({ children }: {children: ReactNode}) {
    return (
        <ChakraProvider>
            <LoadingProvider>
                {children}
            </LoadingProvider>
        </ChakraProvider>
    )
}