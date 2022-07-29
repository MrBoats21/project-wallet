import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies as Thunk } from '../redux/actions';

class WalletForm extends Component {
  state = {
    initiate: false,
  };

  componentDidMount() {
    this.loadWallet();
  }

  loadWallet = async () => {
    const { fetchCurrencies } = this.props;
    this.setState({ initiate: true });
    fetchCurrencies();
    this.setState({ initiate: false });
  };

  render() {
    const { initiate } = this.state;
    const { currencies } = this.props;
    return (
      <form style={ { display: 'flex', flexDirection: 'column' } }>
        {initiate ? (
          <p>Carregando</p>
        ) : (
          <>
            <label htmlFor="valueInput">
              Valor:
              <input type="number" id="valueInput" data-testid="value-input" />
            </label>

            <label htmlFor="desc">
              Descrição da despesa:
              <input
                type="text"
                name="desc"
                data-testid="description-input"
              />
            </label>

            <label htmlFor="Moeda base:">
              <select data-testid="currency-input" name="">
                {currencies.map((currency) => (
                  <option key={ currency }>{currency}</option>
                ))}
              </select>
            </label>

            <label htmlFor="method">
              Método de pagamento:
              <select data-testid="method-input" name="method">
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            </label>

            <label htmlFor="tag">
              Tag:
              <select data-testid="tag-input" name="tag">
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>
              </select>
            </label>

            <button type="button" style={ { width: '90px' } }>
              Adicionar despesa
            </button>
          </>
        )}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(Thunk()),
});

WalletForm.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
