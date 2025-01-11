"use client";

import { useState } from "react";
import Login from "../../molecules/Login";
import Register from "../../molecules/Register";
import Button from "../../atoms/Button";

const Access: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? <Login /> : <Register />}
      <Button onClick={() => setIsLogin(!isLogin)} default={true} className="mt-4 hover:underline underline-offset-2 secondary-text">
        {!isLogin ? "Possuo um acesso" : "Realizar registro"}
      </Button>
    </>
  );
};

export default Access;
