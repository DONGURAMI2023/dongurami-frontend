import clsx from "clsx";

type TypeSize = "sm" | "md" | "lg";

interface IImgProps {
  src?: string;
  radius?: string;
  size?: TypeSize;
}

const ImgSquare = ({ src, radius, size = "md" }: IImgProps) => {
  const sizeMap: Record<TypeSize, string> = {
    sm: "w-[32px] h-[32px]",
    md: "w-[64px] h-[64px]",
    lg: "w-[100px] h-[100px]",
  };

  return (
    <img
      src={src}
      className={clsx([
        "object-cover border border-gray-400 p-4",
        sizeMap[size],
      ])}
      style={{ borderRadius: `${radius}px` }}
    />
  );
};

export default ImgSquare;
