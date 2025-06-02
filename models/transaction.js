import { Model, DataTypes } from "sequelize";
import { Envelope } from "./envelope.js";

export class Transaction extends Model {}

/**
 * Inicializa o modelo Transaction.
 * @param {import('sequelize').Sequelize} sequelize
 */
export function initTransaction(sequelize) {
  Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      envelopeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Envelope,
          key: "id",
        },
        field: "envelopeId",
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "Transactions",
      timestamps: true,
    }
  );

  return Transaction;
}
