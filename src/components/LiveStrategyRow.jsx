import React from "react";
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

const LiveStrategyRow = React.memo(({
  strategy,
  index,
  isOpen,
  onToggle,
  renderExpanded,
  fetchstatistics,
  cumulativePnl,
  deployment
}) => {
  const live = useLiveStore((s) => s.liveData[strategy.id]);

  const displayPnl =
    live?.pnl ??
    cumulativePnl[strategy.id] ??
    strategy.latest_cum_pnl;

  const handleExit = () => {
    console.log("Exit strategy", strategy.id);
    // call exitDeployment API here later
  };

  const handleDelete = () => {
    console.log("Delete strategy", strategy.id);
    // call delete API here later
  };


  const deployid = deployment.id


  const exitStrategy = async (id)=>{
    try{
        const res = await apiRequest("POST",`/api/deployments/userdep/stopdep/${id}`)
        console.log(res)
    }catch(err){
        console.log(err)
    }

  }

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
              <Menu.Item
                leftSection={<IconLogout size={14} />}
                onClick={()=>{exitStrategy(deployid)}}
              >
                Exit Strategy
              </Menu.Item>

              <Menu.Item
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={handleDelete}
              >
                Delete Strategy
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>

      {isOpen && renderExpanded(strategy, live)}
    </>
  );
});

export default LiveStrategyRow;