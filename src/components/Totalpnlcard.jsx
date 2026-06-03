import { Box } from "@mantine/core";
import { useLiveStore } from "./liveStore";
import { apiRequest } from "../utils/api";
import { useEffect, useState } from "react";


export function TotalPnlCard() {

       const [overallpnl , setoverallpnl] = useState(0)

    
    useEffect(() => {
      const Fetchstartergies = async () => {
        try {
          const response = await apiRequest('GET', '/api/stratergy');
    
    
    
          setoverallpnl(response.overall_pnl);
    
          console.log(response);
        } catch (err) {
          console.log(err);
        }
      };
    
      Fetchstartergies();
    }, []);
    
  const totalPnl = useLiveStore((state) => {
    let total = 0;

    Object.values(state.liveData).forEach((d) => {
      total += Number(d.pnl || 0);
    });

    return total;
  });

  return (
    <>
    <span
          style={{
            color: totalPnl >= 0 ? "#16a34a" : "#dc2626",
            fontWeight: 500,
          }}
        >
          ₹{" "}
          {totalPnl
            ? totalPnl?.toFixed(2)
            : parseFloat(overallpnl).toFixed(2)}
        </span>
    </>
  );
}
 