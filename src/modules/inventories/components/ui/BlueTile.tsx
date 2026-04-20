

export const BlueTitle = ({ children }: { children: string }) => {
  return (
    <div className="h-[24px] border-b border-[#a9c3db] bg-[#1179ba] px-2 text-center text-[20px] leading-[22px] font-bold text-white">
      {children}
    </div>
  );
}