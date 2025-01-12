import React, { useState } from 'react';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/request/apiRequest';
import { useModal } from '@/context/ModalProvider';
import Input from '@/components/atoms/Input';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const { hideModal } = useModal();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await apiRequest<{ token: string }>({
                method: 'POST',
                url: '/auth/login',
                data: { email, password },
            });
            login(response.token);
            hideModal();
        } catch (err: any) {
            setError("Usuário ou senha inválidos");
        }
    };

    return (
        <div className="flex flex-col gap-4 w-[350px]">
            <Text type="h2">Login</Text>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <Text className="text-red-500 text-sm">{error}</Text>}
                <Button type="submit">Entrar</Button>
            </form>
        </div>
    );
};

export default Login;
