import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import tcpPortUsed from 'tcp-port-used';
import killPortProcess from 'kill-port-process';

const app = express();

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Track the running WireMock process
let wiremockProcess = null;

/**
 * Check if a port is currently in use
 */
app.post("/check-command", async (req, res) => {
  const port = Number(req.body.port);
  if (!port) {
    return res.status(400).json({ message: "Port number is required." });
  }

  try {
    const inUse = await tcpPortUsed.check(port, "127.0.0.1");

    if (inUse) {
      return res.status(200).json({ message: `✅ Port ${port} is currently in use.` });
    } else {
      return res.status(200).json({ message: `🟡 Port ${port} is free.` });
    }
  } catch (error) {
    return res.status(500).json({ error: `Error checking port ${port}: ${error.message}` });
  }
});

/**
 * Start WireMock on specified port
 */
app.post("/run-command", async (req, res) => {
  const port = Number(req.body.port) || 5001;
  const jarPath = path.resolve(__dirname, "../wiremock/wiremock-standalone-4.0.0-beta.2.jar");

  if (wiremockProcess) {
    return res.status(400).json({ message: "⚠️ WireMock is already running." });
  }

  try {
    const inUse = await tcpPortUsed.check(port, "127.0.0.1");
    if (inUse) {
      return res.status(400).json({ message: `❌ Port ${port} is already in use. Stop the existing process first.` });
    }

    wiremockProcess = spawn("java", ["-jar", jarPath, "--port", port]);

    wiremockProcess.stdout.on("data", (data) => console.log(`WireMock: ${data}`));
    wiremockProcess.stderr.on("data", (data) => console.error(`WireMock Error: ${data}`));
    wiremockProcess.on("close", (code) => {
      console.log(`WireMock exited with code ${code}`);
      wiremockProcess = null;
    });

    return res.status(200).json({ message: `✅ WireMock started on port ${port}.` });

  } catch (error) {
    return res.status(500).json({ error: `Error starting WireMock: ${error.message}` });
  }
});

/**
 * Stop WireMock or kill process on port
 */
app.post("/stop-command", async (req, res) => {
  const port = Number(req.body.port) || 5001;

  if (wiremockProcess) {
    wiremockProcess.kill();
    wiremockProcess = null;
    return res.json({ message: `🛑 WireMock process stopped on port ${port}.` });
  }

  try {
    const inUse = await tcpPortUsed.check(port, "127.0.0.1");

    if (!inUse) {
      return res.status(200).json({ message: `🟢 No process running on port ${port}.` });
    }

    await killPortProcess(port);
    return res.json({ message: `✅ Process running on port ${port} was killed.` });

  } catch (error) {
    return res.status(500).json({ error: `Error stopping process on port ${port}: ${error.message}` });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
