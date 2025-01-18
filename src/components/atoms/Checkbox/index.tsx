import React, { FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Checkbox: FC<CheckboxProps> = ({ label, className, ...props }) => {
    return (
        <div className="flex items-center gap-2">
            <input
                type="checkbox"
                className={clsx('rounded border-gray-300 focus:ring-primary-color', className)}
                {...props}
            />
            {label && <label htmlFor={props.id}>{label}</label>}
        </div>
    );
};

export default Checkbox;