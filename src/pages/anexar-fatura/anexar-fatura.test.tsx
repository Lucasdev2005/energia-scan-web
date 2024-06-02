import { render, screen } from '@testing-library/react';
import GlobalProvider from '../../components/globalProvider';
import AnexarFatura from './anexar-fatura';

test(`render "Selecione uma fatura para ser inserida na base de dados!"`, () => {
  render(
    <GlobalProvider>
      <AnexarFatura />
    </GlobalProvider>
  ); 
  const linkElement = screen.getByText(/Selecione uma fatura para ser inserida na base de dados!/i);
  expect(linkElement).toBeInTheDocument();
});
