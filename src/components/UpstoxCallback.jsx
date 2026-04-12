import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { apiRequest } from "../utils/api";
import { notifications } from "@mantine/notifications";



export default function UpstoxCallback() {
  const [params] = useSearchParams();

  useEffect(() => {
    const code = params.get("code");
       const state = localStorage.getItem("upstox_broker_id");


    const process = async () => {
      try {

        if (!code || !state) {
          throw new Error("Missing code or state");
        }

        // 1. get broker list
        const brokers = await apiRequest("GET", "/api/broker/");
        const broker = brokers.find(b => b.id === state);

        if (!broker) throw new Error("Broker not found");

        const { apiKey, apiSecret, redirectUri } = broker.credentials;

        // 2. call backend to generate access token
        const res = await apiRequest(
          "POST",
          "/api/broker/upstox/session",
          {
            code,
            apiKey,
            apiSecret,
            redirectUri
          }
        );

        // 3. update credentials
        const updatedCreds = {
          ...broker.credentials,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken
        };

        await apiRequest(
          "PATCH",
          `/api/broker/${state}/credentials`,
          { credentials: updatedCreds }
        );

        notifications.show({
          title: "Success",
          message: "Upstox token generated",
          color: "green"
        });

        window.location.href = "/broker";

      } catch (err) {
        notifications.show({
          title: "Error",
          message: "Upstox token generation failed",
          color: "red"
        });
      }
    };

    process();
  }, []);

  return <div>Generating Upstox Token...</div>;
}
