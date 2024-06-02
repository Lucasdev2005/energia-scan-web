import { render, screen } from '@testing-library/react';
import GlobalProvider from '../../components/globalProvider';
import FaturaListagem from './fatura-listagem';

test(`a listagem das faturas devem vir como padrão "Consumo Mensal"`, () => {
  render(
    <GlobalProvider>
      <FaturaListagem />
    </GlobalProvider>
  ); 
  const linkElement = screen.getByText(/Consumo Mensal/i);
  expect(linkElement).toBeInTheDocument();
});
