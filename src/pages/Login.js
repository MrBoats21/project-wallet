import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  }

  redirect = () => {
    const { userEmail } = this.props;
    const { email } = this.state;
    userEmail(email);
  }

  handleLogin() {
    const { email, password } = this.state;
    const minLen = 5;

    if (password.length >= minLen
      && email.includes('@')
      && email.includes('.com')) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { email, password, disabled } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="email">
            Email
            <input
              type="text"
              value={ email }
              name="email"
              data-testid="email-input"
              onChange={ (event) => {
                this.setState({
                  email: event.target.value,
                });
                this.handleLogin();
              } }
            />
          </label>

          <label htmlFor="password">
            Senha
            <input
              type="text"
              value={ password }
              name="password"
              data-testid="password-input"
              onChange={ (event) => {
                this.setState({
                  password: event.target.value,
                });
                this.handleLogin();
              } }
            />
          </label>

          <Link to="/carteira">
            <button
              type="button"
              id="login"
              disabled={ disabled }
              onClick={ this.redirect }
            >
              Entrar
            </button>

          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userEmail: (email) => dispatch(sendEmail(email)),
});

Login.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
