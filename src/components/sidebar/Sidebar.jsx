import { ActionIcon, Box, Card, Flex, Group, Image, Text, ThemeIcon } from "@mantine/core";
import {
  IconGauge,
  IconChartLine,
  IconCreditCard,
  IconFileText,
  IconPlus,
  IconAntenna,
  IconUser,
  IconMenu2,
  IconCoinRupee,
  IconBook,
  IconLogout,
  IconHome,
  IconChartHistogram,
  IconFileDescription,
  IconReportAnalytics,
  IconSquareRoundedPlus,
  IconPresentationAnalytics,
  IconBrandParsinta,
  IconDeviceImacPlus
} from "@tabler/icons-react";
import classes from "./Sidebar.module.css";
import dreaminbg from "../../assets/dreaminbg.jpg"
import logo from "../../assets/logo.jpeg"
import { useState } from "react";


const menu = [
  { label: "Dashboard", icon: IconHome },
  { label: "Create Signal", icon: IconDeviceImacPlus },
  { label: "Trader Signal", icon: IconPresentationAnalytics },
  { label: "Strategies", icon: IconChartHistogram },
  //{ label: "Subscriptions", icon: IconFileDescription },
  { label: "Reports", icon: IconReportAnalytics },
  { label: "Create Strategy", icon: IconSquareRoundedPlus },
  { label: "Plans & Pricing", icon: IconCoinRupee},
  { label: "Tutorials", icon: IconBrandParsinta},
];

export default function Sidebar({ active, onSelect, mobileOpen, setMobileOpen, collapsed, setCollapsed }) {

  
/* const [collapsed, setCollapsed] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false); */

const toggleSidebar = () => {
  if (window.innerWidth <= 768) {
    setMobileOpen(!mobileOpen);
  } else {
    setCollapsed(!collapsed);
  }
};
  return (
<>
  {mobileOpen && (
    <div
      className={classes.overlay}
      onClick={() => setMobileOpen(false)}
    />
  )}
  <Box
    className={`${classes.sidebar} 
      ${collapsed ? classes.collapsed : ''} 
      ${mobileOpen ? classes.mobileOpen : ''}`}
  >
    {/* header */}
    <Flex align="center" justify="space-between" className={classes.header}>
      <Flex
        align="center"
        justify="center"
        gap="sm"
        direction={collapsed ? "column" : "row"}
      >
        
        <Box
  w="4rem"

  h="4rem"
  style={{
    overflow: "hidden",
    borderRadius: "1.5rem",
    background: "#000",
  }}
>
  <Image
    src={dreaminbg}
    alt="logo"
    w="100%"
    h="100%"
    fit="cover"
    style={{
      transform: "scale(1.2)", 
      // 🔥 zoom INSIDE crop
    }}
  />
</Box>
        

        <ActionIcon onClick={toggleSidebar} variant="subtle" className={classes.hamburgerInside}>
  <IconMenu2 size={22} color="black" />
     </ActionIcon>
      </Flex>
    </Flex>

    {/* menu */}
    <Box className={classes.menu}>
      {menu.map((item, i) => (
        <Box
          key={i}
          className={`${classes.menuItem} ${active === i ? classes.active : ""}`}
          onClick={() => {
            onSelect(i);
            setMobileOpen(false); // auto close if mobile
          }}
        >
          <item.icon size={22} />
          {!collapsed && <Text size="1rem" ml="sm">{item.label}</Text>}
        </Box>
      ))}
    </Box>
  </Box>

  {/* overlay - OUTSIDE SIDEBAR */}

</>

  );
}
