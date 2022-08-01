import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  getTotalAmout = () => {
    const { expenses } = this.props;
    let totalOfExpenses = 0;
    expenses.map((element) => {
      const { value, currency, exchangeRates } = element;
      const rateBase = Object.values(exchangeRates)
        .find((ele) => ele.code === currency);
      totalOfExpenses += (rateBase.ask * value);
      return totalOfExpenses.toFixed(2);
    });
    return totalOfExpenses.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div style={ { display: 'flex' } }>
        <p data-testid="email-field" style={ { paddingRight: '15px' } }>{email}</p>
        <p data-testid="header-currency-field" style={ { paddingRight: '15px' } }>BRL</p>
        <p
          data-testid="total-field"
          style={ { paddingRight: '15px' } }
        >
          { this.getTotalAmout() }
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
