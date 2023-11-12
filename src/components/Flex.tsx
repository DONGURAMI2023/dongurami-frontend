import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

interface IFlexProps extends ComponentPropsWithoutRef<"div"> {
  type: "horizontal" | "horizontalCenter" | "verticalLeft" | "verticalCenter";
  className?: string;
}

export default function Flex({
  children,
  type = "horizontal",
  className,
  ...props
}: IFlexProps) {
  const getStyles = (type: IFlexProps["type"]) => {
    const defaultClasses = "flex";
    const typeClasses = {
      horizontal: "flex-row items-center",
      horizontalCenter: "flex-row justify-center items-center",
      verticalLeft: "flex-col items-start",
      verticalCenter: "flex-col items-center",
    } as { [key in IFlexProps["type"]]: string };

    return clsx(defaultClasses, typeClasses[type], className);
  };

  return (
    <div {...props} className={getStyles(type)}>
      {children}
    </div>
  );
}
