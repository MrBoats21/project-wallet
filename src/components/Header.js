import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userExpense: 0,
    };
  }

  render() {
    const { email } = this.props;
    const { userExpense } = this.state;
    return (
      <div style={ { display: 'flex' } }>
        <p data-testid="email-field" style={ { paddingRight: '15px' } }>{email}</p>
        <p data-testid="header-currency-field" style={ { paddingRight: '15px' } }>BRL</p>
        <p data-testid="total-field" style={ { paddingRight: '15px' } }>{userExpense}</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
