import { HTMLAttributes } from "react";

export type TextTypes =
| 'h1'
| 'h2'
| 'h3'
| 'h4'
| 'h5'
| 'h6'
| 'span'

export type TextProps =  HTMLAttributes<HTMLElement> & {
    id?: string;
    name?: string;
    type?: TextTypes;
    children: React.ReactNode
}