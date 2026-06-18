import { Box, Group, Pagination, ScrollArea, Table } from "@mantine/core";
import StrategyRow from "./StrategyRow";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";




export const PaperUI = ({
  startergies,
  cumulativePnl,
  fetchstatistics,
  fetchDates,
  renderExpanded,
  openedRow,
  setOpenedRow,
  dates,
})=>{

      const isMobile = useMediaQuery('(max-width: 768px)');
      /* console.log("🚀 ~ file: PaperUI.jsx:11 ~ PaperUI ~ startergies:", startergies) */

    const groupedStrategies = startergies?.reduce((acc, strategy) => {
  const category = strategy.category || "Others";

  if (!acc[category]) {
    acc[category] = [];
  }

  acc[category].push(strategy);

  return acc;
}, {});
      
    
  return(
      <Box
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          width: "100%",
  }}  
>
  {/* Scrollable container */}
  <ScrollArea  w={isMobile? '100vw':'100%'}
  type="auto"
  scrollbarSize={6}
  offsetScrollbars>
            <Table
              w={isMobile? '100vw': '100%'}
              horizontalSpacing="md"
              verticalSpacing="md"
          /*     stickyHeader 
              stickyHeaderOffset={0} */
              style={{
                minWidth: '900px',
              }}
            >
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: '#ffffffff' }}>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' ,whiteSpace: "nowrap" }}>
                    S.No
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap"  }}>
                    Strategy Name
                  </Table.Th>
{/*                   <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap"  }}>
                    O | T | M O
                  </Table.Th> */}
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' ,whiteSpace: "nowrap" }}>
                    Status
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap"  }}>
                    PNL
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' ,whiteSpace: "nowrap" }}>
                    Details
                  </Table.Th>
                  <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px',whiteSpace: "nowrap"  }}>
                    Actions
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
  {Object.entries(groupedStrategies || {}).map(
    ([category, strategies]) => (
      <>
        {/* Category Heading Row */}
        {/* <Table.Tr key={category}>
          <Table.Td
            colSpan={6}
            style={{
              backgroundColor: "#f8f9fa",
              fontWeight: 500,
              fontSize: "16px",
              padding: "12px 16px",
            }}
          >
            {category}
          </Table.Td>
        </Table.Tr> */}

        {/* Strategies under category */}
        {strategies.map((strategy, index) => (
          <StrategyRow
            key={strategy.id}
            strategy={strategy}
            index={index}
            cumulativePnl={cumulativePnl}
            fetchstatistics={fetchstatistics}
            fetchDates={fetchDates}
            renderExpanded={renderExpanded}
            isOpen={openedRow === strategy.id}
            onToggle={() => {
              if (openedRow === strategy.id) {
                setOpenedRow(null);
              } else {
                setOpenedRow(strategy.id);

                if (!dates[strategy.id]) {
                  fetchDates(strategy.id);
                }
              }
            }}
          />
        ))}
      </>
    )
  )}
</Table.Tbody>

              
            </Table>
            </ScrollArea>
            {/* Pagination */}
            <Group justify="flex-end" mt="xl">
              <Pagination
                total={1}
                value={1}
                onChange={() => {}}
                size="sm"
                styles={{
                  control: {
                    border: '1px solid #000',
                    borderRadius: '6px',
                    '&[data-active]': {
                      backgroundColor: '#000',
                      borderColor: '#000',
                    },
                  },
                }}
              />
            </Group>
          </Box>
  )
}
