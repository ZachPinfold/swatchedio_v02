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
          <p onClick={() => openRegister(false)} className='close-modal-x'>
            x
          </p>
          <h3 className='login-register-title'>Register</h3>
          <div className='break-line'></div>

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
              </p>
            </div>
            <div style={{ marginTop: "15px" }} className='break-line'></div>
            <div className='field'>
              <p className='control'>
                <button
                  style={{ marginTop: "20px", padding: "4px 70px" }}
                  className='btn-primary btn-login-modal'
                >
                  Register
                </button>
              </p>
            </div>
            <div className='field field-login'>
              <p className='control'>
                <a className='login-register-sublink'>
                  Already signed up? Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default connect(null, { register })(Register);
