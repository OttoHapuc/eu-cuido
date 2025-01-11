import { ModalContentProps } from './type';

const ModalContent: React.FC<ModalContentProps> = ({ children, show }) => {
    return (
        <div
            className={`fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      bg-white shadow-lg rounded-lg p-6 transition-transform duration-300 
      ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        >
            {children}
        </div>
    );
};

export default ModalContent;
