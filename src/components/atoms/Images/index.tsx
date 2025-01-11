import React, { FC } from 'react';
import clsx from 'clsx';
import { ImageProps } from './type';
import Img from 'next/image';

const Image: FC<ImageProps> = ({
    src,
    alt,
    className,
    width,
    height,
    ...props
}) => {
    return (
        <Img
            className={clsx('max-w-full h-auto block', className)}
            src={src}
            alt={alt}
            width={width}
            height={height}
            {...props}
        />
    );
};

export default Image;
