import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { screen } from '@testing-library/react';
import Header from '../components/Header';
import mockData from "./helpers/mockData";

const expenseData = [
  {
    id: 0,
    value: '5000',
    currency: 'USD',
    method: 'Cartão de Crédito',
    tag: 'Saúde',
    description: 'Cirurgia emergencial',
    exchangeRates: {...mockData}
  },
  {
    id: 1,
    value: '1500',
    currency: 'EUR',
    method: 'Dinheiro',
    tag: 'Transporte',
    description: 'Viajem',
    exchangeRates: {...mockData}
  },
];

const INITIAL_STATE = {
  user: {
    email: 'xablau@gmail.com',
  },
  wallet: {
    expenses: expenseData,
  },
};

describe('Testando componente header', () => {
  it('Testa se o campo de email está na tela', () => {
    renderWithRouterAndRedux(<Header />, { initialState: INITIAL_STATE });

    const email = screen.getByTestId('email-field');

    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent('xablau@gmail.com');
  });

  it('Testa se é mostrado na tela a soma das despesas adicionadas', () => {
    renderWithRouterAndRedux(<Header />, { initialState: INITIAL_STATE });

    const totalValue = screen.getByTestId('total-field');

    expect(totalValue).toBeInTheDocument();
    expect(totalValue).toHaveTextContent('31455.70');
  });
});