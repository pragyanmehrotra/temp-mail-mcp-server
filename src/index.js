import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import createTempMailServer from "./createTempMailServer.js";

const server = new Server(
  {
    name: "temp-mail-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

await createTempMailServer(server);

const transport = new StdioServerTransport();
await server.connect(transport);
