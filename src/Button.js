import React from 'react';
import './Button.css';

const Button = ({ id, label, onClick, className }) => {
  return (
    <button id={id} className={`button ${className}`} onClick={() => onClick(label)}>
      {label}
    </button>
  );
};

export {Button};
