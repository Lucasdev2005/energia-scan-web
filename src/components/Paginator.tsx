import { Text } from "@chakra-ui/layout";
import { Tfoot, Tr, Td } from "@chakra-ui/table";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

interface PaginatorProps {
  onPageChange: (p: Paginate) => void;
  limit: number;
  maxPage: number;
}

export interface Paginate {
  page: number;
  pageSize: number;
}

/**
 * @param onPageChange Uma função callback que é chamada quando a página é alterada. Recebe um objeto Paginate como argumento.
 * @param limit O número máximo de páginas a serem exibidas na barra de paginação.
 * @param maxPage O número máximo de páginas disponíveis.
 */
export function Paginator({ onPageChange, limit, maxPage }: PaginatorProps) {
  const array = Array.from({ length: limit }, (_, index) => index + 1);
  const [page, setPage] = useState<number>(1);

  function handleSetNumberPages(actualPage: number) {
    if (actualPage <= 0) {
      actualPage = 1;
    }

    if (actualPage > 0 && actualPage <= maxPage) {
      setPage(actualPage);
      onPageChange({ pageSize: limit, page: actualPage });
    }
  }

  return (
    <Tfoot width={'100%'}>
      <Tr display={'flex'} flexDirection={'row'}>
        <Td
          bg="blue.500"
          color={'white'}
          cursor={'pointer'}
          padding={3}
          borderRadius={25}
          onClick={() => handleSetNumberPages(page - 1)}
          mr={2}
        >
          <ArrowLeft size={20} />
        </Td>
        {array.map((_, idx) => {
          const pageNumber = idx + page;
          return (
            pageNumber <= maxPage && (
              <Td
                key={pageNumber}
                borderWidth={1}
                borderRadius="md"
                p={2}
                display={'flex'}
                alignItems={'center'}
                mr={2}
                bg={pageNumber === page ? 'blue.500' : ''}
                color={pageNumber === page ? 'white' : 'black'}
                cursor="pointer"
                _hover={{ bg: "blue.100" }}
                onClick={() => handleSetNumberPages(pageNumber)}
              >
                <Text fontSize="xs">{pageNumber}</Text>
              </Td>
            )
          );
        })}
        <Td
          bg="blue.500"
          onClick={() => handleSetNumberPages(page + 1)}
          ml={2}
          color={'white'}
          padding={3}
          borderRadius={25}
          cursor={'pointer'}
        >
          <ArrowRight size={20} />
        </Td>
      </Tr>
    </Tfoot>
  );
}
