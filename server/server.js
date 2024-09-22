import express, { json } from "express";
import cors from 'cors';
import { exec } from "child_process";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import tcpPortUsed from "tcp-port-used";
import { killPortProcess } from "kill-port-process";

const app = express();
app.use(json());
// Enable CORS
app.use(cors());

app.post("/check-command", (req, res) => {
  const port = Number(req.body.port) ;

  tcpPortUsed.check(port, "127.0.0.1").then(
    function (inUse) {
      return res
        .status(200)
        .json({ message: `Process on port ${port} = ` + inUse });
    },
    function (err) {
      return res.status(500).json({ error: err.message });
    }
  );
});

app.post("/run-command", async (req, res) => {
  const port = Number(req.body.port) || 5001;

  const __dirname = dirname(fileURLToPath(import.meta.url));

  // Generate an absolute path to the JAR file
  const jarPath = path.resolve(
    __dirname,
    "wiremock/wiremock-jre8-standalone-2.35.0.jar"
  );

  // Construct the command
  const command = `java -jar ${jarPath} --port ${port}`;

  // Execute the command
  // netstat -ano | findstr :5001
  // kill -9 pid
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", error.message);
    }
    if (stderr) {
      console.error("stderr:", stderr);
    }
    console.log("stdout:", stdout);
  });

  res
    .status(200)
    .json({ message: `Process on port ${port} has been started.` });
});

app.post("/stop-command", async (req, res) => {
  const port = Number(req.body.port) || 5001;

  try {
    // Stop the process running on the specified port
    await killPortProcess(port);
    res.json({ message: `Process on port ${port} has been terminated.` });
  } catch (error) {
    res.status(500).json({
      error: `Error stopping process on port ${port}: ${error.message}`,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
