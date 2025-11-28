import { Box, Flex, Group, Image, Text, ThemeIcon } from "@mantine/core";
import {
  IconGauge,
  IconChartLine,
  IconCreditCard,
  IconFileText,
  IconPlus,
  IconAntenna,
  IconUser,
} from "@tabler/icons-react";
import classes from "./Sidebar.module.css";


const menu = [
  { label: "Dashboard", icon: IconGauge },
  { label: "Strategies", icon: IconChartLine },
  { label: "Subscriptions", icon: IconCreditCard },
  { label: "Reports", icon: IconFileText },
  { label: "Create Strategy", icon: IconPlus },
  { label: "Trader Signal", icon: IconAntenna },
  { label: "Profile", icon: IconUser },
];

export default function Sidebar({ active, onSelect }) {
  return (
    <Box className={classes.sidebar}>
        <Flex>
        <Text className={classes.logo}>Dreaminalgo</Text>
        </Flex>
      

      <Box className={classes.menu}>
        {menu.map((item, i) => (
          <Box
            key={i}
            className={`${classes.menuItem} ${active === i ? classes.active : ""}`}
            onClick={() => onSelect(i)}
          >
            <item.icon size={20} />
            <Text ml="sm" >{item.label}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
