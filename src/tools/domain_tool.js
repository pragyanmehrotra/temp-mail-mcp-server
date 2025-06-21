function listDomainsSchema() {
  return {
    name: "list_domains",
    description: "Lists all domains available for temporary email accounts",
    inputSchema: {
      type: "object",
      properties: {},
    },
  };
}

async function listDomains(mailjs) {
  try {
    const response = await mailjs.getDomains();
    return response.data;
  } catch (error) {
    return {
      error: "Error listing domains",
      details: error.message,
    };
  }
}

function getDomainSchema() {
  return {
    name: "create_domain",
    description: "get domain for temporary email accounts by id",
    inputSchema: {
      type: "object",
      properties: {
        domainId: { type: "string", description: "ID of the domain to get" },
      },
      required: ["domainId"],
    },
  };
}

async function getDomain(mailjs, domainId) {
  try {
    const response = await mailjs.getDomain(domainId);
    return response.data;
  } catch (error) {
    return {
      error: "Error getting domain",
      details: error.message,
    };
  }
}

export { listDomains, getDomain, listDomainsSchema, getDomainSchema };
