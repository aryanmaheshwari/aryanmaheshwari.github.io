import React from 'react';
import './styles/Button.css';

const Button = ({
  text = 'Click Me',
  disabled = false,
  hasError = false,
  isClicked = false,
  onClick,
}) => {

  const classNames = [
    'custom-button',
    isClicked ? 'clicked' : '',
    disabled ? 'disabled' : '',
    hasError ? 'error' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
