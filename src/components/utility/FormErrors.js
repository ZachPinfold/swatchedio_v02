import React from "react";

function FormErrors(props) {
  if (
    props.formerrors &&
    (props.formerrors.blankfield || props.formerrors.passwordmatch)
  ) {
    return (
      <div className='error-copy'>
        <div className='error-copy'>
          {props.formerrors.passwordmatch
            ? "Password value does not match confirm password value"
            : ""}
        </div>
        <div className='error-copy'>
          {props.formerrors.blankfield ? "All fields are required" : ""}
        </div>
      </div>
    );
  } else if (props.apierrors) {
    return (
      <div className='error-copy'>
        <div className='error-copy'>{props.apierrors}</div>
      </div>
    );
  } else if (props.formerrors && props.formerrors.cognito) {
    return (
      <div className=' error-copy'>
        <div className='error-copy'>{props.formerrors.cognito.message}</div>
      </div>
    );
  } else {
    return <div />;
  }
}

export default FormErrors;
