import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'link';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  ...props
}) => {
  let styles =
    'px-4 py-2 rounded-md text-white font-medium focus:outline-none transition-colors duration-200';
  
  switch (variant) {
    case 'primary':
      styles += ' bg-blue-600 hover:bg-blue-700';
      break;
    case 'secondary':
      styles += ' bg-gray-500 hover:bg-gray-600';
      break;
    case 'link':
      styles = 'text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200';
    break;
    default:
       styles += ' bg-blue-600 hover:bg-blue-700';
  }

  return (
    <button {...props} className={styles}>
      {children}
    </button>
  );
};

export default Button;