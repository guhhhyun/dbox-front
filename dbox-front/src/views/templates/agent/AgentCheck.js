import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

const AgentCheck = () => {
  const history = useHistory();
  // const [socketConnected, setSocketConnected] = useState(false); 

  const webSocketUrl = `ws://127.0.0.1:59229`;
  let ws = useRef(null);

  console.log("agentCheck실행");
  // 소켓 객체 생성
  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(webSocketUrl);
      ws.current.onopen = () => {
        console.log("connected to " + webSocketUrl);
        ws.current.close();
      };
      ws.current.onclose = (error) => {
        console.log("disconnect from " + webSocketUrl);
        console.log(error);
      };
      ws.current.onerror = (error) => {
        console.log("connection error " + webSocketUrl);
        console.log(error);
        history.push("/agent-download");
        // window.location.href = "/agent-download";
      }; 
    }
    return () => {
      console.log("clean up");
      ws.current.close();
    };
  }, []);
   
  return (
    <></>
  );
};

export default AgentCheck;