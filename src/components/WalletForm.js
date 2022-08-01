import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies as Thunk, expense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleSubmit = async () => {
    const { saveExpense } = this.props;
    const { id } = this.state;
    const rates = await Thunk();
    delete rates.USDT;
    this.setState({
      exchangeRates: rates,
    });
    saveExpense(this.state);
    this.setState(
      { id: id + 1,
        value: '',
        description: '',
      },
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form style={ { display: 'flex', flexDirection: 'column' } }>
        <label htmlFor="valueInput">
          Valor:
          <input
            type="number"
            id="valueInput"
            value={ value }
            data-testid="value-input"
            onChange={ (event) => this.setState({
              value: event.target.value,
            }) }
          />
        </label>

        <label htmlFor="description">
          Descrição da despesa:
          <input
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ (event) => this.setState({
              description: event.target.value,
            }) }
          />
        </label>

        <label htmlFor="currency">
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ (event) => this.setState({
              currency: event.target.value,
            }) }
          >
            {currencies.map((crncy) => (
              <option key={ crncy }>{crncy}</option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ (event) => this.setState({
              method: event.target.value,
            }) }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ (event) => this.setState({
              tag: event.target.value,
            }) }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <button
          type="button"
          style={ { width: '90px' } }
          onClick={ this.handleSubmit }
        >
          Adicionar despesa
        </button>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(Thunk()),
  saveExpense: (info) => dispatch(expense(info)),
});

WalletForm.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
