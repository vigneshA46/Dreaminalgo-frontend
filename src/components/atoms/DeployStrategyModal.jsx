import {
  Modal,
  Text,
  Select,
  Button,
  Stack,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { apiRequest } from "../../utils/api";

const DeployStrategyModal = ({
  opened,
  onClose,
  strategyName,
  strategy_id
}) => {
  const [multiplier, setMultiplier] = useState("1x");
  const [deploymentType, setDeploymentType] = useState("LIVE AUTO");
  const [broker, setBroker] = useState("");
  const [brokers, setBrokers] = useState([]);

  useEffect(()=>{
    const fetchbasebroker = async ()=>{
        try{
            const res = await apiRequest('GET','/api/broker/userbase')
            setBrokers(res)
        }catch(err){
            console.log(err)
        }
    }

    fetchbasebroker();
  },[])

    const deployStrategy = async (strategy_id , type , broker_id ,multipliervalue) =>{

        if(type=='live' && broker_id=='')
            return

        try{
            const res = await apiRequest('POST','/api/deployments',
                {
                    strategy_id:strategy_id,
                    type:type,
                    broker_account_id:broker_id,
                    multiplier: multipliervalue
                })
            onClose()
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }   

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      title={
        <Text fw={600} size="lg">
          {strategyName}
        </Text>
      }
      radius="md"
      size="md"
    >
      <Stack mt="md">
        {/* MULTIPLIER */}
        <Select
          label="MULTIPLIER"
          data={["1x", "2x", "3x","4x","5x","6x","7x","8x","9x","10x"]}
          value={multiplier}
          onChange={setMultiplier}
        />
        {/* DEPLOYMENT TYPE */}
        <Select
          label="DEPLOYMENT TYPE"
          data={["LIVE AUTO", "PAPER TRADE"]}
          value={deploymentType}
          onChange={setDeploymentType}
        />

        {/* BROKER */}
        {
            deploymentType == 'LIVE AUTO'?
             <Select
          label="BROKER"
          placeholder="Select broker"
          data={brokers.map((b) => ({
            value: b.id,
            label: `${b.broker_name}`,
          }))}
          value={broker}
          onChange={setBroker}
        /> : <></>
        }
       

        {/* BUTTON */}
    <Button
  mt="md"
  bg={"#000"}
  fullWidth
  onClick={() => {
    let type = "paper";
    let broker_id = "";
    
    if (deploymentType === "LIVE AUTO") {
      const selectedBroker = brokers.find((b) => b.id === broker);

      type = selectedBroker?.broker_name || "";
      broker_id = broker;
    }

    const multiplierValue = parseInt(multiplier);

    deployStrategy(strategy_id, type, broker_id, multiplierValue);
  }}
>
  DEPLOY STRATEGY
</Button>
      </Stack>
    </Modal>
  );
};

export default DeployStrategyModal;