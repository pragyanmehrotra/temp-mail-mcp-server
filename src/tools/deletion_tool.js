function deleteMeSchema() {
  return {
    name: "delete_me",
    description:
      "Deletes the account you are currently logged in with and then logs you out",
    inputSchema: {
      type: "object",
      properties: {},
    },
  };
}

async function deleteMe(mailjs) {
  try {
    const response = await mailjs.deleteMe();
    return JSON.stringify(response.data) + " - Account deleted successfully";
  } catch (error) {
    return {
      error: "Error deleting account",
      details: error.message,
    };
  }
}

function deleteAccountSchema() {
  return {
    name: "delete_account",
    description: "Deletes a specific account given the Account ID",
    inputSchema: {
      type: "object",
      properties: {
        accountId: {
          type: "string",
          description: "ID of the account to delete",
        },
      },
      required: ["accountId"],
    },
  };
}

async function deleteAccount(mailjs, accountId) {
  try {
    const response = await mailjs.deleteAccount(accountId);
    return response.data;
  } catch (error) {
    return {
      error: "Error deleting account",
      details: error.message,
    };
  }
}

function deleteMessageSchema() {
  return {
    name: "delete_message",
    description: "Deletes a specific message given the Message ID",
    inputSchema: {
      type: "object",
      properties: {
        messageId: {
          type: "string",
          description: "ID of the message to delete",
        },
      },
      required: ["messageId"],
    },
  };
}

async function deleteMessage(mailjs, messageId) {
  try {
    const response = await mailjs.deleteMessage(messageId);
    return response.data;
  } catch (error) {
    return {
      error: "Error deleting message",
      details: error.message,
    };
  }
}

export {
  deleteMeSchema,
  deleteMessageSchema,
  deleteAccountSchema,
  deleteMe,
  deleteAccount,
  deleteMessage,
};
