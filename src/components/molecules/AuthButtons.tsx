'use client'
import React from 'react';
import Button from '@/components/atoms/Button';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const AuthButtons: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated ? (
         <Button variant='secondary' onClick={logout}>Logout</Button>
      ) : (
        <>
            <Link href="/login">
               <Button variant="link">Entrar</Button>
            </Link>
            <Link href="/register">
                <Button>Cadastrar</Button>
            </Link>
        </>
       )}
    </div>
  );
};

export default AuthButtons;