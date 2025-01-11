import React from "react";
import { OverlayProps } from "./type";

const Overlay: React.FC<OverlayProps> = ({ show, onClose, backgroundOpacity = true }) => {
  if (!show) return null;

  return (
    <button
      className={`fixed inset-0 z-40 ${
        backgroundOpacity ? "bg-black/50" : "bg-transparent"
      } transition-opacity duration-300`}
      onClick={onClose}
    />
  );
};

export default Overlay;