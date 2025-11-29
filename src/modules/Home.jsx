import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import { ActionIcon, Text } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";

import Dashboard from "../components/Dashboard";
import Stratergies from "../components/Stratergies";
import Subscriptions from "../components/Subscriptions";
import Reports from "../components/Reports";
import Createstratergy from "../components/Createstratergy";
import Tradersignal from "../components/Tradersignal";
import Profile from "../components/Profile";

const pages = [
  Dashboard,
  Stratergies,
  Subscriptions,
  Reports,
  Createstratergy,
  Tradersignal,
  Profile,
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const Page = pages[active];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* SIDEBAR */}
      <Sidebar
        active={active}
        onSelect={setActive}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      {/* HAMBURGER (MOBILE ONLY) */}
      <ActionIcon
        onClick={() => setMobileOpen(true)}
        style={{
          position: "fixed",
          top: 14,
          left: 14,
          zIndex: 3000,
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: 8,
          display: "none"  // hidden on desktop by default
        }}
        className="mobile-hamburger"
      >
        <IconMenu2 size={22} color="black" />
      </ActionIcon>

      {/* PAGE CONTENT */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Page />
      </div>
    </div>
  );
}
