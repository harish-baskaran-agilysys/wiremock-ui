import React, { useEffect, useState } from "react";
import { getRequestLog } from "wiremock/axios";
import Header from "wiremock/components/native/header";
import SidebarLayout from "../../layout";
import Button from "wiremock/components/native/button";
import { withAuth } from "wiremock/components/withAuth";

const RequestLogChecker = () => {

  const [previousLog, setPreviousLog] = useState(null);
  const [logs, setLogs] = useState([]);
  const [expandedLog, setExpandedLog] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLog = async () => {
    setLoading(true);
    try {
      const response = await getRequestLog();
      const currentLog = JSON.stringify(response);

      if (previousLog && previousLog !== currentLog) {
        window.location.reload(); // Optional: remove if you just want to update logs without reload
      }

      setPreviousLog(currentLog);

      const sortedLogs = response.requests.sort(
        (a, b) => b.request.loggedDate - a.request.loggedDate
      );
      setLogs(sortedLogs);
    } catch (error) {
      console.error("Error fetching request log:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (index) => {
    setExpandedLog(expandedLog === index ? null : index);
  };

  // Initial load
  useEffect(() => {
    fetchLog();
  }, []);

  return (
    <SidebarLayout>
      <div>
        <div className="flex justify-between items-center mb-4">
          <Header label="Request Logs ::" />
          <Button
            onClick={fetchLog}
            label={"Refresh Logs"}
            disabled={loading}
          />
        </div>

        {loading ? (
          <p className="flex justify-center items-center w-full">Loading logs...</p>
        ) : logs?.length > 0 ? (
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
              onClick={() => toggleExpand(index)}
            >
              <h4>Request {logs.length - index}</h4>
              <pre>URL: {log.request.url}</pre>
              <pre>Method: {log.request.method}</pre>
              {expandedLog === index && (
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

export default withAuth(RequestLogChecker);
