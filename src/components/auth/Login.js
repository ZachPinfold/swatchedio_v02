import React, { useState } from "react";
import FormErrors from "../utility/FormErrors";
import Validate from "../utility/FormValidation";
import { login } from "../../actions/auth";
import { connect } from "react-redux";

const Login = ({ login, openLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  });

  const { username, password, errors } = formData;

  const clearErrorState = () => {
    setFormData({
      ...formData,
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    clearErrorState();
    const error = Validate(event, formData);
    if (error) {
      setFormData({
        ...formData,
        errors: {
          ...error,

          errors
        }
      });
    }

    // AWS Cognito integration here

    login(username, password, err => {
      setFormData({ ...formData, errors: { ...errors, cognito: err } });
    });
  };

  const onInputChange = event => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  return (
    <section className='modal-wrapper'>
      <div onClick={() => openLogin(false)} className='modal-backdrop'>
        <div onClick={e => e.stopPropagation()} className='modal-box'>
          <h1>Log in</h1>
          <FormErrors formerrors={errors} />

          <form onSubmit={handleSubmit}>
            <div className='field'>
              <p className='control'>
                <input
                  className='input'
                  type='text'
                  id='username'
                  aria-describedby='usernameHelp'
                  placeholder='Enter username or email'
                  value={username}
                  onChange={onInputChange}
                />
              </p>
            </div>
            <div className='field'>
              <p className='control has-icons-left'>
                <input
                  className='input'
                  type='password'
                  id='password'
                  placeholder='Password'
                  value={password}
                  onChange={onInputChange}
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-lock'></i>
                </span>
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                <a href='/forgotpassword'>Forgot password?</a>
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                <button className='button is-success'>Login</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default connect(null, { login })(Login);
