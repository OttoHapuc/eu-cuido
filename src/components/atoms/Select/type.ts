import { SelectHTMLAttributes } from "react"

type Option = {
    value: string;
    label: string;
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    id: string;
    name: string;
    options: (string | Option)[];
    onChange?: (value: string) => void;
    value?: string;
}