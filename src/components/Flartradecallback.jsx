import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";

export default function Flatradecallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const request_code = params.get("code"); // flattrade

    const brokerId = localStorage.getItem("flattrade_broker_id");

    if (request_code) {
      apiRequest(
        "GET",
        `/api/broker/flattrade/callback?request_code=${request_code}&state=${brokerId}`
      ).then(() => navigate("/brokers"));
    }
  }, []);

  return <div>Processing broker authentication...</div>;
}