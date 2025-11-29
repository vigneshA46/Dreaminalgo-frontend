import { Button, Group, Table, Text, Title } from '@mantine/core'
import React, { useState } from 'react'

const Subscriptions = () => {
      const [activeTab, setActiveTab] = useState('marketplace');

  return (
    <>
    <Text size='1.5rem' fw={"600"} pb={"1rem"} >Subscriptions</Text>
     <Group gap="md" mb="xl">
                <Button
                  size="md"
                  radius="xl"
                  style={{
                    backgroundColor: activeTab === 'marketplace' ? '#000000ff' : 'transparent',
                    color: activeTab === 'marketplace' ? 'white' : '#495057',
                    border: 'none',
                    fontWeight: 500,
                    paddingLeft: '28px',
                    paddingRight: '28px',
                  }}
                  onClick={() => setActiveTab('marketplace')}
                >
                  Active
                </Button>
                <Button
                  size="md"
                  radius="xl"
                  variant="subtle"
                  style={{
                    backgroundColor: activeTab === 'myStrategies' ? '#000000ff' : 'transparent',
                    color: activeTab === 'myStrategies' ? 'white' : '#495057',
                    border: 'none',
                    fontWeight: 500,
                    paddingLeft: '28px',
                    paddingRight: '28px',
                  }}
                  onClick={() => setActiveTab('myStrategies')}
                >
                  Expired
                </Button>
              </Group>
    
               <Table
                 horizontalSpacing="md"
                 verticalSpacing="md"
                 
                 style={{
                   minWidth: '100%',
                 }}
               >
                 <Table.Thead>
                   <Table.Tr style={{ backgroundColor: '#ffffffff' }}>
                     <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                       S.No
                     </Table.Th>
                     <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                       Strategy Name
                     </Table.Th>
                     <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                       Start date
                     </Table.Th>
                     <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                       Expiry date
                     </Table.Th>
                     <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                       Is Deployed
                     </Table.Th>
                   </Table.Tr>
                 </Table.Thead>
                 <Table.Tbody>
                   <Table.Tr>
                     <Table.Td colSpan={8} style={{ textAlign: 'center', padding: '60px', color: '#adb5bd' }}>
                       <Text size="sm">No strategies available</Text>
                     </Table.Td>
                   </Table.Tr>
                 </Table.Tbody>
               </Table>
               </>
   
  )
}

export default Subscriptions