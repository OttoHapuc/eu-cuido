import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="border-t-2 border-gray-200 text-text-color p-8 text-center">
            <p>
                © {new Date().getFullYear()} - <strong>Eu Cuido</strong> Todos
                os direitos reservados.
            </p>
        </footer>
    );
};

export default Footer;
