import Sequelize, { Model } from "sequelize";

class Event extends Model {
    static init(sequelize) {
        super.init(
            {
                href: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                description: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                thumbnail: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "events",
                timestamps: true,
                underscored: true,
            }
        );

        return this;
    }

    static associate(models) {
        // Define associations here if needed
    }
}

export default Event;
