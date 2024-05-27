import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { X } from "@phosphor-icons/react";
import { ChangeEvent, useRef, useState } from "react";

interface UploadProps {
    acceptableTypes: string[],
    label?: string,
    onFileAcpted?: (f: File) => void
}

/**
 * Componente de upload de arquivo.
 * @param acceptableTypes - Array com os tipos de arquivo aceitáveis. Ex: application/pdf
 * @param label - string que será imprimida descrevendo o input. Não informar ela fará com que a label descrevendo o erro também não apareça.
 * @param onFileAcpted - Função que será executada ao usuário upar um documento que tenha um tipo de arquivo incluido no array de arquivos aceitáveis.
 */
export default function Upload({ acceptableTypes, label, onFileAcpted}: UploadProps) {

    const [errorInput, setErrorInput] = useState<string>();
    const [file, setFile] = useState<File | null>();
    const inputRef = useRef<any>(null);

    function getUploadedFile(eventFile: ChangeEvent<HTMLInputElement>) {
        if (eventFile.target.files) {
            const file = eventFile.target.files[0];
            if (acceptableTypes.includes(file.type)) {
                setFile(file);
                setErrorInput("");
                if (onFileAcpted) {
                    onFileAcpted(file);
                }
            } else {
                setErrorInput("Uploaded document is invalid!");
                inputRef.current.value = "";
            }
        }
    }

    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
        >
            <Input
                onChange={(event) => getUploadedFile(event)}
                placeholder={label || "Choose file"}
                ref={inputRef}
                type="file"
                display="none"
            />
            <Box
                as="span"
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.300"
                p="4"
                _hover={{ bg: "gray.100" }}
                onClick={() => inputRef?.current?.click()}
            >
                {
                    file?.name ? (
                        <Box 
                            display={'flex'} 
                            flexDirection={'row'}
                        >
                            <Text>{file.name}</Text>
                            <X onClick={() => setFile(null)} size={20} />
                        </Box>
                    ) 
                    : (
                        label || "Choose file"
                    )
                }
            </Box>
            {errorInput && <Text color="red.500">{errorInput}</Text>}
        </Box>
    );
}