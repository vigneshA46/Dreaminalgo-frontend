import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar.jsx";

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
  const Page = pages[active];

  return (
    <div style={{ display: "flex", minHeight: "100vh",justifyContent:'left' }}>
      <Sidebar active={active} onSelect={setActive} />
      <div style={{ flex: 1, padding: "20px" }}>
        <Page />
      </div>
    </div>
  );
}
