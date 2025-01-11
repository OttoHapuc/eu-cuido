import { ReactNode } from 'react';

export interface ModalContextProps {
    showModal: (content: ReactNode, options?: ModalOptions) => void;
    hideModal: () => void;
}

export interface ModalOptions {
    backgroundOpacity?: boolean;
}
