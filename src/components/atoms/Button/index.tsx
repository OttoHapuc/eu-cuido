import React, { FC } from 'react';
import clsx from 'clsx';
import { ButtonProps } from '@/components/atoms/Button/type';

const Button: FC<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    className,
    id,
    name,
    disabled,
    default: isDefault = false,
    ...props
}) => {
    return (
        <button
            id={id}
            name={name}
            className={clsx(
                !isDefault &&
                    'bg-primary-color hover:bg-secondary-color py-2 px-4 rounded text-white text-base transition-colors duration-300 focus:outline-none',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                className
            )}
            onClick={onClick}
            type={type}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
