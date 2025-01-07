import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import { apiRequest } from "@/request/apiRequest";
import { useModal } from "@/context/ModalProvider";
import Input from "@/components/atoms/Input";
import { useAuth } from "@/context/AuthContext";

const Register: React.FC = () => {
  const {login} = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { hideModal } = useModal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const token = await apiRequest({
        method: "POST",
        url: "/auth/register",
        data: { name, email, password },
      });
      login(token);
      hideModal();
      alert("Usuário cadastrado com sucesso, realize login!");
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-[350px]">
      <Text type="h2">Cadastrar</Text>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        {error && <Text className="text-red-500">{error}</Text>}
        <Button type="submit">Cadastrar</Button>
      </form>
    </div>
  );
};

export default Register;
