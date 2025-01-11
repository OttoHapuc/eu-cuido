'use client';
import React from 'react';
import Button from '@/components/atoms/Button';
import { useAuth } from '@/context/AuthContext';
import { useModal } from '@/context/ModalProvider';
import Access from '../../organisms/Access';

const AuthButtons: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const { showModal } = useModal();

    const handleOpenLoginModal = () => {
        showModal(<Access />);
    };

    return (
        <div className="flex items-center gap-4">
            {isAuthenticated ? (
                <Button onClick={logout}>Logout</Button>
            ) : (
                <Button onClick={handleOpenLoginModal}>Acessar</Button>
            )}
        </div>
    );
};

export default AuthButtons;
