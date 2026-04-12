import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { apiRequest } from "../utils/api";
import { notifications } from "@mantine/notifications";

export default function AliceCallback() {
  const [params] = useSearchParams();

  useEffect(() => {
    const authCode = params.get("authCode");
    const userId = params.get("userId");

    const brokerId = localStorage.getItem("alice_broker_id");

    const process = async () => {
      try {

        // 1. GET existing broker
        const brokers = await apiRequest("GET", "/api/broker/");
        const broker = brokers.find(b => b.id === brokerId);

        if (!broker) throw new Error("Broker not found");

        const { apiKey } = broker.credentials;

        // 2. generate session
        const res = await apiRequest("POST", "/api/broker/alice/session", {
          userId,
          authCode,
          apiKey
        });

        // 3. update credentials
        const updatedCreds = {
          ...broker.credentials,
          authCode,
          sessionID: res.sessionID
        };

        await apiRequest(
          "PATCH",
          `/api/broker/${brokerId}/credentials`,
          { credentials: updatedCreds }
        );

        notifications.show({
          title: "Success",
          message: "Alice token generated",
          color: "green"
        });

        window.location.href = "/broker";

      } catch (err) {
        notifications.show({
          title: "Error",
          message: "Token generation failed",
          color: "red"
        });
      }
    };

    process();
  }, []);

  return <div>Generating Alice Token...</div>;
}