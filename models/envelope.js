import { Model, DataTypes } from "sequelize";

export class Envelope extends Model {}

/**
 * Inicializa o modelo Envelope.
 * @param {import('sequelize').Sequelize} sequelize
 */
export function initEnvelope(sequelize) {
  Envelope.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      budget: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Envelopes",
      timestamps: true,
    }
  );

  return Envelope;
}
