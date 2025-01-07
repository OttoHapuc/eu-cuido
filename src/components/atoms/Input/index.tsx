import React, { FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { InputProps } from './type';

const Input: FC<InputProps> = ({
    type = 'text',
    className,
    id,
    name,
    ...props
  }) => {
    return (
      <input
        id={id}
        name={name}
        className={clsx('py-2 px-4 border border-gray-300 rounded text-base focus:outline-none focus:border-primary-color focus:ring-2 focus:ring-tertiary-color', className)}
        type={type}
        {...props}
      />
    );
};

export default Input;