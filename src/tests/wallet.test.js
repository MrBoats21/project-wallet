import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { screen } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import userEvent from '@testing-library/user-event';
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
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE'
    ],
    expenses: expenseData,
    editor: false,
    idToEdit: 0,
    expenseToEdit: {},
  },
};

describe('Testa a página Wallet', () => {
  it('Verifica se todos os elementos estão na tela', () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId('value-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const description = screen.getByTestId('description-input');
    const addButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(value).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it('Verifica se a funcionalidade de adicionar despesas existe', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const addButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(value, '1000');
    userEvent.type(description, 'Gasto emergencial');
    userEvent.click(addButton);

    expect(
      await screen.findByRole('cell', { name: '1000.00' })
    ).toBeInTheDocument();

    expect(
        await screen.findByRole('cell', { name: 'Gasto emergencial' })
      ).toBeInTheDocument();

    expect(
      await screen.findByRole('cell', {
        name: 'Dólar Americano/Real Brasileiro',
      })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole('cell', { name: 'Dinheiro' })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole('cell', { name: 'Alimentação' })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole('cell', { name: 'BRL' })
    ).toBeInTheDocument();
  });

  it('Testa se exclui uma despesa ao clicar no botão de excluir', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });

    const delButton = screen.getAllByTestId('delete-btn');
    expect(delButton[0]).toBeInTheDocument();

    const description = screen.queryByRole('cell', {
      name: /cirurgia/i
    });
    expect(description).toBeInTheDocument();

    userEvent.click(delButton[0]);
    expect(description).not.toBeInTheDocument();
  });
});