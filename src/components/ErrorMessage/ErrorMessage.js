import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  const lines = message.split('\n');

  return (
    <div className="error-message">
      {lines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
};

export default ErrorMessage;
