import { Box, Text } from "@chakra-ui/layout";
import Upload from "../../components/upload";
import useAnexarFatura from "./useAnexarFatuta";

export default function AnexarFatura() {

    const { uploadFatura } = useAnexarFatura();

    return (
        <Box
            w={'50%'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
        >
            <Text 
                align={'center'}
                fontSize={'larger'}
                mb={3}
            >
                Selecione uma fatura para ser inserida na base de dados!
            </Text>
            <Upload
                acceptableTypes={['application/pdf']}
                label="Escolha a sua Fatura!"
                onFileAcpted={uploadFatura}
            />
        </Box>
    );
}