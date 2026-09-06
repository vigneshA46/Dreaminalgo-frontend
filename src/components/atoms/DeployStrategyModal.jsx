
import {
  Modal,
  Text,
  Select,
  Button,
  Stack,
  Alert,
  Group,
  Box,
} from "@mantine/core";

import { useEffect, useState } from "react";
import { apiRequest } from "../../utils/api";
import { notifications } from "@mantine/notifications";

import {
  IconCoins,
  IconInfoCircle,
} from "@tabler/icons-react";


const DeployStrategyModal = ({
  opened,
  onClose,
  strategy,
}) => {

  const [broker, setBroker] = useState("");

  const MULTIPLIERS = Array.from(
    { length: 50 },
    (_, i) => `${i + 1}x`
  );

  const [multiplier, setMultiplier] = useState("1x");
  const [deploymentType, setDeploymentType] = useState("LIVE AUTO");
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(false);


  /* -----------------------------------------
     FETCH BROKERS
  ----------------------------------------- */

  useEffect(() => {

    const fetchbasebroker = async () => {
      try {

        const res = await apiRequest(
          "GET",
          "/api/broker/userbase"
        );

        setBrokers(res);

      } catch (err) {
        console.log(err);
      }
    };

    fetchbasebroker();

  }, []);


  /* -----------------------------------------
     RESET MULTIPLIER / BROKER WHEN
     STRATEGY CHANGES
  ----------------------------------------- */

  useEffect(() => {

    if (strategy) {
      setMultiplier("1x");
      setBroker("");
    }

  }, [strategy]);


  /* -----------------------------------------
     CALCULATE TOKENS TO DEDUCT
  ----------------------------------------- */

  const calculateTokensToDeduct = () => {

    if (!strategy) {
      return 0;
    }

    const tokensRequired =
      Number(strategy.tokens_required ?? 1);

    const reduceTokenOnMultiplies =
      strategy.reducetokenonmultiplies === true;

    const reductionMultiplier =
      Number(strategy.reductionmultiplier ?? 1);

    const multiplierValue =
      parseInt(multiplier);


    /* -----------------------------------------
       CASE 1

       reduceTokenOnMultiplies = false

       Whatever multiplier:
       1X → tokens_required
       2X → tokens_required
       3X → tokens_required
    ----------------------------------------- */

    if (!reduceTokenOnMultiplies) {
      return tokensRequired;
    }


    /* -----------------------------------------
       CASE 2

       reductionMultiplier = 1

       1X → 1
       2X → 2
       3X → 3
       4X → 4

       If tokens_required = 2:

       1X → 2
       2X → 3
       3X → 4
    ----------------------------------------- */

    if (reductionMultiplier === 1) {

      return (
        tokensRequired +
        multiplierValue -
        1
      );

    }


    /* -----------------------------------------
       CASE 3+

       Example RM = 2

       1X       → 1
       2X, 3X   → 2
       4X, 5X   → 3
       6X, 7X   → 4
    ----------------------------------------- */

    if (multiplierValue < reductionMultiplier) {

      return tokensRequired;

    }


    return (
      tokensRequired +
      Math.ceil(
        (
          multiplierValue -
          reductionMultiplier +
          1
        ) / reductionMultiplier
      )
    );

  };


  const tokensToDeduct =
    calculateTokensToDeduct();


  /* -----------------------------------------
     DEPLOY STRATEGY
  ----------------------------------------- */

  const deployStrategy = async (
    strategy_id,
    type,
    broker_id,
    multipliervalue
  ) => {

    if (loading) return;


    if (type !== "paper" && broker_id === "") {

      notifications.show({
        title: "Broker Required",
        message: "Please select a broker account",
        color: "red",
      });

      return;
    }


    try {

      setLoading(true);


      const res = await apiRequest(
        "POST",
        "/api/deployments",
        {
          strategy_id,
          type,
          broker_account_id: broker_id,
          multiplier: multipliervalue,
        }
      );


      /* -----------------------------------------
         BACKEND VALIDATION FAILED
      ----------------------------------------- */

      if (!res.success) {

        notifications.show({
          title: "Deployment Failed",
          message:
            res.message ||
            "Something went wrong",
          color: "red",
        });

        return;
      }


      /* -----------------------------------------
         SUCCESS
      ----------------------------------------- */

      notifications.show({
        title: "Deployment Success",
        message:
          `${strategy.name} deployed successfully. ` +
          `${res.tokensDeducted ?? tokensToDeduct} token(s) deducted.`,
        color: "green",
      });


      onClose();


      setTimeout(() => {
        window.location.reload();
      }, 150);


    } catch (err) {

      console.log(err);


      notifications.show({
        title: "Server Error",
        message:
          err.message ||
          "Failed to deploy strategy",
        color: "red",
      });


    } finally {

      setLoading(false);

    }

  };


  /* -----------------------------------------
     IF NO STRATEGY SELECTED
  ----------------------------------------- */

  if (!strategy) {
    return null;
  }


  return (

    <Modal
      opened={opened}
      onClose={() => {
        if (!loading) {
          onClose();
        }
      }}
      centered
      title={
        <Text fw={600} size="lg">
          {strategy.name}
        </Text>
      }
      radius="md"
      size="md"
    >

      <Stack mt="md">


        {/* -----------------------------------
            MULTIPLIER
        ----------------------------------- */}

        <Select
          label="MULTIPLIER"
          data={MULTIPLIERS}
          value={multiplier}
          onChange={setMultiplier}
        />


        {/* -----------------------------------
            TOKEN INFORMATION
        ----------------------------------- */}

        <Alert
          icon={<IconCoins size={18} />}
          color="dark"
          variant="light"
          radius="md"
        >

          <Group
            justify="space-between"
            align="center"
          >

            <Box>

              <Text
                size="xs"
                fw={600}
                c="dimmed"
              >
                DEPLOYMENT COST
              </Text>

              <Text
                size="lg"
                fw={700}
                c="#000"
              >
                {tokensToDeduct}{" "}
                {tokensToDeduct === 1
                  ? "Token"
                  : "Tokens"}
              </Text>

            </Box>


            <Box ta="right">

              <Text
                size="xs"
                c="dimmed"
              >
                MULTIPLIER
              </Text>

              <Text
                size="lg"
                fw={700}
              >
                {multiplier}
              </Text>

            </Box>

          </Group>

        </Alert>


        {/* -----------------------------------
            OPTIONAL TOKEN RULE INFORMATION
        ----------------------------------- */}

        {strategy.reducetokenonmultiplies && (
          <Text
            size="xs"
            c="dimmed"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >

            <IconInfoCircle size={14} />

            Token requirement increases based on
            the selected multiplier.

          </Text>
        )}


        {/* -----------------------------------
            DEPLOYMENT TYPE
        ----------------------------------- */}

        <Select
          label="DEPLOYMENT TYPE"
          data={[
            "LIVE AUTO",
            "PAPER TRADE"
          ]}
          value={deploymentType}
          onChange={setDeploymentType}
        />


        {/* -----------------------------------
            BROKER
        ----------------------------------- */}

        {deploymentType === "LIVE AUTO" ? (

          <Select
            label="BROKER"
            placeholder="Select broker"
            data={brokers.map((b) => ({
              value: b.id,
              label: `${b.broker_name}`,
            }))}
            value={broker}
            onChange={setBroker}
          />

        ) : null}


        {/* -----------------------------------
            DEPLOY BUTTON
        ----------------------------------- */}

        <Button
          mt="md"
          bg="#000"
          fullWidth
          loading={loading}
          disabled={loading}
          loaderProps={{
            size: "sm"
          }}
          onClick={() => {

            let type = "paper";
            let broker_id = "";


            if (deploymentType === "LIVE AUTO") {

              const selectedBroker =
                brokers.find(
                  (b) => b.id === broker
                );


              type =
                selectedBroker?.broker_name || "";

              broker_id = broker;

            }


            const multiplierValue =
              parseInt(multiplier);


            deployStrategy(
              strategy.id,
              type,
              broker_id,
              multiplierValue
            );

          }}
        >

          {loading
            ? "DEPLOYING..."
            : `DEPLOY STRATEGY • ${tokensToDeduct} TOKEN${tokensToDeduct === 1 ? "" : "S"}`
          }

        </Button>


      </Stack>

    </Modal>

  );

};


export default DeployStrategyModal;
