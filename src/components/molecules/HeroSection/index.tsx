"use client";
import React from "react";
import Image from "next/image";
import Button from "../../atoms/Button";
import heroImage from "@/assets/img/cuidador.png";
import { useModal } from "@/context/ModalProvider";
import Access from "../../organisms/Access";

const HeroSection: React.FC = () => {
  const { showModal } = useModal();

  const handleOpenLoginModal = () => {
    showModal(<Access />);
  };

  return (
    <section className="bg-gray-100 py-16 flex items-center">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-text-color mb-4">
            Cuidado e Tranquilidade para Seus Entes Queridos
          </h1>
          <p className="text-text-color mb-8 text-lg">
            Nosso aplicativo de agendamento de assistência para idosos oferece
            uma solução moderna, segura e eficiente para garantir o bem-estar de
            seus familiares.
          </p>
          <Button onClick={handleOpenLoginModal}>Começar agora</Button>
        </div>
        <div className="md:w-1/2">
          <Image
            src={heroImage}
            alt="Imagem ilustrativa de cuidado ao idoso"
            width={500}
            height={400}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
