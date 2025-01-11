import React, { FC } from 'react';
import clsx from 'clsx';
import { SelectProps } from './type';

const Selects: FC<SelectProps> = ({
    options,
    onChange,
    value,
    className,
    id,
    name,
    ...props
}) => {
    return (
        <select
            id={id}
            name={name}
            className={clsx(
                "py-2 px-4 border border-gray-300 rounded text-base appearance-none bg-white bg-no-repeat bg-right-10 bg-[url(\"data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>\")] cursor-pointer focus:outline-none focus:border-primary-color focus:ring-2 focus:ring-tertiary-color",
                className
            )}
            onChange={(e) => onChange?.(e.target.value)}
            value={value}
            {...props}
        >
            {options.map((option) => {
                const optionValue =
                    typeof option === 'string' ? option : option.value;
                const optionLabel =
                    typeof option === 'string' ? option : option.label;
                return (
                    <option key={optionValue} value={optionValue}>
                        {optionLabel}
                    </option>
                );
            })}
        </select>
    );
};

export default Selects;
