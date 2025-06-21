# 📧 Temporary Email MCP Server

> MCP server integrating with [mail.tm](https://mail.tm) API to provide temporary email capabilities for LLM agents, create, register, and recieve emails in a temporary email address through your chat.





## Features

### Account Management
- 🆕 Create a random temporary email account
- 📝 Register accounts with a custom name of your choosing
- 🔑 Login to existing accounts
- 👤 Fetch logged-in user information

### Email Operations
- 📬 Retrieve all messages for an account
- 📩 Fetch specific messages by ID

## MCP Tools Exposed

The server exposes the following tools via MCP:

- `create_one_account`: Creates a new random temporary email account.
- `register_account`: Registers a new account with provided email and password.
- `login`: Logs in to the temporary email service with email and password.
- `me`: Fetches the current logged-in user's information.
- `get_messages`: Fetches all messages from the temporary email service.
- `get_message`: Fetches a specific message by its ID.

Each tool accepts input parameters as defined in their respective schemas and returns JSON responses.

## Usage

To use this mcp server simply add the following config to your mcp client:

```
{
    "temp-mail-mcp-server": {
        "command": "npx",
        "args": ["tbd"],
    }
}
```


## Technical Notes
Uses the [mailjs](https://www.npmjs.com/package/@cemalgnlts/mailjs) npm package

Responses follow mail.tm API schema

## Contact
[Pragyan Mehrotra](mailto:mehrotrapragyan@gmail.com)

Powered by [mail.tm](https://mail.tm) temporary email service
