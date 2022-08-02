import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense as deleteAction } from '../redux/actions';

class Table extends Component {
  formatValue = (n) => n.toFixed(2);

  handleValue = (n1, n2 = 1) => {
    if (typeof n1 !== 'number') {
      parseFloat(n1);
    }
    if (typeof n2 !== 'number') {
      parseFloat(n2);
    }
    return this.formatValue(n1 * n2);
  };

  render() {
    const { expenses, deleteExpense } = this.props;

    return (
      <table id="tabela">
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
        <tbody>
          { expenses.length > 0 && expenses
            .map(({ id, description, tag, method, value, currency, exchangeRates }) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{this.handleValue(value)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{this.handleValue(exchangeRates[currency].ask)}</td>
                <td>{this.handleValue(value, exchangeRates[currency].ask)}</td>
                <td>BRL</td>
                <td>
                  <button type="button">Editar</button>
                  <button
                    type="button"
                    id={ id }
                    onClick={ () => deleteExpense(id) }
                    data-testid="delete-btn"
                  >
                    Excluir

                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = ({
  expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
}.isRequired);

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
