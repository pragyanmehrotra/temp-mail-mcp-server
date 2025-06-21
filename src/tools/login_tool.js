function loginSchema() {
  return {
    name: "login",
    description:
      "Logs in to the temporary email service with email and password, usually automatically called after account creation",
    inputSchema: {
      type: "object",
      properties: {
        mail: {
          type: "string",
          format: "email",
          description: "Email address to log in",
        },
        password: {
          type: "string",
          minLength: 6,
          description: "Password for the account",
        },
      },
      required: ["mail", "password"],
    },
  };
}

async function login(mailjs, { mail, password }) {
  try {
    const response = await mailjs.login(mail, password);
    return response.data;
  } catch (error) {
    return {
      error: "Error logging in",
      details: error.message,
    };
  }
}

function loginWithTokenSchema() {
  return {
    name: "login_with_token",
    description: "Logs in to the temporary email service using a token",
    inputSchema: {
      type: "object",
      properties: {
        token: { type: "string", description: "Token for authentication" },
      },
      required: ["token"],
    },
  };
}

async function loginWithToken(mailjs, token) {
  try {
    const response = await mailjs.loginWithToken(token);
    return response.data;
  } catch (error) {
    return {
      error: "Error logging in with token",
      details: error.message,
    };
  }
}

function meSchema() {
  return {
    name: "me",
    description:
      "Fetches the current user's information (the one who is logged in)",
    inputSchema: {
      type: "object",
      properties: {},
    },
  };
}

async function me(mailjs) {
  try {
    const response = await mailjs.me();
    return response.data;
  } catch (error) {
    return {
      error: "Error fetching user info",
      details: error.message,
    };
  }
}

export {
  login,
  loginWithToken,
  me,
  loginSchema,
  loginWithTokenSchema,
  meSchema,
};
