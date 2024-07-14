import Sequelize, { Model } from "sequelize";

class File extends Model {
    static init(sequelize) {
        super.init(
            {
                path: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                folder: {
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

export default File;
