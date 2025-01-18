'use client';
import React from 'react';
import Text from '@/components/atoms/Text';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Button from '@/components/atoms/Button';
import UserRoleForm from '@/components/molecules/UserRoleForm';
import AddressForm from '@/components/molecules/AddressForm';

const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Text type="h1" className="mb-8">
                Perfil
            </Text>
            <div className="flex flex-col gap-4 w-[800px]">
                <Text type="h2">Dados de Role</Text>
                <UserRoleForm />
                <Text type="h2">Dados de Endereço</Text>
                <AddressForm />
             </div>
        </div>
    );
};

export default ProfilePage;