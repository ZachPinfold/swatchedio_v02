import React, { useState, useEffect } from "react";
import FormErrors from "../utility/FormErrors";
import Validate from "../utility/FormValidation";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";

const Forgot = ({ openForgot, openForgotLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  });

  //   useEffect(() => {
  //     if (auth.isAuthenticated === true) {
  //       openLogin(false);
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [auth.isAuthenticated]);

  const { email, errors } = formData;

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
    // clearErrorState();
    // const error = Validate(event, formData);
    // if (error) {
    //   setFormData({
    //     ...formData,
    //     errors: {
    //       ...error,
    //       errors
    //     }
    //   });
    // }

    // // AWS Cognito integration here

    try {
      await Auth.forgotPassword(email);
      openForgotLogin(true);
      openForgot(false);
    } catch (error) {
      setFormData({
        ...formData,
        errors: {
          ...error,
          cognito: error
        }
      });
    }
  };

  const onInputChange = event => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  return (
    <section className='modal-wrapper'>
      <div onClick={() => openForgot(false)} className='modal-backdrop'>
        <div onClick={e => e.stopPropagation()} className='modal-box'>
          <p onClick={() => openForgot(false)} className='close-modal-x'>
            x
          </p>
          <h3 className='login-register-title'>Forgot Password</h3>
          <div className='break-line'></div>
          <FormErrors formerrors={errors} />

          <form onSubmit={handleSubmit}>
            <div className='field'>
              <p className='control'>
                <input
                  className='input'
                  type='text'
                  id='email'
                  aria-describedby='usernameHelp'
                  placeholder='Enter username'
                  value={email}
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
                  Send code
                </button>
              </p>
            </div>
            {/* <div className='field field-login'>
              <p className='control'>
                <a className='login-register-sublink'>Forgot password?</a>
              </p>
            </div> */}
          </form>
        </div>
      </div>
    </section>
  );
};

const mstp = state => ({
  auth: state.auth
});

export default connect(mstp, { login })(Forgot);
