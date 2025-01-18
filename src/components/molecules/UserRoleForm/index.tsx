'use client';
import React, { useState, useEffect } from 'react';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { apiRequest } from '@/request/apiRequest';
import { useAuth } from '@/context/AuthContext';
import Checkbox from '@/components/atoms/Checkbox';

const UserRoleForm: React.FC = () => {
    const [roles, setRoles] = useState<{ name: string; id: number }[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchUserRoles = async () => {
            try {
                setLoading(true);
                const response = await apiRequest<{
                    roles: { name: string; id: number }[];
                    user_roles: { role_id: number }[];
                }>({
                    method: 'GET',
                    url: '/dashboard/profile/user-role',
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response?.roles) {
                    setRoles(response.roles);
                    setSelectedRoles(response.user_roles.map((role) => role.role_id));
                }
            } catch (err: any) {
                setError('Falha ao carregar as roles do usuário.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserRoles();
    }, [token]);

    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const roleId = parseInt(value, 10);

        setSelectedRoles((prev) =>
            checked ? [...prev, roleId] : prev.filter((id) => id !== roleId)
        );
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            await apiRequest({
                method: 'POST',
                url: '/dashboard/profile/user-role',
                data: { roles: selectedRoles },
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (err: any) {
            setError('Falha ao salvar as roles do usuário.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full border border-gray-200 rounded-md shadow-sm p-4">
            <div className="flex flex-col gap-2">
                {roles.map((role) => (
                    <Checkbox
                        key={role.id}
                        id={role.id.toString()}
                        value={role.id.toString()}
                        label={role.name}
                        checked={selectedRoles.includes(role.id)}
                        onChange={handleRoleChange}
                    />
                ))}
            </div>
            {error && <Text className="text-red-500">{error}</Text>}
            <Button onClick={handleSave} disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar Roles'}
            </Button>
        </div>
    );
};

export default UserRoleForm;
