import React from 'react';
import Link from 'next/link';
import { NextPage } from 'next';

const LoginPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="flex flex-col space-y-2">
        <input type="text" placeholder="Email" className="border rounded px-2 py-1" />
        <input type="password" placeholder="Senha" className="border rounded px-2 py-1" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
      </form>
      <div className="mt-4 flex space-x-2">
        <Link href="/cadastro/cuidador">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Cadastrar como Cuidador</button>
        </Link>
        <Link href="/cadastro/idoso">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Cadastrar como Idoso</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;