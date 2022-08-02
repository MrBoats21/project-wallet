import { render, screen,debug } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import {renderWithRouterAndRedux} from './helpers/renderWith';

describe('Testando Componente Login', () => {
  test('Se Login é renderizado como esperado', () => {
    renderWithRouterAndRedux(<BrowserRouter><App/></BrowserRouter>)
    const btn = screen.getByRole('button', {  name: /entrar/i});
    expect(btn).toBeDisabled();
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    userEvent.type(email, 'test@gmail.com');
    userEvent.type(password, '123456');
    userEvent.click(btn);
    expect(screen.getByText(/test@gmail.com/i)).toBeInTheDocument();
  });
}); 