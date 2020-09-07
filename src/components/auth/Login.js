import React, { useState, useEffect } from "react";
import FormErrors from "../utility/FormErrors";
import Validate from "../utility/FormValidation";
import { login } from "../../actions/auth";
import { connect } from "react-redux";

const Login = ({ auth, login, openLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  });

  useEffect(() => {
    if (auth.isAuthenticated === true) {
      openLogin(false);
    }
  }, [auth.isAuthenticated]);

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

  const handleSubmit = event => {
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

    // // AWS Cognito integration here

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
          <p onClick={() => openLogin(false)} className='close-modal-x'>
            x
          </p>
          <h3 className='login-register-title'>Log in</h3>
          <div className='break-line'></div>
          <FormErrors formerrors={errors} />

          <form onSubmit={handleSubmit}>
            <div className='field'>
              <p className='control'>
                <input
                  className='input'
                  type='text'
                  id='username'
                  aria-describedby='usernameHelp'
                  placeholder='Enter username'
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
              </p>
            </div>
            <div style={{ marginTop: "15px" }} className='break-line'></div>
            <div className='field-btn'>
              <p className='control'>
                <button
                  style={{ marginTop: "20px", padding: "4px 70px" }}
                  className='btn-primary btn-login-modal'
                >
                  Login
                </button>
              </p>
            </div>
            <div className='field field-login'>
              <p className='control'>
                <a className='login-register-sublink'>Forgot password?</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const mstp = state => ({
  auth: state.auth
});

export default connect(mstp, { login })(Login);
