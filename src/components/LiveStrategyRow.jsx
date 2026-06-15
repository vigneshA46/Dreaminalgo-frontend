import React, { useState } from "react";
import { useLiveStore } from "../components/liveStore.js";
import {
  Table,
  Text,
  ActionIcon,
  Button,
  Menu
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconDotsVertical,
  IconLogout,
  IconTrash
} from "@tabler/icons-react";
import { apiRequest } from "../utils/api.js";
import StrategyStatsModal from "./StrategyStatsModal.jsx";
import LiveStrategyStatistics from "./LiveStrategyStatistics.jsx";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";


import {
  IconCheck,
  IconX,
  IconAlertTriangle,
} from "@tabler/icons-react";


const LiveStrategyRow = React.memo(({
  strategy,
  index,
  isOpen,
  onToggle,
  renderExpanded,
  cumulativePnl,
  deployment
}) => {
  const live = useLiveStore((s) => s.liveData[strategy.id]);

  const [statisticsopened ,setstatisticsopened ] = useState(false)

  

  const isStrategyRunning = () => {
  const now = new Date();

  const currentMinutes =
    now.getHours() * 60 + now.getMinutes();

  const [sh, sm] = strategy.starting_time
    .split(":")
    .map(Number);

  const [eh, em] = strategy.ending_time
    .split(":")
    .map(Number);

  const startMinutes = sh * 60 + sm;
  const endMinutes = eh * 60 + em;

  // crosses midnight
  if (startMinutes > endMinutes) {
    return (
      currentMinutes >= startMinutes ||
      currentMinutes <= endMinutes
    );
  }

  return (
    currentMinutes >= startMinutes &&
    currentMinutes <= endMinutes
  );
};

const isRunningNow = isStrategyRunning();

  const [statistics , setstatistics] = useState({})

      const fetchstatistics = async (strategy_id) =>{
    try{
      const res = await apiRequest("GET", `/api/realtradegroups/getstatistics?strategy_id=${strategy_id}`)
      console.log(res)
      setstatistics(res)
      setstatisticsopened(true)
      
    }catch(err){
      console.log(err)
    }
  }

  const displayPnl =
    live?.pnl ??
    cumulativePnl[strategy.id] ??
    strategy.latest_cum_pnl;

  const handleExit = () => {
    console.log("Exit strategy", strategy.id);
    // call exitDeployment API here later
  };

  const handleDelete = () => {
  modals.openConfirmModal({
    title: "Delete Strategy",
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to delete this strategy?
      </Text>
    ),
    labels: {
      confirm: "Delete",
      cancel: "Cancel",
    },
    confirmProps: {
      color: "black",
    },
    onConfirm: async () => {
      try {
        await apiRequest(
          "POST",
          `/api/deployments/stopdeployment?strategy_id=${strategy.id}&broker_account_id=${deployment.broker_account_id}`
        );

        notifications.show({
          title: "Deleted",
          message: "Strategy deleted successfully",
          color: "green",
          icon: <IconCheck size={16} />,
        });
        window.location.reload();
      } catch (err) {
        console.log(err);

        notifications.show({
          title: "Failed",
          message: "Unable to delete strategy",
          color: "red",
          icon: <IconX size={16} />,
        });
      }
    },
  });
};


  const deployid = deployment.id


  const exitStrategy = (id) => {
  modals.openConfirmModal({
    title: "Exit Strategy",
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to exit this strategy?
      </Text>
    ),
    labels: {
      confirm: "Exit",
      cancel: "Cancel",
    },
    confirmProps: {
      color: "black",
    },
    onConfirm: async () => {
      try {
        await apiRequest(
          "POST",
          `/api/deployments/userdep/stopdep/${id}`
        );

        notifications.show({
          title: "Success",
          message: "Strategy exited successfully",
          color: "green",
          icon: <IconCheck size={16} />,
        });
      } catch (err) {
        console.log(err);

        notifications.show({
          title: "Failed",
          message: "Unable to exit strategy",
          color: "red",
          icon: <IconX size={16} />,
        });
      }
    },
  });
};



  return (
    <>
      <Table.Tr>
        <Table.Td>{index + 1}</Table.Td>

        <Table.Td fw={500}>
          {strategy.name} - {strategy.state_id}
        </Table.Td>

        <Table.Td>{live?.status || "CLOSED"}</Table.Td>

        <Table.Td
          style={{
            color: displayPnl >= 0 ? "#16a34a" : "#dc2626",
            fontWeight: 600,
          }}
        >
          {Number(displayPnl || 0).toFixed(2)}
        </Table.Td>

        <Table.Td>
          <ActionIcon onClick={onToggle}>
            {isOpen ? (
              <IconChevronUp style={{ background: "#fff", color: "#000" }} />
            ) : (
              <IconChevronDown style={{ background: "#fff", color: "#000" }} />
            )}
          </ActionIcon>
        </Table.Td>

        <Table.Td>
          <Button
            size="xs"
            radius="1rem"
            onClick={() => fetchstatistics(strategy.id)}
            bg="#000"
          >
            Statistics
          </Button>
        </Table.Td>

        {/* ✅ NEW 3-dot menu */}
        <Table.Td>
          <Menu shadow="md" width={180} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="subtle">
                <IconDotsVertical size={18} />
              </ActionIcon>
            </Menu.Target>

<Menu.Dropdown>
  {isRunningNow ? (
    <Menu.Item
      color="orange"
      leftSection={<IconLogout size={14} />}
      onClick={() => exitStrategy(deployid)}
    >
      Exit Strategy
    </Menu.Item>
  ) : (
    <Menu.Item
      color="red"
      leftSection={<IconTrash size={14} />}
      onClick={handleDelete}
    >
      Delete Strategy
    </Menu.Item>
  )}
</Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>

      {isOpen && renderExpanded(strategy, live)}

      
      <LiveStrategyStatistics
              opened={statisticsopened}
              onClose={() => setstatisticsopened(false)}
              statistics={statistics}
            />
    </>
  );
});

export default LiveStrategyRow;