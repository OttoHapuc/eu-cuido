'use client'
import Overlay from "@/components/atoms/Overlay";
import ModalContent from "@/components/molecules/ModalContent";
import { ModalContextProps, ModalOptions } from "@/types/context/ModalProvider";
import React, { createContext, useContext, useState, ReactNode } from "react";

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [options, setOptions] = useState<ModalOptions>({ backgroundOpacity: true });

  const showModal = (content: ReactNode, modalOptions?: ModalOptions) => {
    setModalContent(content);
    setOptions({ ...options, ...modalOptions });
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setTimeout(() => setModalContent(null), 300); // Delay para animação
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Overlay show={isVisible} onClose={hideModal} backgroundOpacity={options.backgroundOpacity} />
      <ModalContent show={isVisible}>{modalContent}</ModalContent>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
