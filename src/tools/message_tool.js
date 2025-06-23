function getMessagesSchema() {
  return {
    name: "get_messages",
    description: "Fetches all messages from the temporary email service",
    inputSchema: {
      type: "object",
      properties: {},
    },
  };
}

async function getMessages(mailjs) {
  try {
    const response = await mailjs.getMessages();
    return response.data;
  } catch (error) {
    return {
      error: "Error fetching messages",
      details: error.message,
    };
  }
}

function getMessageSchema() {
  return {
    name: "get_message",
    description: "Fetches a specific message by its ID",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description:
            "JWT token for authentication, if you dont have it get it by logging in",
        },
        messageId: {
          type: "string",
          description: "ID of the message to fetch",
        },
      },
      required: ["token", "messageId"],
    },
  };
}

async function getMessage(mailjs, { token, messageId }) {
  try {
    const url = `https://api.mail.tm/messages/${messageId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    return {
      error: "Error fetching message",
      details: error.message,
    };
  }
}

function markAsReadSchema() {
  return {
    name: "mark_as_read",
    description: "Marks a specific message as read or unread",
    inputSchema: {
      type: "object",
      properties: {
        messageId: {
          type: "string",
          description: "ID of the message to mark as read/unread",
        },
        read: {
          type: "boolean",
          default: true,
          description: "True to mark as read, false to mark as unread",
        },
      },
      required: ["messageId"],
    },
  };
}

async function markAsRead(mailjs, { messageId, read = true }) {
  try {
    const response = await mailjs.setMessageSeen(messageId, read);
    return response.data;
  } catch (error) {
    return {
      error: "Error marking message as read",
      details: error.message,
    };
  }
}

export {
  getMessagesSchema,
  getMessageSchema,
  markAsReadSchema,
  getMessages,
  getMessage,
  markAsRead,
};
