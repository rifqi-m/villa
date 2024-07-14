import Sequelize, { Model } from "sequelize";

class Restaurant extends Model {
    static init(sequelize) {
        super.init(
            {
                title: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                about: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                menu: {
                    type: Sequelize.JSONB,
                    allowNull: false,
                },
                timings: {
                    type: Sequelize.JSONB,
                    allowNull: false,
                },
                gallery: {
                    type: Sequelize.JSONB,
                    allowNull: false,
                },
                description: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                summary: {
                    type: Sequelize.STRING(150),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true, // If you want createdAt and updatedAt columns
                underscored: true, // For snake_case columns
            }
        );
        return this;
    }

    static associate(models) {
        // Define any associations here if needed
    }
}

export default Restaurant;
