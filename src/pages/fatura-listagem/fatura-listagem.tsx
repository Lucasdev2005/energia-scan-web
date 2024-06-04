import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Paginator } from "../../components/Paginator";
import useFaturaListagem from "./useFaturaListagem";
import { Box, Button, Input } from "@chakra-ui/react";
import { ArrowClockwise, MagnifyingGlass } from "@phosphor-icons/react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartListType } from "../../enum/chatListType.enum";

export default function FaturaListagem() {

    const { 
        faturas, 
        setPaginate, 
        limitPage, 
        setNumeroCliente,
        handleFilterByNumeroCliente,
        formataFaturaData,
        chart,
        chartListType,
        handleSetChartType
    } = useFaturaListagem();

    return (
        <Box mt={3}>
                <Button 
                    display={'flex'} 
                    justifyContent={'center'} 
                    alignItems={'center'} 
                    gap={2}
                    onClick={handleSetChartType}
                >
                    { chartListType === ChartListType.CONSUMO_MENSAL ? "Consumo Mensal" : "Valor Mensal" } 
                    <ArrowClockwise size={20} />
                </Button>
                <BarChart width={800} height={300} data={chart?.[chartListType]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="valor" />
                    <YAxis />
                    <Bar 
                        dataKey="valor" 
                        fill="#3182ce"
                    />
                </BarChart>
            <Box 
                display={'flex'} 
                flexDirection={'row'} 
                alignItems={'center'}
                gap={2}
            >
                <Input 
                    placeholder="Número do Cliente" 
                    type="number"
                    onChange={event => setNumeroCliente(event.target.value)}
                />
                <Button onClick={handleFilterByNumeroCliente}>
                    <MagnifyingGlass />
                </Button>
            </Box>
            <TableContainer>
                <Table
                    variant="simple"
                    width={{ base: "100%", md: "80%", lg: "60%" }}
                    mx="auto"
                    my={4}
                >
                    <Thead>
                        <Tr>
                            <Th>Número do Cliente</Th>
                            <Th>Consumo de Energia</Th>
                            <Th>Valor Total</Th>
                            <Th>Data Referente</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {faturas.map((fatura, idx) => (
                            <Tr key={idx}>
                                <Td>{fatura.FTR_NumeroCliente}</Td>
                                <Td isNumeric>{fatura.FTR_Consumo_Energia} KWh</Td>
                                <Td isNumeric>R$ {fatura.FTR_Valor_Total}</Td>
                                <Td>{formataFaturaData(fatura.FTR_Data_Referente)}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Paginator 
                        limit={8} 
                        onPageChange={(p) => {setPaginate(p)}} 
                        maxPage={limitPage}
                    />
                </Table>
            </TableContainer>
        </Box>
    )
}