export const Field = ({
  value = "",
  className = "",
  align = "left",
  w = "",
  title
}: {
  value?: string;
  className?: string;
  align?: "left" | "right" | "center";
  w?: string;
  title?: string;
}) => {
  const alignClass =
    align === "right" ? "justify-end text-right" : align === "center" ? "justify-center text-center" : "";

  return (
    <span
      title={title}
      className={`inline-flex h-[19px]   items-center border border-[#a7adb3] bg-[#d8d9db] px-[4px] text-[11px] leading-none text-[#2f3943] ${w} ${alignClass} ${className}`}
    >
      {value}
    </span>
  );
}

