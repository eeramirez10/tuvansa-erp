import { Outlet } from "react-router-dom";
import LegacyTopNav from "../components/LegacyTopNav";

function LegacyAppLayout() {
  return (
    <div className="min-h-screen bg-[#979797]">
      <LegacyTopNav />
      <Outlet />
    </div>
  );
}

export default LegacyAppLayout;
