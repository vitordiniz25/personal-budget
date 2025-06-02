import { initEnvelope, Envelope } from "./envelope.js";
import { initTransaction, Transaction } from "./transaction.js";

/**
 * Recebe a instância de Sequelize, inicializa os modelos e define associações.
 * @param {import('sequelize').Sequelize} sequelize
 */
export function initModels(sequelize) {
  initEnvelope(sequelize);
  initTransaction(sequelize);

  Envelope.hasMany(Transaction, {
    foreignKey: "envelopeId",
    onDelete: "CASCADE",
  });
  Transaction.belongsTo(Envelope, {
    foreignKey: "envelopeId",
  });
}
