import React, { FC } from "react";
import clsx from "clsx";
import { TextProps } from "./type";

const Text: FC<TextProps> = ({
  type = "span",
  children,
  className,
  id,
  name,
  ...props
}) => {
  const Tag = type;

  const textClasses = clsx(
    "mb-2 text-text-color",
    {
      "text-2xl font-bold": type === "h1",
      "text-xl font-bold": type === "h2",
      "text-lg font-bold": type === "h3",
      "text-base font-bold": type === "h4",
      "text-sm font-bold": type === "h5",
      "text-xs font-bold": type === "h6",
      "text-base": type === "span",
    },
    className
  );

  return (
    <Tag id={id} className={textClasses} {...props}>
      {children}
    </Tag>
  );
};

export default Text;
