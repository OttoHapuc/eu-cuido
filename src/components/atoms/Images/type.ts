import { HTMLAttributes } from "react";

export type ImageProps = HTMLAttributes<HTMLImageElement> & {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
}