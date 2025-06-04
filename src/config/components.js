export const components = {
  schemas: {
    Envelope: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          example: 1,
        },
        name: {
          type: "string",
          example: "Alimentação",
        },
        budget: {
          type: "string",
          example: "1200.00",
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
        },
      },
    },
    EnvelopeWithTransactions: {
      allOf: [
        { $ref: "#/components/schemas/Envelope" },
        {
          type: "object",
          properties: {
            Transactions: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Transaction",
              },
            },
          },
        },
      ],
    },
    NewEnvelope: {
      type: "object",
      required: ["name", "budget"],
      properties: {
        name: {
          type: "string",
          example: "Transporte",
        },
        budget: {
          type: "number",
          example: 500,
        },
      },
    },
    UpdateEnvelope: {
      type: "object",
      properties: {
        name: {
          type: "string",
          example: "Transporte e Combustível",
        },
        budget: {
          type: "number",
          example: 600,
        },
      },
    },
    Transaction: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          example: 1,
        },
        envelopeId: {
          type: "integer",
          example: 1,
        },
        amount: {
          type: "string",
          example: "200.00",
        },
        description: {
          type: "string",
          example: "Mercado",
        },
        date: {
          type: "string",
          format: "date",
          example: "2025-06-02",
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
        },
      },
    },
    TransactionWithEnvelope: {
      allOf: [
        { $ref: "#/components/schemas/Transaction" },
        {
          type: "object",
          properties: {
            Envelope: {
              $ref: "#/components/schemas/Envelope",
            },
          },
        },
      ],
    },
    NewTransaction: {
      type: "object",
      required: ["envelopeId", "amount"],
      properties: {
        envelopeId: {
          type: "integer",
          example: 1,
        },
        amount: {
          type: "number",
          example: 150,
        },
        description: {
          type: "string",
          example: "Almoço",
        },
        date: {
          type: "string",
          format: "date",
          example: "2025-06-05",
        },
      },
    },
    UpdateTransaction: {
      type: "object",
      properties: {
        amount: {
          type: "number",
          example: 250,
        },
        description: {
          type: "string",
          example: "Jantar",
        },
        date: {
          type: "string",
          format: "date",
          example: "2025-06-06",
        },
      },
    },
  },
};
