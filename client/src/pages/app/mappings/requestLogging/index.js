import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarLayout from "../../layout";
import { getRequestLog } from "wiremock/axios";
import Header from "wiremock/components/native/header";

const RequestLogChecker = () => {
  const [previousLog, setPreviousLog] = useState(null);
  const [logs, setLogs] = useState([]);
  const [expandedLog, setExpandedLog] = useState(null);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await getRequestLog();
        const currentLog = JSON.stringify(response);

        // Check for log changes
        if (previousLog && previousLog !== currentLog) {
          window.location.reload();
        }

        setPreviousLog(currentLog);
        const sortedLogs = response.requests.sort(
            (a, b) => b.request.loggedDate - a.request.loggedDate
          );
        
        setLogs(sortedLogs);

      } catch (error) {
        console.error("Error fetching request log:", error);
      }
    };

    const interval = setInterval(fetchLog, 2000);

    return () => clearInterval(interval);
  }, [previousLog]);

  const toggleExpand = (index) => {
    setExpandedLog(expandedLog === index ? null : index); // Toggle expand/collapse
  };

  return (
    <SidebarLayout>
      <div>
      <Header label="Request Logs ::" className="mb-5 underline"/>
      {logs?.length > 0 ? (
        logs.map((log, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => toggleExpand(index)} // Toggle on click
          >
            <h4>Request {logs.length - index}</h4>
            <pre>URL: {log.request.url}</pre>
            <pre>Method: {log.request.method}</pre>
            {expandedLog === index && ( // Show extra details only if expanded
              <div style={{ marginTop: "10px" }}>
                <pre>Client IP: {log.request.clientIp}</pre>
                <pre>Timestamp: {new Date(log.request.loggedDate).toLocaleString()}</pre>
                <pre>Status: {log.response.status}</pre>
                <pre>Matched Stub ID: {log.response.headers["Matched-Stub-Id"]}</pre>
                <pre>Total Time: {log.timing.totalTime} ms</pre>
                <h5>Headers:</h5>
                <pre>{JSON.stringify(log.request.headers, null, 2)}</pre>
                <h5>Response:</h5>
                <pre>{JSON.stringify(log.response, null, 2)}</pre>
                <h5>Timing:</h5>
                <pre>{JSON.stringify(log.timing, null, 2)}</pre>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="flex justify-center items-center w-full">No logs available.</p>
      )}
      </div>
    </SidebarLayout>
  );
};

export default RequestLogChecker;
