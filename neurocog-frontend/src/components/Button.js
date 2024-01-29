import React from 'react';

const Button = ({ 
  btnDesignation, 
  btnName, 
  btnType, 
  onClick 
}) => {
  return (
    <button type={btnType} className={btnDesignation} onClick={onClick}>{btnName}</button>
  )
}

export default Button