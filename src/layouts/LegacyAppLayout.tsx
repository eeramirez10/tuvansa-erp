import { Outlet } from "react-router-dom";
import LegacyTopNav from "../components/LegacyTopNav";
import AppModalHost from "../modules/ui/components/AppModalHost";

function LegacyAppLayout() {
  return (
    <div className="min-h-screen bg-[#979797]">
      <LegacyTopNav />
      <Outlet />
      <AppModalHost />
    </div>
  );
}

export default LegacyAppLayout;
