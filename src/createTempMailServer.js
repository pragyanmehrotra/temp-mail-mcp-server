import Mailjs from "@cemalgnlts/mailjs";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import {
  createOneAccount,
  createOneAccountSchema,
  registerAccount,
  registerAccountSchema,
} from "./tools/creation_tool.js";
import {
  deleteAccountSchema,
  deleteAccount,
  deleteMeSchema,
  deleteMe,
  deleteMessageSchema,
  deleteMessage,
} from "./tools/deletion_tool.js";
import {
  listDomainsSchema,
  getDomainSchema,
  listDomains,
  getDomain,
} from "./tools/domain_tool.js";
import {
  loginSchema,
  login,
  loginWithToken,
  loginWithTokenSchema,
  me,
  meSchema,
} from "./tools/login_tool.js";
import {
  getMessagesSchema,
  getMessages,
  getMessage,
  markAsRead,
  getMessageSchema,
  markAsReadSchema,
} from "./tools/message_tool.js";

export default async function createTempMailServer(server) {
  const mailjs = new Mailjs();

  const toolsandfunctions = [
    [createOneAccountSchema(), createOneAccount],
    [registerAccountSchema(), registerAccount],
    // [deleteAccountSchema(), deleteAccount],
    [deleteMeSchema(), deleteMe],
    // [deleteMessageSchema(), deleteMessage],
    // [listDomainsSchema(), listDomains],
    // [getDomainSchema(), getDomain],
    [loginSchema(), login],
    // [loginWithTokenSchema(), loginWithToken],
    [meSchema(), me],
    [getMessagesSchema(), getMessages],
    [getMessageSchema(), getMessage],
    // [markAsReadSchema(), markAsRead],
  ];

  const tools = toolsandfunctions.map((item) => item[0]);

  const schemaFnMap = new Map();
  toolsandfunctions.forEach(([schema, fn]) => {
    schemaFnMap.set(schema.name, fn);
  });

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: tools,
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const toolName = request.params.name;
    const args = request.params.arguments;

    if (schemaFnMap.has(toolName)) {
      const fn = schemaFnMap.get(toolName);

      try {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(await fn(mailjs, args)),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error calling tool '${toolName}': ${error.message}`,
            },
          ],
        };
      }
    } else {
      return {
        content: [
          {
            type: "text",
            text: `Tool '${toolName}' not found.`,
          },
        ],
      };
    }
  });
}
