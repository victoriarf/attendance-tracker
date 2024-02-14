import React, { useId } from 'react';

export const EmailForm = () => {
  const emailId = useId();

  return (
    <>
      <label htmlFor={emailId}>Email</label>
      <input type="email" id={emailId}></input>
    </>
  );
};
