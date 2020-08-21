import React, { Component, useState } from "react";
import FormErrors from "../utility/FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import { register } from "../../actions/auth";
import { connect } from "react-redux";

const Register = ({ register, openRegister }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false
    }
  });

  const { username, email, password, confirmpassword, errors } = formData;

  const clearErrorState = () => {
    setFormData({
      ...formData,
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
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

    register(username, password, email, err => {
      setFormData({ ...formData, errors: { ...errors, cognito: err } });
    });
  };

  const onInputChange = event => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  return (
    <section className='modal-wrapper'>
      <div onClick={() => openRegister(false)} className='modal-backdrop'>
        <div onClick={e => e.stopPropagation()} className='modal-box'>
          <h1>Register</h1>
          <FormErrors formerrors={errors} />

          <form onSubmit={handleSubmit}>
            <div className='field'>
              <p className='control'>
                <input
                  className='input'
                  type='text'
                  id='username'
                  aria-describedby='userNameHelp'
                  placeholder='Enter username'
                  value={username}
                  onChange={onInputChange}
                />
              </p>
            </div>
            <div className='field'>
              <p className='control has-icons-left has-icons-right'>
                <input
                  className='input'
                  type='email'
                  id='email'
                  aria-describedby='emailHelp'
                  placeholder='Enter email'
                  value={email}
                  onChange={onInputChange}
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-envelope'></i>
                </span>
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
              <p className='control has-icons-left'>
                <input
                  className='input'
                  type='password'
                  id='confirmpassword'
                  placeholder='Confirm password'
                  value={confirmpassword}
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
                <button className='button is-success'>Register</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default connect(null, { register })(Register);
