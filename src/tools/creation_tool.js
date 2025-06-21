function createOneAccountSchema() {
  return {
    name: "create_one_account",
    description: "Creates a new random temporary email account",
    inputSchema: {
      type: "object",
      properties: {},
    },
  };
}

async function createOneAccount(mailjs) {
  try {
    const response = await mailjs.createOneAccount();
    return response.data;
  } catch (error) {
    return {
      error: "Error creating account",
      details: error.message,
    };
  }
}

function registerAccountSchema() {
  return {
    name: "register_account",
    description:
      "Tries to register a new account with the provided email and password",
    inputSchema: {
      type: "object",
      properties: {
        mail: {
          type: "string",
          format: "email",
          description: "Email address to register",
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

async function registerAccount(mailjs, { mail, password }) {
  try {
    const response = await mailjs.register(mail, password);
    return response.data;
  } catch (error) {
    return {
      error: "Error registering account",
      details: error.message,
    };
  }
}

export {
  createOneAccountSchema,
  registerAccountSchema,
  createOneAccount,
  registerAccount,
};
