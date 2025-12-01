import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import { ActionIcon } from "@mantine/core";
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
  const [collapsed, setCollapsed] = useState(false);
  const Page = pages[active];

  return (
    <div style={{ display: "flex" }}>
      
      <Sidebar
        active={active}
        onSelect={setActive}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
 
{/*       <ActionIcon
        onClick={() => setMobileOpen(true)}
        className="mobile-hamburger"
        style={{
          position: "fixed",
          top: 14,
          left: 14,
          zIndex: 3000,
          background: "#fff",
          border: "1px solid #ddd"
        }}
      >
        <IconMenu2 size={22} color="black" />
      </ActionIcon>  */}

      {/* PAGE CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          transition: "margin-left 0.25s ease",
          marginLeft: window.innerWidth > 768 ? (collapsed ? "80px" : "250px") : "0px"
        }}
      >
        <Page />
      </div>
    </div>
  );
}
