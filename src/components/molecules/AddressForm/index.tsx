'use client';
import React, { useState, useEffect } from 'react';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { apiRequest } from '@/request/apiRequest';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/atoms/Input';

const AddressForm: React.FC = () => {
    const [addresses, setAddresses] = useState<
        {
            id: number | string;
            street: string;
            number: string;
            complement?: string;
            neighborhood: string;
            city: string;
            state: string;
            zip_code: string;
        }[]
    >([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    const formFields = [
        { name: 'street', placeholder: 'Rua', type: 'text' },
        { name: 'number', placeholder: 'Número', type: 'text' },
        { name: 'complement', placeholder: 'Complemento', type: 'text' },
        { name: 'neighborhood', placeholder: 'Bairro', type: 'text' },
        { name: 'city', placeholder: 'Cidade', type: 'text' },
        { name: 'state', placeholder: 'Estado', type: 'text' },
        { name: 'zip_code', placeholder: 'CEP', type: 'text' },
    ];

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                setLoading(true);
                const response = await apiRequest<
                    {
                        id: number;
                        street: string;
                        number: string;
                        complement?: string;
                        neighborhood: string;
                        city: string;
                        state: string;
                        zip_code: string;
                    }[]
                >({
                    method: 'GET',
                    url: '/dashboard/profile/address',
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response) {
                    setAddresses(response);
                    setError('');
                }
            } catch (err: any) {
                setError('Erro ao carregar endereços do usuário.');
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, [token]);

    const handleInputChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        const updatedAddresses = [...addresses];
        updatedAddresses[index] = { ...updatedAddresses[index], [name]: value };
        setAddresses(updatedAddresses);
    };

    const handleAddAddress = () => {
        setAddresses([
            ...addresses,
            {
                id: crypto.randomUUID(),
                street: '',
                number: '',
                complement: '',
                neighborhood: '',
                city: '',
                state: '',
                zip_code: '',
            },
        ]);
    };

    const handleRemoveAddress = async (id: number | string, index: number) => {
        if (typeof id === 'number') {
            try {
                setLoading(true);
                await apiRequest({
                    method: 'DELETE',
                    url: `/dashboard/profile/address/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch (err: any) {
                setError('Erro ao excluir endereço.');
                setLoading(false);
                return;
            }
        }
        setAddresses(addresses.filter((_, i) => i !== index));
        setLoading(false);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            await apiRequest({
                method: 'POST',
                url: '/dashboard/profile/address',
                data: addresses,
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (err: any) {
            setError('Erro ao salvar endereços do usuário.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full border border-gray-200 rounded-md shadow-sm p-4">
            {addresses.length > 0 && addresses?.map((address, index) => (
                <div key={address.id} className="border-b pb-4 mb-4">
                    <div className="grid grid-cols-2 gap-4">
                        {formFields.map((field) => (
                            <Input
                                key={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                name={field.name}
                                value={address[field.name as keyof typeof address] || ''}
                                onChange={(e) => handleInputChange(index, e)}
                            />
                        ))}
                    </div>
                    <Button
                        className="mt-2 bg-red-500 text-white"
                        onClick={() => handleRemoveAddress(address.id, index)}
                        disabled={loading}
                    >
                        Remover Endereço
                    </Button>
                </div>
            ))}
            <Button onClick={handleAddAddress} disabled={loading}>
                Adicionar Endereço
            </Button>
            {error && <Text className="text-red-500">{error}</Text>}
            <Button onClick={handleSave} disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar Endereços'}
            </Button>
        </div>
    );
};

export default AddressForm;
