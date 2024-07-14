import Sequelize, { Model } from "sequelize";

class LocalAmenity extends Model {
    static init(sequelize) {
        super.init(
            {
                title: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                description: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
                image: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                path: {
                    type: Sequelize.STRING,
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

export default LocalAmenity;
