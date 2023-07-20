import React from 'react';
import './styles.scss';

interface IButtonProps {
  type: "submit" | "button",
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  text: string,
  disabled?: boolean
}

function Button({ type, onClick, text, disabled }: IButtonProps) {
  return (
    <button disabled={disabled} type={type} onClick={onClick} className='main-button'>
      {text}
    </button>
  );
};

export default Button;